<template>
  <div>
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
  </div>
</template>

<script>
import Loader from "@/components/Loader";
import SettingsService from "@/services/SettingsService";

export default {
  components: {
    Loader
  },
  data() {
    return {
      fields: [
        "Brand",
        "Dosage",
        {
          key: "action",
          label: ""
        }
      ]
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
    settings: {
      get() {
        const self = this;
        const settings = _.cloneDeep(self.$store.getters.getSettings);

        if (!_.isEmpty(settings)) {
          _.forOwn(settings, function(array, key) {
            if (_.indexOf(["calcium", "magnesium", "alkalinity"], key) >= 0) {
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
                brand: null,
                dosage: null
              }
            ],
            alkalinity: [
              {
                brand: null,
                dosage: null
              }
            ],
            magnesium: [
              {
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
    itemChange(inArray, inTableId) {
      const self = this;
      let hasEmptyRow = false;

      if (!_.isEmpty(inArray)) {
        for (var index = 0; index < inArray.length; index++) {
          const item = inArray[index];
          const brand = _.get(item, "brand");

          if (self.isNullOrEmpty(brand)) {
            hasEmptyRow = true;
            break;
          }
        }
      }

      if (!hasEmptyRow) {
        inArray.push({
          brand: null,
          dosage: null
        });

        this.$root.$emit("bv::refresh::table", inTableId);
      }
    },
    async updateSettings() {
      const self = this;
      let settings = _.cloneDeep(self.settings);
      const settingsId = _.get(settings, "_id");

      if (!_.isEmpty(settings)) {
        _.forOwn(settings, function(array, key) {
          if (_.indexOf(["calcium", "magnesium", "alkalinity"], key) >= 0) {
            if (!_.isEmpty(array)) {
              for (var index = array.length - 1; index >= 0; index--) {
                var item = array[index];
                var brand = _.get(item, "brand");
                var dosage = _.get(item, "dosage");

                if (self.isNullOrEmpty(brand) && self.isNullOrEmpty(dosage)) {
                  array.splice(index, 1);
                }
              }
            }
          }
        });
      }

      self.$store.dispatch("setShowLoader", true);

      if (!self.isNullOrEmpty(settingsId)) {
        _.unset(settings, "_id");
        settings = await SettingsService.updateSettings(settingsId, settings);
      } else {
        settings = await SettingsService.createSettings(settings);
      }

      self.$store.dispatch("setSettings", settings);
      self.$store.dispatch("setShowLoader", false);
    }
  }
};
</script>

<style lang="scss"></style>
