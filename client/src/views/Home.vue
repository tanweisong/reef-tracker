<template>
  <div class="home d-flex flex-column align-items-stretch">
    <div class="d-flex flex-row align-items-start home-form flex-wrap">
      <b-form novalidate>
        <b-form-group label="Date" for="tracking-date" label-size="sm">
          <b-form-input type="date" size="sm" v-model="currentDate" :max="todayDate"></b-form-input>
        </b-form-group>
      </b-form>
      <b-form novalidate>
        <b-form-group label="Calcium Consumption (PPM)" for="calcium-consumption" label-size="sm">
          <b-form-input
            id="calcium-consumption"
            type="number"
            number
            size="sm"
            v-model="calciumConsumption"
            :state="rules.calciumConsumption.state"
            aria-describedby="calcium-consumption-invalid"
            debounce="200"
            @update="consumptionChange('calciumConsumption')"
          ></b-form-input>
          <b-form-invalid-feedback id="calcium-consumption-invalid">
            {{
            rules.calciumConsumption.message
            }}
          </b-form-invalid-feedback>
        </b-form-group>
      </b-form>
      <b-form novalidate>
        <b-form-group
          label="Alkalinity Consumption (dKH)"
          for="alkalinity-consumption"
          label-size="sm"
        >
          <b-form-input
            id="alkalinity-consumption"
            type="number"
            number
            size="sm"
            v-model="alkalinityConsumption"
            :state="rules.alkalinityConsumption.state"
            aria-describedby="alkalinity-consumption-invalid"
            debounce="200"
            @update="consumptionChange('alkalinityConsumption')"
          ></b-form-input>
          <b-form-invalid-feedback id="alkalinity-consumption-invalid">
            {{
            rules.alkalinityConsumption.message
            }}
          </b-form-invalid-feedback>
        </b-form-group>
      </b-form>
      <b-form novalidate>
        <b-form-group
          label="Magnesium Consumption (PPM)"
          for="magnesium-consumption"
          label-size="sm"
        >
          <b-form-input
            id="magnesium-consumption"
            type="number"
            number
            size="sm"
            v-model="magnesiumConsumption"
            :state="rules.magnesiumConsumption.state"
            aria-describedby="magnesium-consumption-invalid"
            debounce="200"
            @update="consumptionChange('magnesiumConsumption')"
          ></b-form-input>
          <b-form-invalid-feedback id="magnesium-consumption-invalid">
            {{
            rules.magnesiumConsumption.message
            }}
          </b-form-invalid-feedback>
        </b-form-group>
      </b-form>
    </div>
    <div>
      <b-button variant="outline-primary" size="sm" @click="updateConsumption">Update</b-button>
    </div>
    <div class="flex-grow-1">
      <b-nav tabs small class="mt-3">
        <b-nav-item @click="toggleActive(1)" :active="(activeLink === 1)">Daily Consumptions</b-nav-item>
        <b-nav-item @click="toggleActive(2)" :active="(activeLink === 2)">Monthly Consumptions</b-nav-item>
      </b-nav>
      <div v-if="(activeLink === 1)">
        <div class="d-flex flex-row align-items-center home-form flex-wrap mt-2">
          <b-form>
            <b-form-group label="Month" for="chart-month" label-size="sm">
              <b-form-select
                id="chart-month"
                size="sm"
                :options="chartMonth"
                v-model="chart.selectedMonth"
                @change="chartRangeChange"
              ></b-form-select>
            </b-form-group>
          </b-form>
          <b-form>
            <b-form-group label="Year" for="chart-year" label-size="sm">
              <b-form-select
                id="chart-year"
                size="sm"
                v-model="chart.selectedYear"
                :options="chartYear"
                @change="chartRangeChange"
              ></b-form-select>
            </b-form-group>
          </b-form>
        </div>
        <div class="d-flex flex-row flex-wrap flex-grow-1 w-100">
          <div class="position-relative chart-container">
            <bar-chart :chart-data="calciumChart" :options="chartOptions"></bar-chart>
          </div>
          <div class="position-relative chart-container">
            <bar-chart :chart-data="alkalinityChart" :options="chartOptions"></bar-chart>
          </div>
          <div class="position-relative chart-container">
            <bar-chart :chart-data="magnesiumChart" :options="chartOptions"></bar-chart>
          </div>
        </div>
      </div>
      <div v-if="(activeLink === 2)">
        <div class="d-flex flex-row align-items-center home-form flex-wrap mt-2">
          <b-form>
            <b-form-group label="Year" for="chart-year" label-size="sm">
              <b-form-select
                id="chart-year"
                size="sm"
                v-model="chart.selectedYear"
                :options="chartYear"
                @change="chartRangeChange"
              ></b-form-select>
            </b-form-group>
          </b-form>
        </div>
        <div class="d-flex flex-row flex-wrap flex-grow-1 w-100">
          <div class="position-relative chart-container">
            <bar-chart :chart-data="calciumChart" :options="chartOptions"></bar-chart>
          </div>
          <div class="position-relative chart-container">
            <bar-chart :chart-data="alkalinityChart" :options="chartOptions"></bar-chart>
          </div>
          <div class="position-relative chart-container">
            <bar-chart :chart-data="magnesiumChart" :options="chartOptions"></bar-chart>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      ref="zero-value-consumption-alert"
      centered
      title="Consumption(s) with zero value"
      @cancel="cancelUpdate"
      @ok="confirmUpdateConsumption"
    >
      <p class="my-4">There are consumption(s) with zero value. Proceed with update?</p>
      <ul>
        <li v-for="(item, index) in zeroAlert" :key="index">{{ item }}</li>
      </ul>
    </b-modal>
    <b-modal
      ref="tracking-exists-alert"
      centered
      title="Record with same date exists"
      @cancel="cancelUpdate"
    >
      <p
        class="my-4"
      >A record with the same date already exists in the system. Overwrite the record?</p>
    </b-modal>
  </div>
</template>

<script>
import BarChart from "@/components/BarChart";
import TrackingsService from "@/services/TrackingsService";

export default {
  name: "home",
  components: {
    BarChart
  },
  data() {
    return {
      activeLink: 0,
      chartOptions: {
        maintainAspectRatio: false,
        responsive: true
      },
      labels: [],
      calciumData: [],
      alkalinityData: [],
      magnesiumData: [],
      chartMonth: [
        { value: 1, text: "January" },
        { value: 2, text: "Feburary" },
        { value: 3, text: "March" },
        { value: 4, text: "April" },
        { value: 5, text: "May" },
        { value: 6, text: "June" },
        { value: 7, text: "July" },
        { value: 8, text: "August" },
        { value: 9, text: "September" },
        { value: 10, text: "October" },
        { value: 11, text: "November" },
        { value: 12, text: "December" }
      ],
      calciumConsumption: 0,
      alkalinityConsumption: 0,
      magnesiumConsumption: 0,
      zeroAlert: [],
      chart: {
        selectedMonth: new Date().getMonth() + 1,
        selectedYear: new Date().getFullYear()
      },
      rules: {
        calciumConsumption: {
          rules: [
            {
              validator: this.notNegative,
              message: "Input cannot be negative value"
            }
          ]
        },
        alkalinityConsumption: {
          rules: [
            {
              validator: this.notNegative,
              message: "Input cannot be negative value"
            }
          ]
        },
        magnesiumConsumption: {
          rules: [
            {
              validator: this.notNegative,
              message: "Input cannot be negative value"
            }
          ]
        }
      },
      selectedDate: new Date()
    };
  },
  mounted() {
    const self = this;
    const todayDate = new Date();
    const month = todayDate.getMonth() + 1;
    const year = todayDate.getFullYear();

    self.activeLink = 1;

    self.getTrackings();
  },
  computed: {
    currentDate: {
      get() {
        // input needs fullYear-fullMonth-fullDate
        const self = this;

        return `${self.selectedDate.getFullYear()}-${self.selectedDate.getMonth() +
          1}-${
          self.selectedDate.getDate() < 10
            ? "0" + self.selectedDate.getDate()
            : self.selectedDate.getDate()
        }`;
      },
      set(value) {
        const self = this;

        self.selectedDate = new Date(value);
      }
    },
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
            label: "Calcium Consumption",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
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
            label: "Alkalinity Consumption",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
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
            label: "Magnesium Consumption",
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            borderColor: "rgba(255, 206, 86, 1)",
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
        `${chartYear}-${chartMonth < 10 ? "0" + chartMonth : chartMonth}-${
          todayDate.getDate() < 10
            ? "0" + todayDate.getDate()
            : todayDate.getDate()
        }`
      );

      endDate = endDate.setDate(todayDate.getDate() + 1);

      if (month !== chartMonth || year !== chartYear) {
        chartMonth = chartMonth + 1;

        endDate = new Date(
          `${chartYear}-${chartMonth < 10 ? "0" + chartMonth : chartMonth}-01`
        );
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
        `${chartYear}-${chartMonth < 10 ? "0" + chartMonth : chartMonth}-01`
      );

      if (month !== chartMonth || year !== chartYear)
        startDate = `${chartYear}-${
          chartMonth < 10 ? "0" + chartMonth : chartMonth
        }-01`;

      return new Date(startDate);
    },
    todayDate() {
      const self = this;
      const todayDate = new Date();
      const year = todayDate.getFullYear();
      const month = todayDate.getMonth() + 1;
      const date = todayDate.getDate();

      return `${year}-${month < 10 ? "0" + month : month}-${
        date < 10 ? "0" + date : date
      }`;
    }
  },
  methods: {
    cancelUpdate() {
      const self = this;

      self.zeroAlert = [];
    },
    chartRangeChange() {
      const self = this;

      self.getTrackings();

      self.chartData = {
        labels: [],
        datasets: [
          {
            label: "GitHub Commits",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            data: []
          }
        ]
      };
    },
    async confirmUpdateConsumption() {
      const self = this;
      const tracking = await self.trackingExists();

      if (!tracking) {
        await TrackingsService.createTracking({
          calcium: self.calciumConsumption,
          alkalinity: self.alkalinityConsumption,
          magnesium: self.magnesiumConsumption,
          date: self.selectedDate,
          startDate: self.startDate,
          endDate: self.endDate
        });

        self.calciumConsumption = 0;
        self.alkalinityConsumption = 0;
        self.magnesiumConsumption = 0;

        self.getTrackings();
      } else {
        this.$refs["tracking-exists-alert"].show();
      }
    },
    consumptionChange(inProperty) {
      const self = this;

      self.getState(inProperty);
    },
    async getTrackings() {
      const self = this;
      const startDate = self.startDate;
      var endDate = self.endDate;

      self.$store.dispatch("setShowLoader", true);

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
        var date = _.get(tracking, "date");
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

      self.$store.dispatch("setShowLoader", false);
    },
    toggleActive(index) {
      const self = this;

      self.activeLink = index;
    },
    async trackingExists() {
      const self = this;

      const tracking = await TrackingsService.getTracking({
        date: this.selectedDate
      });

      if (!self.isNullOrEmpty(tracking)) return true;
      else return false;
    },
    updateConsumption() {
      const self = this;
      const calciumConsumption = self.calciumConsumption;
      const alkalinityConsumption = self.alkalinityConsumption;
      const magnesiumConsumption = self.magnesiumConsumption;
      let zeroAlert = [];

      if (calciumConsumption === 0) zeroAlert.push("Calcium");

      if (alkalinityConsumption === 0) zeroAlert.push("Alkalinity");

      if (magnesiumConsumption === 0) zeroAlert.push("Magnesium");

      if (zeroAlert.length > 0) {
        self.zeroAlert = zeroAlert;
        this.$refs["zero-value-consumption-alert"].show();
      } else {
        var valid = this.validateRules();

        if (!self.isNullOrEmpty(valid) && !valid) {
        } else self.confirmUpdateConsumption();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  padding: 1rem;
  .home-form {
    & > form {
      width: 250px;
    }
    & > form:not(:last-child) {
      margin-right: 1rem;
    }
  }
  & > .chart-container:not(:last-child) {
    margin-bottom: 2rem;
  }
}
.chart-container {
  width: calc((100% - 2rem) / 2);
  display: inline-block;
}
.chart-container:nth-child(odd) {
  margin-right: 1rem;
}
</style>
