<template>
  <div class="dosing-calculations d-flex flex-column flex-grow-1">
    <v-card class="flex-grow-0 pa-4 mb-4">
      <v-form class="flex-grow-1">
        <v-row>
          <v-col cols="12" sm="3" md="2" lg="2" xl="1">
            <v-text-field
              id="gallon"
              type="number"
              label="Tank Volume"
              class="pt-0"
              min="0"
              suffix="gallon(s)"
              v-model="gallon"
              @input="handleVolumeChange(true)"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="2" lg="2" xl="1">
            <v-text-field
              id="litre"
              type="number"
              label="Tank Volume"
              class="pt-0"
              min="0"
              suffix="litre(s)"
              v-model="litre"
              @input="handleVolumeChange(false)"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <div class="flex-grow-1">
      <v-expansion-panels v-model="panel" multiple readonly>
        <v-expansion-panel>
          <v-expansion-panel-header
            class="py-0"
          >Calcium (Recommended not to dose more than 20 ppm / day)</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-form>
              <v-row>
                <v-col cols="12" sm="3" md="2" lg="2" xl="1">
                  <v-text-field
                    id="currentCalcium"
                    type="number"
                    label="Current"
                    class="pt-0"
                    suffix="PPM"
                    v-model="calcium.current"
                    :error-messages="calcium.error"
                    @input="() => handleInput('calcium')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="2" lg="2" xl="1">
                  <v-text-field
                    id="expectedCalcium"
                    type="number"
                    label="Expected"
                    class="pt-0"
                    suffix="PPM"
                    v-model="calcium.expected"
                    @input="() => handleInput('calcium')"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="5" md="4" lg="3" xl="2">
                  <v-select
                    label="Brand"
                    class="pt-0"
                    v-model="calcium.brand"
                    :items="settings.calcium"
                    item-text="brand"
                    item-value="_id"
                    hide-details
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="3" md="2" lg="2" xl="1">
                  <v-text-field
                    id="requiredCalcium"
                    type="number"
                    label="Required"
                    class="pt-0"
                    :suffix="calcium.requiredSuffix"
                    v-model="calcium.required"
                    disabled
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header
            class="py-0"
          >Alkalinity (Recommended not to dose more than 1 dKH / day)</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-form>
              <v-row>
                <v-col cols="12" sm="3" md="2" lg="2" xl="1">
                  <v-text-field
                    id="currentAlkalinity"
                    type="number"
                    label="Current"
                    class="pt-0"
                    step=".1"
                    suffix="dKH"
                    v-model="alkalinity.current"
                    :error-messages="alkalinity.error"
                    @input="() => handleInput('alkalinity')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="2" lg="2" xl="1">
                  <v-text-field
                    id="expectedAlkalinity"
                    type="number"
                    label="Expected"
                    class="pt-0"
                    suffix="dKH"
                    v-model="alkalinity.expected"
                    @input="() => handleInput('alkalinity')"
                    step=".1"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="5" md="4" lg="3" xl="2">
                  <v-select
                    label="Brand"
                    class="pt-0"
                    v-model="alkalinity.brand"
                    :items="settings.alkalinity"
                    item-text="brand"
                    item-value="_id"
                    hide-details
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="3" md="2" lg="2" xl="1">
                  <v-text-field
                    id="requiredAlkalinity"
                    type="number"
                    label="Required"
                    class="pt-0"
                    :suffix="alkalinity.requiredSuffix"
                    v-model="alkalinity.required"
                    disabled
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header
            class="py-0"
          >Magnesium (Recommended not to dose more than 50 ppm / day)</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-form>
              <v-row>
                <v-col cols="12" sm="3" md="2" lg="2" xl="1">
                  <v-text-field
                    id="currentMagnesium"
                    type="number"
                    label="Current"
                    class="pt-0"
                    suffix="PPM"
                    v-model="magnesium.current"
                    :error-messages="magnesium.error"
                    @input="() => handleInput('magnesium')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="2" lg="2" xl="1">
                  <v-text-field
                    id="expectedMagnesium"
                    type="number"
                    label="Expected"
                    class="pt-0"
                    suffix="PPM"
                    v-model="magnesium.expected"
                    @input="() => handleInput('magnesium')"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="5" md="4" lg="3" xl="2">
                  <v-select
                    label="Brand"
                    class="pt-0"
                    v-model="magnesium.brand"
                    :items="settings.magnesium"
                    item-text="brand"
                    item-value="_id"
                    hide-details
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="3" md="2" lg="2" xl="1">
                  <v-text-field
                    id="requiredMagnesium"
                    type="number"
                    label="Required"
                    class="pt-0"
                    :suffix="magnesium.requiredSuffix"
                    v-model="magnesium.required"
                    disabled
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <v-card class="pa-4 flex-grow-0 mt-3">
      <v-row>
        <v-col class="py-0" cols="12" md="12" lg="12">
          <v-btn id="calculateDosage" color="teal darken-1" @click="calculateDosage" small outlined>
            <span>Calculate</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
const _ = require('../../../functions/index.js');
import SettingsService from '@/services/SettingsService';

export default {
  data() {
    return {
      gallon: 0,
      litre: 0,
      gallonToLitre: 3.78541,
      calcium: {
        current: 0,
        expected: 480,
        brand: null,
        required: 0,
        requiredSuffix: '',
        error: ''
      },
      alkalinity: {
        current: 0,
        expected: 8.1,
        brand: null,
        required: 0,
        requiredSuffix: '',
        error: ''
      },
      magnesium: {
        current: 0,
        expected: 1300,
        brand: null,
        required: 0,
        requiredSuffix: '',
        error: ''
      },
      timer: null,
      panel: [0, 1, 2]
    };
  },
  async mounted() {
    const self = this;
    const login = self.$store.getters.getLogin;
    const settings = await SettingsService.getSettings();

    if (_.isNil(login))
      self.$router.push({
        path: '/login'
      });

    self.$store.dispatch('setSettings', settings);
  },
  computed: {
    settings() {
      const self = this;

      return self.$store.getters.getSettings;
    }
  },
  methods: {
    calculate(key) {
      const self = this;
      const obj = self[key];
      const current = _.get(obj, 'current');
      const expected = _.get(obj, 'expected');
      const litre = self.litre;
      const brand = _.get(obj, 'brand');

      if (
        !_.isNullOrEmpty(current) &&
        !_.isNullOrEmpty(expected) &&
        !_.isNullOrEmpty(litre) &&
        !_.isNullOrEmpty(brand)
      ) {
        if (current > 0 && expected > 0 && litre > 0) {
          const setting = self.settings[key][brand - 1];

          if (!_.isNil(setting)) {
            const required = expected - current;
            const uom = _.get(setting, 'uom');
            let per = _.get(setting, 'per');
            let dosage = _.get(setting, 'dosage');
            let increase = _.get(setting, 'increase');

            if (!_.isNullOrEmpty(dosage)) {
              dosage = Number(dosage);
            }

            if (!_.isNullOrEmpty(increase)) {
              increase = Number(increase);
            }

            if (uom === 'g') {
              per = per * self.gallonToLitre;
            } else {
            }

            let reqDosage = (required / increase) * dosage;
            reqDosage = (litre / per) * reqDosage;

            self[key].required = reqDosage;
            self[key].requiredSuffix = _.get(setting, 'dosageUOM');
          } else {
            self[key].required = 0;
            self[key].requiredSuffix = '';
          }
        } else {
          self[key].required = 0;
        }
      } else {
        self[key].required = 0;
      }
    },
    calculateDosage() {
      const self = this;

      self.calculate('alkalinity');
      self.calculate('calcium');
      self.calculate('magnesium');
    },
    clearTimer() {
      const self = this;

      clearInterval(self.timer);
      self.timer = null;
    },
    handleInput(key) {
      const self = this;
      const timer = self.timer;

      if (!_.isNil(timer)) {
        self.clearTimer();
      }

      self.timer = setInterval(function() {
        const obj = self[key];
        const objCurrent = _.get(obj, 'current');
        const objExpected = _.get(obj, 'expected');

        if (objCurrent > objExpected) {
          self[
            key
          ].error = `Current ${key} cannot be lesser than expected ${key}`;
        } else {
          self[key].error = '';
        }

        self.clearTimer();
      }, 200);
    },
    handleVolumeChange(bGallon) {
      const self = this;
      let gallon = self.gallon;
      let litre = self.litre;
      const gallonToLitre = self.gallonToLitre;

      if (!_.isNil(self.timer)) {
        self.clearTimer();
      }

      self.timer = setInterval(function() {
        if (bGallon) {
          if (_.isNullOrEmpty(gallon) || gallon < 0) {
            self.litre = 0;
            self.gallon = 0;
          } else if (!isNaN(gallon)) {
            self.litre = self.roundToDecimalPlaces(gallon * gallonToLitre, 2);
          }
        } else {
          if (_.isNullOrEmpty(litre) || litre < 0) {
            self.gallon = 0;
            self.litre = 0;
          } else if (!isNaN(litre)) {
            self.gallon = self.roundToDecimalPlaces(litre / gallonToLitre, 2);
          }
        }

        self.clearTimer();
      }, 300);
    }
  }
};
</script>

<style lang="scss" scoped>
.dosing-calculations {
  background-color: #e0f2f1;
  padding: 1rem;
  height: calc(100vh - 48px);
  overflow-y: auto;
}
</style>
