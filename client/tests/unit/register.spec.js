import { mount, createLocalVue } from '@vue/test-utils';
import Register from '@/views/Register.vue';
import Vuetify from 'vuetify';

jest.mock('@/services/LoginsService');
jest.useFakeTimers();

const localVue = createLocalVue();

describe('Register.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('renders registration form correctly', () => {
    const wrapper = mount(Register, {
      localVue,
      vuetify
    });

    expect(wrapper.find('#email').isVisible()).toBe(true);

    expect(wrapper.find('#password').isVisible()).toBe(true);

    expect(wrapper.find('#confirmPassword').isVisible()).toBe(true);
  });

  it('checks that handleRegister is fire upon clicking register', async () => {
    const handleRegister = jest.fn();
    const wrapper = mount(Register, {
      localVue,
      vuetify,
      methods: {
        handleRegister
      }
    });

    const register = wrapper.find('#register');
    register.trigger('click');

    await wrapper.vm.$nextTick();

    expect(handleRegister).toHaveBeenCalledTimes(1);
  });

  it('renders 3 errors text when register is trigger on empty form', async () => {
    const wrapper = mount(Register, {
      localVue,
      vuetify
    });

    const register = wrapper.find('#register');
    register.trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.v-messages.error--text').length).toBe(3);
  });

  it('checks that handleEmailInput is fire upon input email', async () => {
    const handleEmailInput = jest.fn();
    const wrapper = mount(Register, {
      localVue,
      vuetify,
      methods: {
        handleEmailInput
      }
    });

    const email = wrapper.find('#email');
    email.setValue('test@email.com');

    await wrapper.vm.$nextTick();

    expect(handleEmailInput).toHaveBeenCalledTimes(1);
  });

  it('renders correct error for email', async () => {
    const wrapper = mount(Register, {
      localVue,
      vuetify
    });

    const email = wrapper.find('#email');
    email.setValue('1234');

    jest.runAllTimers();

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.v-messages__message').length).toBe(1);
    expect(wrapper.find('.v-messages__message').text()).toBe(
      'Invalid email format'
    );

    email.setValue('invalid@email.com');

    jest.runAllTimers();

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.v-messages__message').length).toBe(1);
    expect(wrapper.find('.v-messages__message').text()).toBe(
      'Email is already taken.'
    );

    email.setValue('valid@email.com');

    jest.runAllTimers();

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.v-messages__message').length).toBe(0);
  });

  it('checks that handlePasswordInput is fire upon input both password fields', async () => {
    const handlePasswordInput = jest.fn();
    const wrapper = mount(Register, {
      localVue,
      vuetify,
      methods: {
        handlePasswordInput
      }
    });

    const password = wrapper.find('#password');
    password.setValue('1234567@');

    jest.runAllTimers();

    await wrapper.vm.$nextTick();

    expect(handlePasswordInput).toHaveBeenCalledTimes(1);

    const confirmPassword = wrapper.find('#confirmPassword');
    confirmPassword.setValue('1234567@');

    jest.runAllTimers();

    await wrapper.vm.$nextTick();

    expect(handlePasswordInput).toHaveBeenCalledTimes(2);
  });

  it('renders correct error for password', async () => {
    const wrapper = mount(Register, {
      localVue,
      vuetify
    });

    const password = wrapper.find('#password');
    password.setValue('1234');

    jest.runAllTimers();

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.v-messages__message').length).toBe(1);
    expect(wrapper.find('.v-messages__message').text()).toBe(
      'Password must be at least 8 characters long'
    );

    password.setValue('12345678');

    jest.runAllTimers();

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.v-messages__message').length).toBe(1);
    expect(wrapper.find('.v-messages__message').text()).toBe(
      'Password must contains at least one of the following special character (!@#$%^&)'
    );

    password.setValue('1234567@');

    jest.runAllTimers();

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.v-messages__message').length).toBe(0);
  });

  it('renders errors on both password and confirm password when both do not match', async () => {
    const wrapper = mount(Register, {
      localVue,
      vuetify
    });

    const password = wrapper.find('#password');
    password.setValue('1234567@');

    jest.runAllTimers();

    await wrapper.vm.$nextTick();

    const confirmPassword = wrapper.find('#confirmPassword');
    confirmPassword.setValue('12345678@');

    jest.runAllTimers();

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.v-messages__message').length).toBe(2);
    expect(
      wrapper
        .findAll('.v-messages__message')
        .at(0)
        .text()
    ).toBe('Passwords do not match');
    expect(
      wrapper
        .findAll('.v-messages__message')
        .at(1)
        .text()
    ).toBe('Passwords do not match');

    confirmPassword.setValue('1234567@');

    jest.runAllTimers();

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.v-messages__message').length).toBe(0);
  });

  it('checks that handleCancel is fire upon clicking cancel', async () => {
    const mocks = {
      $router: {
        push: jest.fn()
      }
    };

    const wrapper = mount(Register, {
      localVue,
      vuetify,
      mocks
    });

    const cancel = wrapper.find('#cancel');
    cancel.trigger('click');

    await wrapper.vm.$nextTick();

    expect(mocks.$router.push).toHaveBeenCalledTimes(1);
  });

  it('registration successful', async () => {
    const wrapper = mount(Register, {
      localVue,
      vuetify
    });

    const email = wrapper.find('#email');
    email.setValue('test@email.com');

    jest.runAllTimers();

    await wrapper.vm.$nextTick();

    const password = wrapper.find('#password');
    password.setValue('12345678@');

    jest.runAllTimers();

    await wrapper.vm.$nextTick();

    const confirmPassword = wrapper.find('#confirmPassword');
    confirmPassword.setValue('12345678@');

    jest.runAllTimers();

    await wrapper.vm.$nextTick();

    const register = wrapper.find('#register');
    register.trigger('click');

    await wrapper.vm.$nextTick();
  });
});
