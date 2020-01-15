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

    jest.runAllTimers();

    await wrapper.vm.$nextTick();

    expect(litre.element.value).toBe('3.79');

    gallon.setValue(-1);

    jest.runAllTimers();

    await wrapper.vm.$nextTick();

    expect(litre.element.value).toBe('0');

    litre.setValue(11.36);

    jest.runAllTimers();

    await wrapper.vm.$nextTick();

    expect(gallon.element.value).toBe('3');

    litre.setValue(-1);

    jest.runAllTimers();

    await wrapper.vm.$nextTick();

    expect(gallon.element.value).toBe('0');
  });

  it('clearTimer is called whenever input is still being typed', async () => {
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
        clearTimer
      }
    });

    const currentCalcium = wrapper.find('#currentCalcium');

    currentCalcium.setValue('1');

    expect(clearTimer).toHaveBeenCalledTimes(0);

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
      mocks
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

  it('calculate the required amount for calcium when current and expected calcium is input', async () => {
    const mocks = {
      $store: {
        getters: {
          getSettings: () => {
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
      mocks
    });

    // wrapper.find('#litre').setValue(400);

    // await wrapper.vm.$nextTick();

    // wrapper.find('#currentCalcium').setValue(460);

    // jest.runOnlyPendingTimers();

    // await wrapper.vm.$nextTick();

    // wrapper.find('#expectedCalcium').setValue(480);

    // jest.runOnlyPendingTimers();

    // await wrapper.vm.$nextTick();

    // wrapper.setData({ calcium: { brand: 1 } });

    // await wrapper.vm.$nextTick();

    // wrapper.find('#calculateDosage').trigger('click');

    // await wrapper.vm.$nextTick();
  });
});
