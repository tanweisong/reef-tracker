import { createLocalVue, mount } from '@vue/test-utils';
import Login from '@/views/Login.vue';
import Vuetify from 'vuetify';

jest.mock('@/services/LoginsService');
jest.useFakeTimers();

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

  it('renders correct error for login', async () => {
    const mocks = {
      $store: {
        dispatch: jest.fn(),
        actions: {
          setLogin: jest.fn(),
          setShowLoader: jest.fn()
        },
        getters: {
          getShowLoader: jest.fn()
        }
      },
      $router: {
        push: jest.fn()
      }
    };

    const wrapper = mount(Login, {
      localVue,
      vuetify,
      mocks
    });

    const username = wrapper.find('#username');

    username.setValue('invalid@email.com');
    wrapper.find('#password').setValue('1234567@');

    const login = wrapper.find('#login');

    login.trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.v-snack').isVisible()).toBeTruthy();
    expect(wrapper.find('.v-snack__content').text()).toBe('Invalid Login.');

    jest.runAllTimers();

    username.setValue('valid@email.com');

    login.trigger('click');

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('loggedIn')).toBeTruthy();

    await wrapper.vm.$nextTick();

    expect(mocks.$router.push).toHaveBeenCalledWith({
      path: '/'
    });
  });
});
