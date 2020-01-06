import { createLocalVue, mount } from '@vue/test-utils';
import Login from '@/views/Login.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';

const localVue = createLocalVue();

describe('Login.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('renders login form correctly', () => {
    const wrapper = mount(Login, {
      localVue,
      vuetify,
      mocks: {
        $store: {
          dispatch: jest.fn(),
          getters: {}
        }
      }
    });
  });
});
