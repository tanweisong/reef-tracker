import { createLocalVue, mount } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import Vuetify from 'vuetify';

jest.mock('@/services/TrackingsService');
jest.useFakeTimers();

const localVue = createLocalVue();

describe('Home.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('gets tracking is called after mounting', async () => {
    const getTrackings = jest.fn();
    const mocks = {
      $store: {
        getters: {
          getLogin: jest.fn()
        },
        dispatch: jest.fn()
      }
    };
    const wrapper = mount(Home, {
      localVue,
      vuetify,
      mocks,
      methods: {
        getTrackings
      },
      data() {
        return {
          labels: [1, 2, 3, 4, 5],
          calciumData: [0, 0, 0, 0, 0],
          alkalinityData: [0, 0, 0, 0, 0],
          magnesiumData: [0, 0, 0, 0, 0]
        };
      }
    });
    expect(getTrackings).toHaveBeenCalled();
  });

  // it('renders error correctly when clicking update', async () => {
  //   const mocks = {
  //     $store: {
  //       getters: {
  //         getLogin: jest.fn()
  //       }
  //     }
  //   };
  //   const wrapper = mount(Home, {
  //     localVue,
  //     vuetify,
  //     mocks
  //   });

  //   wrapper.vm.$nextTick();

  //   const calcium = wrapper.find('#calcium');
  //   const alkalinity = wrapper.find('#alkalinity');
  //   const magnesium = wrapper.find('#magnesium');
  //   const update = wrapper.find('#update');

  //   calcium.setValue('');
  //   alkalinity.setValue('');
  //   magnesium.setValue('');

  //   update.trigger('click');

  //   await wrapper.vm.$nextTick();

  //   expect(wrapper.findAll('.v-messages__message').length).toBe(3);

  //   calcium.setValue(0);
  //   alkalinity.setValue(0);
  //   magnesium.setValue(0);

  //   update.trigger('click');

  //   await wrapper.vm.$nextTick();

  //   expect(wrapper.findAll('.v-messages__message').length).toBe(0);
  // });

  // it('triggers handleUpdate when update is click', async () => {
  //   const handleUpdate = jest.fn();
  //   const mocks = {
  //     $store: {
  //       getters: {
  //         getLogin: jest.fn()
  //       }
  //     }
  //   };
  //   const wrapper = mount(Home, {
  //     localVue,
  //     vuetify,
  //     mocks,
  //     methods: {
  //       handleUpdate
  //     },
  //     data() {
  //       return {
  //         startDate: new Date('1 Jan 2020'),
  //         endDate: new Date('31 Jan 2020')
  //       };
  //     }
  //   });

  // wrapper.find('#update').trigger('click');

  // await wrapper.vm.$nextTick();

  // expect(handleUpdate).toHaveBeenCalled();
  // });
});
