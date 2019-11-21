<template>
  <div>
    <div class="dosing-calculations d-flex flex-column flex-wrap">
      <div class="d-flex flex-row flex-wrap dosing-calculations-form-container">
        <b-form
          class="dosing-calculations-form"
          @submit="
            evt => {
              evt.preventDefault();
            }
          "
          novalidate
        >
          <b-form-group label="Tank Volume (US Gallon)" for="tank-volume-gallon" label-size="sm">
            <b-form-input
              id="tank-volume-gallon"
              ref="tank-volume-gallon"
              type="number"
              number
              size="sm"
              @update="updateVolume(true)"
              v-model="gallon"
              debounce="200"
              :state="rules.gallon.state"
              aria-describedby="volume-gallon-invalid"
            ></b-form-input>
            <b-form-invalid-feedback id="volume-gallon-invalid">
              {{
              rules.gallon.message
              }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form>
        <b-form
          @submit="
            evt => {
              evt.preventDefault();
            }
          "
          novalidate
        >
          <b-form-group label="Tank Volume (Litre)" for="tank-volume-litre" label-size="sm">
            <b-form-input
              id="tank-volume-litre"
              ref="tank-volume-litre"
              type="number"
              number
              size="sm"
              @update="updateVolume(false)"
              v-model="litre"
              :state="rules.litre.state"
              debounce="200"
              aria-describedby="volume-litre-invalid"
            ></b-form-input>
            <b-form-invalid-feedback id="volume-litre-invalid">
              {{
              rules.litre.message
              }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form>
      </div>
      <p class="text-justify">Dosage for Calcium</p>
      <div class="d-flex flex-row flex-wrap dosing-calculations-form-container">
        <b-form
          @submit="
            evt => {
              evt.preventDefault();
            }
          "
          novalidate
        >
          <b-form-group label="Current PPM" for="current-calcium" label-size="sm">
            <b-form-input
              id="current-calcium"
              type="number"
              number
              size="sm"
              v-model="currentCalcium"
              :state="rules.currentCalcium.state"
              aria-describedby="calcium-current-invalid"
              @update="getState('currentCalcium')"
            ></b-form-input>
            <b-form-invalid-feedback id="calcium-current-invalid">
              {{
              rules.currentCalcium.message
              }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form>
        <b-form
          @submit="
            evt => {
              evt.preventDefault();
            }
          "
          novalidate
        >
          <b-form-group label="Expected PPM" for="expected-calcium" label-size="sm">
            <b-form-input
              id="expected-calcium"
              type="number"
              number
              size="sm"
              v-model="expectedCalcium"
              :state="rules.expectedCalcium.state"
              aria-describedby="calcium-expected-invalid"
              @update="getState('expectedCalcium')"
            ></b-form-input>
            <b-form-invalid-feedback id="calcium-expected-invalid">
              {{
              rules.expectedCalcium.message
              }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form>

        <b-form
          @submit="
            evt => {
              evt.preventDefault();
            }
          "
          novalidate
        >
          <b-form-group label="Brand" for="calcium" label-size="sm">
            <b-form-select
              id="calcium"
              :options="settings.calcium"
              value-field="brand"
              text-field="brand"
              size="sm"
            ></b-form-select>
          </b-form-group>
        </b-form>
        <b-form>
          <b-form-group label="Amount Needed" for="needed-calcium" label-size="sm">
            <b-form-input
              id="needed-calcium"
              type="number"
              number
              size="sm"
              v-model="neededCalcium"
              disabled
            ></b-form-input>
          </b-form-group>
        </b-form>
      </div>
      <p class="text-justify">Dosage for Alkalinity</p>
      <div class="d-flex flex-row flex-wrap dosing-calculations-form-container">
        <b-form
          @submit="
            evt => {
              evt.preventDefault();
            }
          "
          novalidate
        >
          <b-form-group label="Current dKH" for="current-alkalinity" label-size="sm">
            <b-form-input
              type="number"
              number
              id="current-alkalinity"
              size="sm"
              :state="rules.currentAlkalinity.state"
              v-model="currentAlkalinity"
              aria-describedby="alkalinity-current-invalid"
              @update="getState('currentAlkalinity')"
            ></b-form-input>
            <b-form-invalid-feedback id="alkalinity-current-invalid">
              {{
              rules.currentAlkalinity.message
              }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form>
        <b-form
          @submit="
            evt => {
              evt.preventDefault();
            }
          "
          novalidate
        >
          <b-form-group label="Expected dKH" for="expected-alkalinity" label-size="sm">
            <b-form-input
              type="number"
              number
              id="expected-alkalinity"
              size="sm"
              v-model="expectedAlkalinity"
              :state="rules.expectedAlkalinity.state"
              aria-describedby="alkalinity-expected-invalid"
              @update="getState('expectedAlkalinity')"
            ></b-form-input>
            <b-form-invalid-feedback id="alkalinity-expected-invalid">
              {{
              rules.expectedAlkalinity.message
              }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form>
        <b-form
          @submit="
            evt => {
              evt.preventDefault();
            }
          "
        >
          <b-form-group label="Brand" for="alkalinity" label-size="sm">
            <b-form-select
              id="alkalinity"
              :options="settings.alkalinity"
              value-field="brand"
              text-field="brand"
              size="sm"
            ></b-form-select>
          </b-form-group>
        </b-form>
        <b-form>
          <b-form-group label="Amount Needed" for="needed-alkalinity" label-size="sm">
            <b-form-input
              id="needed-alkalinity"
              type="number"
              number
              size="sm"
              v-model="neededAlkalinity"
              disabled
            ></b-form-input>
          </b-form-group>
        </b-form>
      </div>
      <p class="text-justify">Dosage for Magneisum</p>
      <div class="d-flex flex-row flex-wrap dosing-calculations-form-container">
        <b-form
          @submit="
            evt => {
              evt.preventDefault();
            }
          "
        >
          <b-form-group label="Current PPM" for="current-magnesium" label-size="sm">
            <b-form-input
              id="current-magnesium"
              type="number"
              number
              size="sm"
              v-model="currentMagnesium"
              :state="rules.currentMagnesium.state"
              aria-describedby="magnesium-current-invalid"
              @update="getState('currentMagnesium')"
            ></b-form-input>
            <b-form-invalid-feedback id="magnesium-current-invalid">
              {{
              rules.currentMagnesium.message
              }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form>
        <b-form
          @submit="
            evt => {
              evt.preventDefault();
            }
          "
          novalidate
        >
          <b-form-group label="Expected PPM" for="expected-magnesium" label-size="sm">
            <b-form-input
              id="expected-magnesium"
              type="number"
              number
              size="sm"
              v-model="expectedMagnesium"
              :state="rules.expectedMagnesium.state"
              aria-describedby="magnesium-expected-invalid"
              @update="getState('expectedMagnesium')"
            ></b-form-input>
            <b-form-invalid-feedback id="magnesium-expected-invalid">
              {{
              rules.expectedMagnesium.message
              }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form>
        <b-form
          @submit="
            evt => {
              evt.preventDefault();
            }
          "
          novalidate
        >
          <b-form-group label="Brand" for="magnesium" label-size="sm">
            <b-form-select
              id="magnesium"
              :options="settings.magnesium"
              value-field="brand"
              text-field="brand"
              size="sm"
            ></b-form-select>
          </b-form-group>
        </b-form>
        <b-form>
          <b-form-group label="Amount Needed" for="needed-magnesium" label-size="sm">
            <b-form-input
              id="needed-magnesium"
              type="number"
              number
              size="sm"
              v-model="neededMagnesium"
              disabled
            ></b-form-input>
          </b-form-group>
        </b-form>
      </div>
      <div>
        <b-button variant="outline-primary" size="sm" @click="calculateDosage">Calculate</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import SettingsService from "@/services/SettingsService";

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
      rules: {
        gallon: {
          rules: [
            {
              required: true,
              message: "Input is required"
            },
            {
              validator: this.greaterThanZero,
              message: "Input must be greater than 0"
            }
          ]
        },
        litre: {
          rules: [
            {
              required: true,
              message: "Input is required"
            },
            {
              validator: this.greaterThanZero,
              message: "Input must be greater than 0"
            }
          ]
        },
        currentCalcium: {
          rules: [
            {
              required: true,
              message: "Input is required"
            },
            {
              validator: this.greaterThanZero,
              message: "Input must be greater than 0"
            }
          ]
        },
        expectedCalcium: {
          rules: [
            {
              required: true,
              message: "Input is required"
            },
            {
              validator: this.greaterThanZero,
              message: "Input must be greater than 0"
            }
          ]
        },
        currentAlkalinity: {
          rules: [
            {
              required: true,
              message: "Input is required"
            },
            {
              validator: this.greaterThanZero,
              message: "Input must be greater than 0"
            }
          ]
        },
        expectedAlkalinity: {
          rules: [
            {
              required: true,
              message: "Input is required"
            },
            {
              validator: this.greaterThanZero,
              message: "Input must be greater than 0"
            }
          ]
        },
        currentMagnesium: {
          rules: [
            {
              required: true,
              message: "Input is required"
            },
            {
              validator: this.greaterThanZero,
              message: "Input must be greater than 0"
            }
          ]
        },
        expectedMagnesium: {
          rules: [
            {
              required: true,
              message: "Input is required"
            },
            {
              validator: this.greaterThanZero,
              message: "Input must be greater than 0"
            }
          ]
        }
      }
    };
  },
  async mounted() {
    const self = this;
    let settings = await SettingsService.getSettings();

    if (self.isNullOrEmpty(settings)) {
      settings = null;
    }

    self.$store.dispatch("setSettings", settings);
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
      const calcium = _.get(self, "calcium");
      const alkalinity = _.get(self, "alkalinity");
      const magnesium = _.get(self, "magnesium");

      self.validateRules();
    },
    updateVolume(bGallon) {
      const self = this;
      let gallon = self.gallon;
      let litre = self.litre;
      const gallonToLitre = self.gallonToLitre;

      if (bGallon) {
        if (self.isNullOrEmpty(gallon)) self.litre = "";
        else if (!isNaN(gallon)) {
          self.litre = self.to2DecimalPlaces(gallon * gallonToLitre);
        }
      } else {
        if (self.isNullOrEmpty(litre)) self.gallon = "";
        else if (!isNaN(litre)) {
          self.gallon = self.to2DecimalPlaces(litre / gallonToLitre);
        }
      }

      self.getState("gallon");
      self.getState("litre");
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
