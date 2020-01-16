import { createLocalVue, mount } from '@vue/test-utils';
import DosingCalculation from '@/views/DosingCalculation.vue';
import Vuetify from 'vuetify';

jest.mock('@/services/SettingsService');
jest.useFakeTimers();

const localVue = createLocalVue();

describe('Home.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('clearTimer is called whenever litre is still being typed', async () => {
    const clearTimer = jest.fn();
    const mocks = {
      $store: {
        getters: {
          getSettings: () => {
            return {
              calcium: [],
              alkalinity: [],
              magnesium: []
            };
          }
        },
        dispatch: jest.fn()
      },
      $router: {
        push: jest.fn()
      }
    };
    const wrapper = mount(DosingCalculation, {
      localVue,
      vuetify,
      mocks,
      methods: {
        roundToDecimalPlaces: jest.fn(function(x, y) {
          if (!isNaN(x) && !isNaN(y))
            return parseFloat(parseFloat(x).toFixed(Number(y)));
          else return null;
        }),
        clearTimer
      }
    });

    const litre = wrapper.find('#litre');

    litre.setValue('10');

    expect(clearTimer).not.toHaveBeenCalled();

    litre.setValue('100');

    expect(clearTimer).toHaveBeenCalled();

    jest.runOnlyPendingTimers();
  });

  it('checks that gallon and litre are updated correctly when either one changes', async () => {
    const mocks = {
      $store: {
        getters: {
          getSettings: () => {
            return {
              calcium: [],
              alkalinity: [],
              magnesium: []
            };
          }
        },
        dispatch: jest.fn()
      },
      $router: {
        push: jest.fn()
      }
    };
    const wrapper = mount(DosingCalculation, {
      localVue,
      vuetify,
      mocks,
      methods: {
        roundToDecimalPlaces: jest.fn(function(x, y) {
          if (!isNaN(x) && !isNaN(y))
            return parseFloat(parseFloat(x).toFixed(Number(y)));
          else return null;
        })
      }
    });

    const gallon = wrapper.find('#gallon');
    const litre = wrapper.find('#litre');

    gallon.setValue(1);

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    expect(litre.element.value).toBe('3.79');

    gallon.setValue(-1);

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    expect(litre.element.value).toBe('0');

    litre.setValue(11.36);

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    expect(gallon.element.value).toBe('3');

    litre.setValue(-1);

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    expect(gallon.element.value).toBe('0');
  });

  it('clearTimer is called whenever calcium is still being typed', async () => {
    const clearTimer = jest.fn();
    const mocks = {
      $store: {
        getters: {
          getSettings: () => {
            return {
              calcium: [],
              alkalinity: [],
              magnesium: []
            };
          }
        },
        dispatch: jest.fn()
      },
      $router: {
        push: jest.fn()
      }
    };
    const wrapper = mount(DosingCalculation, {
      localVue,
      vuetify,
      mocks,
      methods: {
        clearTimer,
        roundToDecimalPlaces: jest.fn(function(x, y) {
          if (!isNaN(x) && !isNaN(y))
            return parseFloat(parseFloat(x).toFixed(Number(y)));
          else return null;
        })
      }
    });

    const currentCalcium = wrapper.find('#currentCalcium');

    currentCalcium.setValue('1');

    expect(clearTimer).not.toHaveBeenCalled();

    currentCalcium.setValue('12');

    expect(clearTimer).toHaveBeenCalled();

    jest.runOnlyPendingTimers();
  });

  it('renders error correctly when current is lower than expected', async () => {
    const mocks = {
      $store: {
        getters: {
          getSettings: () => {
            return {
              calcium: [],
              alkalinity: [],
              magnesium: []
            };
          }
        },
        dispatch: jest.fn()
      },
      $router: {
        push: jest.fn()
      }
    };
    const wrapper = mount(DosingCalculation, {
      localVue,
      vuetify,
      mocks,
      methods: {
        roundToDecimalPlaces: jest.fn(function(x, y) {
          if (!isNaN(x) && !isNaN(y))
            return parseFloat(parseFloat(x).toFixed(Number(y)));
          else return null;
        })
      }
    });

    const currentCalcium = wrapper.find('#currentCalcium');
    const expectedCalcium = wrapper.find('#expectedCalcium');

    currentCalcium.setValue(500);

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    expectedCalcium.setValue(480);

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.v-messages.error--text').length).toBe(1);
    expect(wrapper.find('.v-messages__message').text()).toBe(
      'Current calcium cannot be lesser than expected calcium'
    );

    currentCalcium.setValue(470);

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.v-messages.error--text').length).toBe(0);
  });

  it('returns 0 for required calcium when there is no tank volume input', async () => {
    const mocks = {
      $store: {
        getters: {
          getSettings: jest.fn()
        },
        dispatch: jest.fn()
      },
      $router: {
        push: jest.fn()
      }
    };
    const wrapper = mount(DosingCalculation, {
      localVue,
      vuetify,
      mocks,
      methods: {
        roundToDecimalPlaces: jest.fn(function(x, y) {
          if (!isNaN(x) && !isNaN(y))
            return parseFloat(parseFloat(x).toFixed(Number(y)));
          else return null;
        })
      },
      computed: {
        settings() {
          return {
            calcium: [
              {
                _id: 1,
                brand: 'Calcium Brand A',
                dosage: 2,
                dosageUOM: 'millilitre',
                per: '100',
                uom: 'l',
                increase: '2'
              }
            ],
            alkalinity: [],
            magnesium: []
          };
        }
      }
    });

    wrapper.find('#litre').setValue('');

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    wrapper.find('#currentCalcium').setValue(460);

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    wrapper.find('#expectedCalcium').setValue(480);

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    wrapper.setData({ calcium: { brand: 1 } });

    wrapper.find('#calculateDosage').trigger('click');

    expect(wrapper.find('#requiredCalcium').element.value).toBe('0');
  });

  it('returns 0 for needed calcium when 0 is input for tank volume', async () => {
    const mocks = {
      $store: {
        getters: {
          getSettings: jest.fn()
        },
        dispatch: jest.fn()
      },
      $router: {
        push: jest.fn()
      }
    };
    const wrapper = mount(DosingCalculation, {
      localVue,
      vuetify,
      mocks,
      methods: {
        roundToDecimalPlaces: jest.fn(function(x, y) {
          if (!isNaN(x) && !isNaN(y))
            return parseFloat(parseFloat(x).toFixed(Number(y)));
          else return null;
        })
      },
      computed: {
        settings() {
          return {
            calcium: [
              {
                _id: 1,
                brand: 'Calcium Brand A',
                dosage: 2,
                dosageUOM: 'millilitre',
                per: '100',
                uom: 'l',
                increase: '2'
              }
            ],
            alkalinity: [],
            magnesium: []
          };
        }
      }
    });

    wrapper.find('#litre').setValue(0);

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    wrapper.find('#currentCalcium').setValue(460);

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    wrapper.find('#expectedCalcium').setValue(480);

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    wrapper.setData({ calcium: { brand: 1 } });

    wrapper.find('#calculateDosage').trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.find('#requiredCalcium').element.value).toBe('0');
  });

  it('calculate the required amount for calcium when current and expected calcium is input', async () => {
    const mocks = {
      $store: {
        getters: {
          getSettings: jest.fn()
        },
        dispatch: jest.fn()
      },
      $router: {
        push: jest.fn()
      }
    };
    const wrapper = mount(DosingCalculation, {
      localVue,
      vuetify,
      mocks,
      methods: {
        roundToDecimalPlaces: jest.fn(function(x, y) {
          if (!isNaN(x) && !isNaN(y))
            return parseFloat(parseFloat(x).toFixed(Number(y)));
          else return null;
        })
      },
      computed: {
        settings() {
          return {
            calcium: [
              {
                _id: 1,
                brand: 'Calcium Brand A',
                dosage: 2,
                dosageUOM: 'millilitre',
                per: '100',
                uom: 'l',
                increase: '2'
              },
              {
                _id: 2,
                brand: 'Calcium Brand B',
                dosage: 2,
                dosageUOM: 'millilitre',
                per: '30',
                uom: 'g',
                increase: '2'
              }
            ],
            alkalinity: [],
            magnesium: []
          };
        }
      }
    });

    wrapper.find('#litre').setValue(400);

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    wrapper.find('#currentCalcium').setValue(460);

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    wrapper.find('#expectedCalcium').setValue(480);

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    wrapper.setData({ calcium: { brand: 1 } });

    wrapper.find('#calculateDosage').trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.find('#requiredCalcium').element.value).toBe('80');

    await wrapper.vm.$nextTick();

    wrapper.setData({ calcium: { brand: 2 } });

    wrapper.find('#calculateDosage').trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.find('#requiredCalcium').element.value).toBe('70.45');
  });
});
