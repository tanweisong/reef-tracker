import { createLocalVue, mount } from '@vue/test-utils';
import Login from '@/views/Login.vue';
import Vuetify from 'vuetify';

jest.mock('@/services/LoginsService');

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
          getters: {
            getShowLoader: jest.fn()
          }
        }
      }
    });

    expect(wrapper.find('#username').isVisible()).toBeTruthy();
    expect(wrapper.find('#password').isVisible()).toBeTruthy();
    expect(wrapper.find('#login').isVisible()).toBeTruthy();
  });

  it('route to register on clicking register button', async () => {
    const mocks = {
      $router: {
        push: jest.fn(),
        catch: jest.fn()
      },
      $store: {
        getters: {
          getShowLoader: jest.fn()
        }
      }
    };
    const wrapper = mount(Login, {
      localVue,
      vuetify,
      mocks
    });

    const register = wrapper.find('#register');
    register.trigger('click');

    await wrapper.vm.$nextTick();

    expect(mocks.$router.push).toHaveBeenCalledWith({
      path: '/register'
    });
  });
});
