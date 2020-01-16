<template>
  <div class="home d-flex flex-column">
    <v-card class="flex-grow-0 pa-4 mb-3">
      <v-form ref="form">
        <v-row class="flex-grow-0">
          <v-col class="pb-0" cols="12" md="2" sm="3">
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="currentDate"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="currentDate"
                  label="Date"
                  class="pt-0"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="currentDate" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(currentDate)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col class="pb-0" cols="12" md="2" sm="3">
            <v-text-field
              id="calcium"
              type="number"
              label="Calcium Consumption"
              class="pt-0"
              suffix="PPM"
              v-model="calciumConsumption"
              :rules="calciumRules"
              step="0.1"
              autofocus
            ></v-text-field>
          </v-col>
          <v-col class="pb-0" cols="12" md="2" sm="3">
            <v-text-field
              id="alkalinity"
              type="number"
              label="Alkalinity Consumption"
              class="pt-0"
              suffix="dKH"
              v-model="alkalinityConsumption"
              :rules="alkalinityRules"
              step="0.1"
            ></v-text-field>
          </v-col>
          <v-col class="pb-0" cols="12" md="2" sm="3">
            <v-text-field
              id="magnesium"
              type="number"
              label="Magnesium Consumption"
              class="pt-0"
              suffix="PPM"
              v-model="magnesiumConsumption"
              :rules="magnesiumRules"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-row class="flex-grow-0">
        <v-col cols="12" md="2">
          <v-btn id="update" color="teal darken-1" @click="handleUpdate" outlined small>Update</v-btn>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="d-flex flex-column flex-grow-1">
      <v-tabs class="flex-grow-0" background-color="teal" dark>
        <v-tab @change="handleTabClick(1)">Daily Consumptions</v-tab>
        <v-tab @change="handleTabClick(2)">Monthly Consumptions</v-tab>
      </v-tabs>
      <div v-if="activeLink === 1" class="pa-4 flex-grow-1">
        <v-form>
          <v-row class="flex-grow-0">
            <v-col class="pb-0" cols="12" sm="3" md="2">
              <v-select
                label="Month"
                :items="chartMonth"
                v-model="chart.selectedMonth"
                dense
                @change="chartRangeChange"
              ></v-select>
            </v-col>
            <v-col class="pb-0" cols="12" sm="3" md="2">
              <v-select
                label="Year"
                :items="chartYear"
                v-model="chart.selectedYear"
                dense
                @change="chartRangeChange"
              ></v-select>
            </v-col>
          </v-row>
        </v-form>
        <v-row>
          <v-col class="pb-0" cols="12" md="6" xl="4">
            <div class="position-relative chart-container">
              <bar-chart :chart-data="calciumChart" :options="chartOptions"></bar-chart>
            </div>
          </v-col>
          <v-col class="pb-0" cols="12" md="6" xl="4">
            <div class="position-relative chart-container">
              <bar-chart :chart-data="alkalinityChart" :options="chartOptions"></bar-chart>
            </div>
          </v-col>
          <v-col class="pb-0" cols="12" md="6" xl="4">
            <div class="position-relative chart-container">
              <bar-chart :chart-data="magnesiumChart" :options="chartOptions"></bar-chart>
            </div>
          </v-col>
        </v-row>
      </div>
      <div v-else class="pa-4 flex-grow-1">
        <v-form>
          <v-row class="flex-grow-0">
            <v-col class="pb-0" cols="12" sm="3" md="2">
              <v-select
                label="Year"
                :items="chartYear"
                v-model="chart.selectedYear"
                dense
                @change="chartRangeChange"
              ></v-select>
            </v-col>
          </v-row>
        </v-form>
        <v-row>
          <v-col class="pb-0" cols="12" md="6" xl="4">
            <div class="position-relative chart-container">
              <bar-chart :chart-data="calciumChart" :options="chartOptions"></bar-chart>
            </div>
          </v-col>
          <v-col class="pb-0" cols="12" md="6" xl="4">
            <div class="position-relative chart-container">
              <bar-chart :chart-data="alkalinityChart" :options="chartOptions"></bar-chart>
            </div>
          </v-col>
          <v-col class="pb-0" cols="12" md="6" xl="4">
            <div class="position-relative chart-container">
              <bar-chart :chart-data="magnesiumChart" :options="chartOptions"></bar-chart>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-card>
    <v-dialog v-model="overwriteDialog" max-width="320">
      <v-card>
        <v-card-title class="headline">Overwrite existing record?</v-card-title>

        <v-card-text>
          A record with the same date already exists in the system. Overwrite the
          record?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="teal darken-1" text @click="cancelUpdate">No</v-btn>

          <v-btn color="teal darken-1" text @click="() => createTracking(true)">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar :color="snackbar.color" v-model="snackbar.visible" multi-line top right>
      {{ snackbar.text }}
      <v-btn text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
const _ = require('../../../functions/index.js');
import BarChart from '@/components/BarChart';
import TrackingsService from '@/services/TrackingsService';

export default {
  name: 'home',
  components: {
    BarChart
  },
  data() {
    return {
      activeLink: 1,
      snackbar: {
        color: 'success',
        text: '',
        visible: false
      },
      chartOptions: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      },
      overwriteDialog: false,
      currentDate: new Date().toISOString().substr(0, 10),
      modal: false,
      labels: [],
      calciumData: [],
      alkalinityData: [],
      magnesiumData: [],
      chartMonth: [
        { value: 1, text: 'January' },
        { value: 2, text: 'Feburary' },
        { value: 3, text: 'March' },
        { value: 4, text: 'April' },
        { value: 5, text: 'May' },
        { value: 6, text: 'June' },
        { value: 7, text: 'July' },
        { value: 8, text: 'August' },
        { value: 9, text: 'September' },
        { value: 10, text: 'October' },
        { value: 11, text: 'November' },
        { value: 12, text: 'December' }
      ],
      calciumConsumption: 0,
      alkalinityConsumption: 0,
      magnesiumConsumption: 0,
      zeroAlert: [],
      chart: {
        selectedMonth: new Date().getMonth() + 1,
        selectedYear: new Date().getFullYear()
      },
      calciumRules: [
        v => !_.isNullOrEmpty(v) || 'Calcium consumption is required'
      ],
      alkalinityRules: [
        v => !_.isNullOrEmpty(v) || 'Alkalinity consumption is required'
      ],
      magnesiumRules: [
        v => !_.isNullOrEmpty(v) || 'Magnesium consumption is required'
      ]
    };
  },
  mounted() {
    const self = this;
    const todayDate = new Date();
    const month = todayDate.getMonth() + 1;
    const year = todayDate.getFullYear();
    const login = self.$store.getters.getLogin;

    if (_.isNil(login))
      self.$router.push({
        path: '/login'
      });

    // self.getTrackings();
  },
  computed: {
    chartYear() {
      const self = this;
      let currentYear = new Date().getFullYear();
      let years = [currentYear];

      for (var index = 1; index <= 120; index++) {
        years.push(currentYear - index);
      }

      return years;
    },
    calciumChart() {
      const self = this;

      return {
        labels: self.labels,
        datasets: [
          {
            label: 'Calcium Consumptions',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: self.calciumData
          }
        ]
      };
    },
    alkalinityChart() {
      const self = this;

      return {
        labels: self.labels,
        datasets: [
          {
            label: 'Alkalinity Consumption',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            data: self.alkalinityData
          }
        ]
      };
    },
    magnesiumChart() {
      const self = this;

      return {
        labels: self.labels,
        datasets: [
          {
            label: 'Magnesium Consumption',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
            data: self.magnesiumData
          }
        ]
      };
    },
    endDate() {
      const self = this;
      const chart = _.cloneDeep(self.chart);
      var chartMonth = chart.selectedMonth;
      const chartYear = chart.selectedYear;
      const todayDate = new Date();
      const month = todayDate.getMonth() + 1;
      const year = todayDate.getFullYear();
      var endDate = new Date(
        `${chartYear}-${chartMonth < 10 ? '0' + chartMonth : chartMonth}-${
          todayDate.getDate() < 10
            ? '0' + todayDate.getDate()
            : todayDate.getDate()
        }`
      );

      endDate = endDate.setDate(todayDate.getDate() + 1);

      if (month !== chartMonth || year !== chartYear) {
        endDate = new Date(endDate).setDate(1);
        endDate = new Date(endDate).setFullYear(chartYear);
        endDate = new Date(endDate).setMonth(new Date(endDate).getMonth() + 1);
      }

      return new Date(endDate);
    },
    startDate() {
      const self = this;
      const chart = _.cloneDeep(self.chart);
      var chartMonth = chart.selectedMonth;
      const chartYear = chart.selectedYear;
      const todayDate = new Date();
      const month = todayDate.getMonth() + 1;
      const year = todayDate.getFullYear();
      var startDate = new Date(
        `${chartYear}-${chartMonth < 10 ? '0' + chartMonth : chartMonth}-01`
      );

      if (month !== chartMonth || year !== chartYear)
        startDate = `${chartYear}-${
          chartMonth < 10 ? '0' + chartMonth : chartMonth
        }-01`;

      return new Date(startDate);
    },
    todayDate() {
      const self = this;
      const todayDate = new Date();
      const year = todayDate.getFullYear();
      const month = todayDate.getMonth() + 1;
      const date = todayDate.getDate();

      return `${year}-${month < 10 ? '0' + month : month}-${
        date < 10 ? '0' + date : date
      }`;
    }
  },
  methods: {
    cancelUpdate() {
      const self = this;

      self.overwriteDialog = false;
    },
    chartRangeChange() {
      const self = this;

      self.getTrackings();

      self.chartData = {
        labels: [],
        datasets: [
          {
            label: 'GitHub Commits',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: []
          }
        ]
      };
    },
    clearForm() {
      const self = this;

      self.calciumConsumption = 0;
      self.alkalinityConsumption = 0;
      self.magnesiumConsumption = 0;
    },
    async createTracking(overwrite = false) {
      const self = this;
      let exists = false;

      if (!overwrite) exists = await self.trackingExists();

      self.overwriteDialog = false;

      if (overwrite) {
        let result = await TrackingsService.updateTracking({
          calcium: self.calciumConsumption,
          alkalinity: self.alkalinityConsumption,
          magnesium: self.magnesiumConsumption,
          date: new Date(self.currentDate)
        });

        if (!result) {
          self.updateSnackbar('Error updating tracking.', true, true);
        } else {
          self.updateSnackbar('Tracking updating successfully!', false, true);
        }

        self.clearForm();
        self.getTrackings();
      } else {
        if (!exists) {
          let result = await TrackingsService.createTracking({
            calcium: self.calciumConsumption,
            alkalinity: self.alkalinityConsumption,
            magnesium: self.magnesiumConsumption,
            date: new Date(self.currentDate)
          });

          if (!result) {
            self.updateSnackbar('Error creating tracking.', true, true);
          } else {
            self.updateSnackbar('Tracking created successfully!', false, true);
          }

          self.clearForm();
          self.getTrackings();
        } else {
          self.overwriteDialog = true;
        }
      }
    },
    async getTrackings() {
      const self = this;
      const startDate = self.startDate;
      var endDate = self.endDate;

      self.$store.dispatch('setShowLoader', true);

      var trackings = await TrackingsService.getTrackings({
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      });

      endDate = new Date(endDate).setDate(new Date(endDate).getDate() - 1);

      const endIndex = new Date(endDate).getDate();

      let data = [];
      let calcium = [];
      let alkalinity = [];
      let magnesium = [];
      let labels = [];
      let mapping = new Object();

      for (var index = 0; index < trackings.length; index++) {
        var tracking = trackings[index];
        var date = _.get(tracking, 'date');
        var label = new Date(date).getDate();

        mapping[label] = tracking;
      }

      for (var index = 1; index <= endIndex; index++) {
        labels.push(index);

        if (_.has(mapping, index)) {
          calcium.push(_.get(mapping, `${index}.calcium`));
          alkalinity.push(_.get(mapping, `${index}.alkalinity`));
          magnesium.push(_.get(mapping, `${index}.magnesium`));
        } else {
          calcium.push(0);
          alkalinity.push(0);
          magnesium.push(0);
        }
      }

      self.labels = labels;
      self.calciumData = calcium;
      self.alkalinityData = alkalinity;
      self.magnesiumData = magnesium;

      self.$store.dispatch('setShowLoader', false);
    },
    handleTabClick(index) {
      const self = this;

      self.activeLink = index;
    },
    async trackingExists() {
      const self = this;
      const currentDate = self.currentDate;

      const exists = await TrackingsService.trackingExists({
        date: new Date(currentDate)
      });

      return exists;
    },
    handleUpdate() {
      const self = this;

      if (self.$refs.form.validate()) self.createTracking();
    },
    updateSnackbar(message, error, show = false) {
      const self = this;

      self.$set(self.snackbar, 'text', message);
      self.$set(self.snackbar, 'color', error ? 'error' : 'success');
      self.$set(self.snackbar, 'visible', show);
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  background-color: #e0f2f1;
  padding: 1rem;
  height: calc(100vh - 48px);
  overflow-y: auto;
}
</style>
