<template>
  <div class="dosing-calculations d-flex flex-column flex-grow-1">
    <v-card class="flex-grow-1 pa-4">
      <v-form class="flex-grow-1">
        <v-row>
          <v-col cols="12" md="2" sm="4">
            <v-text-field
              type="number"
              label="Tank Volume (US Gallon)"
              min="0"
              v-model="gallon"
              @input="handleVolumeChange(true)"
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" sm="4">
            <v-text-field
              type="number"
              label="Tank Volume (Litre)"
              min="0"
              v-model="litre"
              @input="handleVolumeChange(false)"
              dense
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="2" sm="4">
            <v-text-field
              type="number"
              label="Current PPM (Calcium)"
              v-model="currentCalcium"
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" sm="4">
            <v-text-field
              type="number"
              label="Expected PPM (Calcium)"
              v-model="expectedCalcium"
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" sm="4">
            <v-select
              label="Brand (Calcium)"
              :items="settings.calcium"
              item-text="brand"
              item-value="_id"
              dense
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" md="2" sm="4">
            <v-text-field
              type="number"
              label="Required Calcium"
              v-model="neededCalcium"
              disabled
              dense
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="2" sm="4">
            <v-text-field
              type="number"
              label="Current PPM (Alkalinity)"
              step=".1"
              v-model="currentAlkalinity"
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" sm="4">
            <v-text-field
              type="number"
              label="Expected PPM (Alkalinity)"
              v-model="expectedAlkalinity"
              step=".1"
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" sm="4">
            <v-select
              label="Brand (Alkalinity)"
              :items="settings.alkalinity"
              item-text="brand"
              item-value="_id"
              dense
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" md="2" sm="4">
            <v-text-field
              type="number"
              label="Required Alkalinity"
              v-model="neededAlkalinity"
              disabled
              dense
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="2" sm="4">
            <v-text-field
              type="number"
              label="Current PPM (Magnesium)"
              v-model="currentMagnesium"
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" sm="4">
            <v-text-field
              type="number"
              label="Expected PPM (Magnesium)"
              v-model="expectedMagnesium"
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" sm="4">
            <v-select
              label="Brand (Magnesium)"
              :items="settings.magnesium"
              item-text="brand"
              item-value="_id"
              dense
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" md="2" sm="4">
            <v-text-field
              type="number"
              label="Required Magnesium"
              disabled
              v-model="neededMagnesium"
              dense
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0" cols="12" md="12" lg="12">
            <v-btn color="teal darken-1" @click="calculateDosage" small outlined>
              <span>Calculate</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
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
      currentCalcium: 0,
      expectedCalcium: 480,
      currentAlkalinity: 0,
      expectedAlkalinity: 8.1,
      currentMagnesium: 0,
      expectedMagnesium: 1300,
      neededCalcium: 0,
      neededAlkalinity: 0,
      neededMagnesium: 0,
      timer: null
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
    calculateDosage() {
      const self = this;
      const calcium = _.get(self, 'calcium');
      const alkalinity = _.get(self, 'alkalinity');
      const magnesium = _.get(self, 'magnesium');

      self.validateRules();
    },
    handleVolumeChange(bGallon) {
      const self = this;
      let gallon = self.gallon;
      let litre = self.litre;
      const gallonToLitre = self.gallonToLitre;

      if (!_.isNil(self.timer)) {
        clearInterval(self.timer);
        self.timer = null;
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

        self.getState('gallon');
        self.getState('litre');

        clearInterval(self.timer);
        self.timer = null;
      }, 300);
    }
  }
};
</script>

<style lang="scss" scoped>
.dosing-calculations {
  background-color: #e0f2f1;
  padding: 1rem;
  & > .dosing-calculations-form-container {
    form {
      width: 250px;
    }
    & > form:not(:last-child) {
      margin-right: 1rem;
    }
  }
}
</style>
