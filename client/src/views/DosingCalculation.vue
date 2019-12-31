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
              dense
              v-model="gallon"
              @input="handleVolumeChange(true)"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" sm="4">
            <v-text-field
              type="number"
              label="Tank Volume (Litre)"
              min="0"
              dense
              v-model="litre"
              @input="handleVolumeChange(false)"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="2" sm="4">
            <v-text-field
              type="number"
              label="Current PPM (Calcium)"
              dense
              v-model="currentCalcium"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" sm="4">
            <v-text-field
              type="number"
              label="Expected PPM (Calcium)"
              dense
              v-model="expectedCalcium"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" sm="4">
            <v-select
              label="Brand (Calcium)"
              :items="settings.calcium"
              dense
            ></v-select>
          </v-col>
          <v-col cols="12" md="2" sm="4">
            <v-text-field
              type="number"
              label="Required Calcium"
              disabled
              dense
              v-model="neededCalcium"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="2" sm="4">
            <v-text-field
              type="number"
              label="Current PPM (Alkalinity)"
              dense
              step=".1"
              v-model="currentAlkalinity"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" sm="4">
            <v-text-field
              type="number"
              label="Expected PPM (Alkalinity)"
              v-model="expectedAlkalinity"
              dense
              step=".1"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" sm="4">
            <v-select
              label="Brand (Alkalinity)"
              :items="settings.alkalinity"
              dense
            ></v-select>
          </v-col>
          <v-col cols="12" md="2" sm="4">
            <v-text-field
              type="number"
              label="Required Alkalinity"
              disabled
              dense
              v-model="neededAlkalinity"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="2" sm="4">
            <v-text-field
              type="number"
              label="Current PPM (Magnesium)"
              dense
              v-model="currentMagnesium"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" sm="4">
            <v-text-field
              type="number"
              label="Expected PPM (Magnesium)"
              dense
              v-model="expectedMagnesium"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" sm="4">
            <v-select
              label="Brand (Magnesium)"
              :items="settings.magnesium"
              dense
            ></v-select>
          </v-col>
          <v-col cols="12" md="2" sm="4">
            <v-text-field
              type="number"
              label="Required Magnesium"
              disabled
              dense
              v-model="neededMagnesium"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12" lg="12">
            <v-btn
              color="teal darken-1"
              @click="calculateDosage"
              small
              outlined
            >
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

      if (!_.isNull(self.timer)) {
        clearInterval(self.timer);
        self.timer = null;
      }

      self.timer = setInterval(function() {
        if (bGallon) {
          if (_.isNullOrEmpty(gallon) || gallon < 0) {
            self.litre = 0;
            self.gallon = 0;
          } else if (!isNaN(gallon)) {
            self.litre = self.to2DecimalPlaces(gallon * gallonToLitre);
          }
        } else {
          if (_.isNullOrEmpty(litre) || litre < 0) {
            self.gallon = 0;
            self.litre = 0;
          } else if (!isNaN(litre)) {
            self.gallon = self.to2DecimalPlaces(litre / gallonToLitre);
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
