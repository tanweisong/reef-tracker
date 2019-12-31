<template>
  <div id="data-management">
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header class="py-0"
          >Calcium</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <v-form dense>
            <v-row v-for="item in calcium" :key="item._id">
              <v-col cols="12" md="11" class="py-1">
                <v-text-field
                  v-model="item.brand"
                  class="pt-0"
                  label="Brand"
                  height="36"
                  @input="handleInput('calcium')"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="1" class="py-1">
                <v-text-field
                  type="number"
                  class="pt-0"
                  label="Dosage"
                  height="36"
                  v-model="item.dosage"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header class="py-0"
          >Alkalinity</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <v-form dense>
            <v-row v-for="item in alkalinity" :key="item._id">
              <v-col cols="12" md="11" class="py-1">
                <v-text-field
                  v-model="item.brand"
                  class="pt-0"
                  label="Brand"
                  height="36"
                  @input="handleInput('alkalinity')"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="1" class="py-1">
                <v-text-field
                  type="number"
                  class="pt-0"
                  label="Dosage"
                  height="36"
                  step=".1"
                  v-model="item.dosage"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header class="py-0"
          >Magnesium</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <v-form dense>
            <v-row v-for="item in magnesium" :key="item._id">
              <v-col cols="12" md="11" class="py-1">
                <v-text-field
                  v-model="item.brand"
                  class="pt-0"
                  label="Brand"
                  height="36"
                  @input="handleInput('magnesium')"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="1" class="py-1">
                <v-text-field
                  type="number"
                  class="pt-0"
                  label="Dosage"
                  height="36"
                  v-model="item.dosage"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
const _ = require('../../../functions/index.js');
import Loader from '@/components/Loader';
import SettingsService from '@/services/SettingsService';

export default {
  components: {
    Loader
  },
  data() {
    return {
      fields: [
        'Brand',
        'Dosage',
        {
          key: 'action',
          label: ''
        }
      ],
      calcium: [
        {
          _id: 1,
          brand: null,
          dosage: null
        }
      ],
      alkalinity: [
        {
          _id: 1,
          brand: null,
          dosage: null
        }
      ],
      magnesium: [
        {
          _id: 1,
          name: null,
          dosage: null
        }
      ],
      timer: null,
      panel: [0, 1, 2]
    };
  },
  async mounted() {
    const self = this;
    let settings = await SettingsService.getSettings();
    const login = self.$store.getters.getLogin;

    // if (_.isNull(login))
    //   self.$router.push({
    //     path: '/login'
    //   });

    if (_.isNullOrEmpty(settings)) {
      settings = null;
    }

    self.$store.dispatch('setSettings', settings);
  },
  computed: {
    settings: {
      get() {
        const self = this;
        const settings = _.cloneDeep(self.$store.getters.getSettings);

        if (!_.isNullOrEmpty(settings)) {
          _.forOwn(settings, function(array, key) {
            if (_.indexOf(['calcium', 'magnesium', 'alkalinity'], key) >= 0) {
              if (_.isArray(array)) {
                array.push({
                  brand: null,
                  dosage: null
                });
              }
            }
          });

          return settings;
        } else {
          return {
            calcium: [
              {
                _id: 1,
                brand: null,
                dosage: null
              }
            ],
            alkalinity: [
              {
                _id: 1,
                brand: null,
                dosage: null
              }
            ],
            magnesium: [
              {
                _id: 1,
                name: null,
                dosage: null
              }
            ]
          };
        }
      }
    }
  },
  methods: {
    handleInput(key) {
      const self = this;
      let items = self[key].slice();

      if (!_.isNull(self.timer)) {
        clearInterval(self.timer);
        self.timer = null;
      }

      self.timer = setInterval(function() {
        let hasEmptyRow = false;

        if (!_.isEmpty(items)) {
          for (var index = 0; index < items.length; index++) {
            const item = items[index];
            const brand = _.get(item, 'brand');

            if (_.isNullOrEmpty(brand)) {
              hasEmptyRow = true;
              break;
            }
          }
        }

        if (!hasEmptyRow) {
          let lastitem = items[items.length - 1];
          let position = 1;

          if (!_.isNull(lastitem)) position = _.get(lastitem, '_id');

          items.push({
            _id: ++position,
            brand: null,
            dosage: null
          });
        }

        self[key] = items;

        clearInterval(self.timer);
        self.timer = null;
      }, 300);
    },
    async updateSettings() {
      const self = this;
      let settings = _.cloneDeep(self.settings);
      const settingsId = _.get(settings, '_id');

      if (!_.isEmpty(settings)) {
        _.forOwn(settings, function(array, key) {
          if (_.indexOf(['calcium', 'magnesium', 'alkalinity'], key) >= 0) {
            if (!_.isEmpty(array)) {
              for (var index = array.length - 1; index >= 0; index--) {
                var item = array[index];
                var brand = _.get(item, 'brand');
                var dosage = _.get(item, 'dosage');
                if (_.isNullOrEmpty(brand) && _.isNullOrEmpty(dosage)) {
                  array.splice(index, 1);
                }
              }
            }
          }
        });
      }

      self.$store.dispatch('setShowLoader', true);

      if (!_.isNullOrEmpty(settingsId)) {
        _.unset(settings, '_id');
        settings = await SettingsService.updateSettings(settingsId, settings);
      } else {
        settings = await SettingsService.createSettings(settings);
      }

      self.$store.dispatch('setSettings', settings);
      self.$store.dispatch('setShowLoader', false);
    }
  }
};
</script>

<style lang="scss" scoped>
#data-management {
  padding: 1rem;
  height: calc(100vh - 48px);
  overflow-y: auto;
}
</style>
