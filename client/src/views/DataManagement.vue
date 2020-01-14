<template>
  <div class="data-management d-flex flex-column flex-grow-1">
    <v-row class="content flex-grow-1 mb-4">
      <v-col cols="12">
        <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel>
            <v-expansion-panel-header class="py-0">Calcium</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-form dense>
                <v-row v-for="item in calcium" :key="item._id">
                  <v-col cols="12" sm="4" md="4" lg="4">
                    <v-text-field
                      v-model="item.brand"
                      class="pt-0"
                      label="Brand"
                      prepend-icon="mdi-delete"
                      @input="handleInput('calcium')"
                      @click:prepend="() => handleDelete('calcium', item)"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="2" md="2" lg="1">
                    <v-text-field
                      type="number"
                      class="pt-0"
                      label="Dose"
                      v-model="item.dosage"
                      @input="() => handleDosageInput('calcium', item, 1)"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="2" md="2" lg="1">
                    <v-select
                      label="Dose UOM"
                      class="pt-0"
                      :items="uom"
                      v-model="item.dosageUOM"
                      hide-details
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="2" md="2" lg="1">
                    <v-text-field
                      type="number"
                      class="pt-0"
                      label="Per"
                      v-model="item.per"
                      @input="() => handleDosageInput('calcium', item, 1)"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="2" md="2" lg="1">
                    <v-select
                      label="UOM"
                      class="pt-0"
                      :items="volumeUOM"
                      v-model="item.uom"
                      hide-details
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="2" md="2" lg="1">
                    <v-text-field
                      type="number"
                      class="pt-0"
                      label="Increases"
                      suffix="PPM"
                      v-model="item.increase"
                      @input="() => handleDosageInput('calcium', item, 1)"
                      hide-details
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
                  <v-col cols="12" sm="4" md="4" lg="4">
                    <v-text-field
                      v-model="item.brand"
                      class="pt-0"
                      label="Brand"
                      prepend-icon="mdi-delete"
                      @input="handleInput('alkalinity')"
                      @click:prepend="() => handleDelete('alkalinity', item)"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="2" md="2" lg="1">
                    <v-text-field
                      type="number"
                      class="pt-0"
                      label="Dose"
                      step=".1"
                      v-model="item.dosage"
                      @input="() => handleDosageInput('alkalinity', item, 1)"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="2" md="2" lg="1">
                    <v-select
                      label="Dose UOM"
                      class="pt-0"
                      :items="uom"
                      v-model="item.dosageUOM"
                      hide-details
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="2" md="2" lg="1">
                    <v-text-field
                      type="number"
                      class="pt-0"
                      label="Per"
                      v-model="item.per"
                      @input="() => handleDosageInput('alkalinity', item, 1)"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="2" md="2" lg="1">
                    <v-select
                      label="UOM"
                      class="pt-0"
                      :items="volumeUOM"
                      v-model="item.uom"
                      hide-details
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="2" md="2" lg="1">
                    <v-text-field
                      type="number"
                      class="pt-0"
                      label="Increases"
                      suffix="dKH"
                      v-model="item.increase"
                      @input="() => handleDosageInput('alkalinity', item, 1)"
                      hide-details
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
                  <v-col cols="12" sm="4" md="4" lg="4">
                    <v-text-field
                      v-model="item.brand"
                      class="pt-0"
                      label="Brand"
                      prepend-icon="mdi-delete"
                      @input="handleInput('magnesium')"
                      @click:append-outer="() => handleDelete('magnesium', item)"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="2" md="2" lg="1">
                    <v-text-field
                      type="number"
                      class="pt-0"
                      label="Dose"
                      step=".1"
                      v-model="item.dosage"
                      @input="() => handleDosageInput('magnesium', item, 1)"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="2" md="2" lg="1">
                    <v-select
                      label="Dose UOM"
                      class="pt-0"
                      :items="uom"
                      v-model="item.dosageUOM"
                      hide-details
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="2" md="2" lg="1">
                    <v-text-field
                      type="number"
                      class="pt-0"
                      label="Per"
                      v-model="item.per"
                      @input="() => handleDosageInput('magnesium', item, 1)"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="2" md="2" lg="1">
                    <v-select
                      label="UOM"
                      class="pt-0"
                      :items="volumeUOM"
                      v-model="item.uom"
                      hide-details
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="2" md="2" lg="1">
                    <v-text-field
                      type="number"
                      class="pt-0"
                      label="Increases"
                      suffix="PPM"
                      v-model="item.increase"
                      @input="() => handleDosageInput('magnesium', item, 1)"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-card class="pa-2">
      <v-btn class="float-left" color="teal darken-1" @click="handleUpdate" outlined small>Update</v-btn>
    </v-card>
    <Loader />
    <v-dialog v-model="deleteDialog.visible" max-width="320">
      <v-card>
        <v-card-title class="headline">Delete record?</v-card-title>

        <v-card-text>Proceed with deleting {{ deleteDialog.text }}?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="teal darken-1" text @click="cancelDelete">No</v-btn>

          <v-btn color="teal darken-1" text @click="deleteItem">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      deleteDialog: {
        visible: false,
        text: '',
        key: null,
        item: null
      },
      calcium: [],
      alkalinity: [],
      magnesium: [],
      timer: null,
      panel: [0, 1, 2],
      uom: [
        { value: 'ml', text: 'mililitre' },
        { value: 'gram', text: 'gram' }
      ],
      volumeUOM: [
        { value: 'l', text: 'litre' },
        { value: 'g', text: 'gallon' }
      ],
      settings: null
    };
  },
  async mounted() {
    const self = this;
    const login = self.$store.getters.getLogin;
    let settings = await SettingsService.getSettings();

    if (_.isNil(login))
      self.$router.push({
        path: '/login'
      });

    self.$store.dispatch('setSettings', settings);

    settings = self.$store.getters.getSettings;

    self.settings = settings;

    if (!_.isNullOrEmpty(settings)) {
      _.forOwn(settings, function(array, key) {
        if (_.indexOf(['calcium', 'magnesium', 'alkalinity'], key) >= 0) {
          if (_.isArray(array)) {
            let items = array.slice();
            let hasEmptyRow = false;

            for (let index = 0; index < items.length; index++) {
              const data = items[index];
              const brand = _.get(data, 'brand');
              const dosage = _.get(data, 'dosage');

              if (
                _.isNullOrEmpty(brand) &&
                (_.isNullOrEmpty(dosage) || dosage === 0)
              ) {
                hasEmptyRow = true;
                break;
              }
            }

            if (!hasEmptyRow)
              items.push({
                _id: array.length + 1,
                brand: ' ',
                dosage: 0,
                dosageUOM: 'ml',
                per: 0,
                uom: 'l',
                increase: 0
              });

            self[key] = items;
          }
        }
      });
    } else {
      self.calcium = [
        {
          _id: 1,
          brand: ' ',
          dosage: 0,
          dosageUOM: 'ml',
          per: 0,
          uom: 'l',
          increase: 0
        }
      ];
      self.alkalinity = [
        {
          _id: 1,
          brand: ' ',
          dosage: 0,
          dosageUOM: 'ml',
          per: 0,
          uom: 'l',
          increase: 0
        }
      ];
      self.magnesium = [
        {
          _id: 1,
          brand: ' ',
          dosage: 0,
          dosageUOM: 'ml',
          per: 0,
          uom: 'l',
          increase: 0
        }
      ];
    }
  },
  methods: {
    cancelDelete() {
      const self = this;

      self.deleteDialog.visible = false;
    },
    deleteItem() {
      const self = this;
      const item = self.deleteDialog.item;
      const key = self.deleteDialog.key;

      if (!_.isNil(item) && !_.isNil(key)) {
      }
    },
    handleDelete(key, item) {
      const self = this;
      const brand = _.get(item, 'brand');

      if (!_.isNullOrEmpty(brand)) {
        self.deleteDialog = {
          text: brand,
          visible: true,
          item: _.cloneDeep(item),
          key
        };
      }
    },
    handleDosageInput(key, item, numOfDecimals) {
      const self = this;
      let array = self[key];
      const _id = item._id;
      let dosage = item.dosage;

      if (!_.isNil(self.timer)) {
        clearInterval(self.timer);
        self.timer = null;
      }

      self.timer = setInterval(function() {
        dosage = self.roundToDecimalPlaces(dosage, numOfDecimals);

        item.dosage = dosage;

        for (let index = 0; index < array.length; index++) {
          const obj = array[index];
          const itemId = obj._id;

          if (itemId === _id) {
            array[index] = item;

            self[key] = array;
            break;
          }
        }

        clearInterval(self.timer);
        self.timer = null;
      }, 200);
    },
    handleInput(key) {
      const self = this;
      let items = self[key].slice();

      if (!_.isNil(self.timer)) {
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

          if (!_.isNil(lastitem)) position = _.get(lastitem, '_id');

          items.push({
            _id: ++position,
            brand: ' ',
            dosage: 0,
            dosageUOM: 'ml',
            per: 0,
            uom: 'l',
            increase: 0
          });
        }

        self[key] = items;

        clearInterval(self.timer);
        self.timer = null;
      }, 300);
    },
    async handleUpdate() {
      const self = this;
      const keys = ['alkalinity', 'calcium', 'magnesium'];
      let settings = _.cloneDeep(self.settings);
      const settingsId = _.get(settings, '_id');

      for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        let array = self[key].slice();

        self.removeEmptyNameData(array);

        settings[key] = array;
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
    },
    removeEmptyNameData(array) {
      if (!_.isNullOrEmpty(array)) {
        for (let index = array.length - 1; index >= 0; index--) {
          const data = array[index];
          const brand = _.get(data, 'brand');
          const dosage = _.get(data, 'dosage');

          if (
            _.isNullOrEmpty(brand) &&
            (_.isNullOrEmpty(dosage) || dosage === 0)
          )
            array.splice(index, 1);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.data-management {
  background-color: #e0f2f1;
  padding: 1rem;
  height: calc(100vh - 48px);
  overflow-y: auto;
  .content {
    overflow-y: auto;
  }
  .v-expansion-panel--active > .v-expansion-panel-header {
    min-height: 48px;
  }
}
</style>
