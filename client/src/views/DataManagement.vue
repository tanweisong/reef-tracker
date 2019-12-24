<template>
  <div id="data-management">
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header class="py-0">Calcium</v-expansion-panel-header>
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
                  step=".1"
                  v-model="item.dosage"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header class="py-0">Alkalinity</v-expansion-panel-header>
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
        <v-expansion-panel-header class="py-0">Magnesium</v-expansion-panel-header>
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
                  step=".1"
                  v-model="item.dosage"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>

  <!-- <div>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button
          block
          href="#"
          class="text-left"
          v-b-toggle.accordion-1
          variant="outline-info"
          >Calcium</b-button
        >
      </b-card-header>
      <b-collapse
        id="accordion-1"
        visible
        accordion="my-accordion"
        role="tabpanel"
        class="pr-2 pl-2 pt-2"
      >
        <b-table
          id="calciumTable"
          simple
          hover
          :items="settings.calcium"
          :fields="fields"
          thead-class="small"
          small
        >
          <template v-slot:table-colgroup="scope">
            <col
              v-for="field in scope.fields"
              :key="field.key"
              :style="{
                width:
                  field.key === 'action'
                    ? '50px'
                    : field.key === 'Dosage'
                    ? '120px'
                    : 'auto'
              }"
            />
          </template>
          <template v-slot:cell(brand)="row">
            <b-form-input
              size="sm"
              v-model="row.item.brand"
              @update="itemChange(settings.calcium, 'calciumTable')"
              debounce="100"
            ></b-form-input>
          </template>
          <template v-slot:cell(dosage)="row">
            <b-form-input
              type="number"
              number
              size="sm"
              v-model="row.item.dosage"
            ></b-form-input>
          </template>
          <template v-slot:cell(action)="row">
            <div class="d-flex flex-row align-items-center">
              <b-button variant="outline-danger" size="sm">
                <font-awesome-icon icon="trash"></font-awesome-icon>
              </b-button>
            </div>
          </template>
        </b-table>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button
          block
          href="#"
          class="text-left"
          v-b-toggle.accordion-2
          variant="outline-info"
          >Alkalinity</b-button
        >
      </b-card-header>
      <b-collapse
        id="accordion-2"
        accordion="my-accordion"
        role="tabpanel"
        class="pr-2 pl-2 pt-2"
      >
        <b-table
          id="alkalinityTable"
          simple
          hover
          :items="settings.alkalinity"
          :fields="fields"
          thead-class="small"
          small
        >
          <template v-slot:table-colgroup="scope">
            <col
              v-for="field in scope.fields"
              :key="field.key"
              :style="{
                width:
                  field.key === 'action'
                    ? '50px'
                    : field.key === 'Dosage'
                    ? '120px'
                    : 'auto'
              }"
            />
          </template>
          <template v-slot:cell(brand)="row">
            <b-form-input
              size="sm"
              v-model="row.item.brand"
              @update="itemChange(settings.alkalinity, 'alkalinityTable')"
              debounce="100"
            ></b-form-input>
          </template>
          <template v-slot:cell(dosage)="row">
            <b-form-input
              type="number"
              number
              v-model="row.item.dosage"
              size="sm"
            ></b-form-input>
          </template>
          <template v-slot:cell(action)="row">
            <div class="d-flex flex-row align-items-center">
              <b-button variant="outline-danger" size="sm">
                <font-awesome-icon icon="trash"></font-awesome-icon>
              </b-button>
            </div>
          </template>
        </b-table>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button
          block
          href="#"
          class="text-left"
          v-b-toggle.accordion-3
          variant="outline-info"
          >Magnesium</b-button
        >
      </b-card-header>
      <b-collapse
        id="accordion-3"
        accordion="my-accordion"
        role="tabpanel"
        class="pr-2 pl-2 pt-2"
      >
        <b-table
          id="magnesiumTable"
          simple
          hover
          :items="settings.magnesium"
          :fields="fields"
          thead-class="small"
          small
        >
          <template v-slot:table-colgroup="scope">
            <col
              v-for="field in scope.fields"
              :key="field.key"
              :style="{
                width:
                  field.key === 'action'
                    ? '50px'
                    : field.key === 'Dosage'
                    ? '120px'
                    : 'auto'
              }"
            />
          </template>
          <template v-slot:cell(brand)="row">
            <b-form-input
              size="sm"
              v-model="row.item.brand"
              @update="itemChange(settings.magnesium, 'magnesiumTable')"
              debounce="100"
            ></b-form-input>
          </template>
          <template v-slot:cell(dosage)="row">
            <b-form-input
              type="number"
              number
              v-model="row.item.dosage"
              size="sm"
            ></b-form-input>
          </template>
          <template v-slot:cell(action)="row">
            <div class="d-flex flex-row align-items-center">
              <b-button variant="outline-danger" size="sm">
                <font-awesome-icon icon="trash"></font-awesome-icon>
              </b-button>
            </div>
          </template>
        </b-table>
      </b-collapse>
    </b-card>
    <b-navbar toggleable="lg" type="dark" variant="dark" fixed="bottom">
      <b-navbar-nav class="ml-auto">
        <b-button variant="outline-primary" size="sm" @click="updateSettings"
          >Save Changes</b-button
        >
      </b-navbar-nav>
    </b-navbar>
    <loader></loader>
  </div>-->
</template>

<script>
import _ from '@/functions/index';
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
