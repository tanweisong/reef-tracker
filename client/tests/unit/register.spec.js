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

    expect(wrapper.find('#email').isVisible()).toBeTruthy();
    expect(wrapper.find('#password').isVisible()).toBeTruthy();
    expect(wrapper.find('#confirmPassword').isVisible()).toBeTruthy();
  });

  it('on keydown enter triggers handleEnter', async () => {
    const handleEnter = jest.fn();
    const wrapper = mount(Register, {
      localVue,
      vuetify,
      methods: {
        handleEnter
      }
    });

    wrapper.find('#email').trigger('keydown.esc');

    expect(handleEnter).not.toHaveBeenCalled();

    wrapper.find('#email').trigger('keydown.enter');

    expect(handleEnter).toHaveBeenCalled();
  });

  it('on keydown enter triggers handleRegister', async () => {
    const handleRegister = jest.fn();
    const wrapper = mount(Register, {
      localVue,
      vuetify,
      methods: {
        handleRegister
      }
    });

    wrapper.find('#email').trigger('keydown.esc');

    expect(handleRegister).not.toHaveBeenCalled();

    wrapper.find('#email').trigger('keydown.enter');

    expect(handleRegister).toHaveBeenCalled();
  });

  it('renders 3 errors text when register is trigger on empty form', async () => {
    const wrapper = mount(Register, {
      localVue,
      vuetify
    });

    wrapper.find('#register').trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.v-messages.error--text').length).toBe(3);
  });

  it('renders correct error for email', async () => {
    const clearTimer = jest.fn();
    const wrapper = mount(Register, {
      localVue,
      vuetify,
      methods: {
        clearTimer
      }
    });

    const email = wrapper.find('#email');
    email.setValue('1234');

    expect(clearTimer).not.toHaveBeenCalled();

    email.setValue('12345');

    expect(clearTimer).toHaveBeenCalled();

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.v-messages__message').length).toBe(1);
    expect(wrapper.find('.v-messages__message').text()).toBe(
      'Invalid email format'
    );

    email.setValue('invalid@email.com');

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.v-messages__message').length).toBe(1);
    expect(wrapper.find('.v-messages__message').text()).toBe(
      'Email is already taken.'
    );

    email.setValue('valid@email.com');

    jest.runOnlyPendingTimers();

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

    wrapper.find('#password').setValue('1234567@');

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    expect(handlePasswordInput).toHaveBeenCalled();

    wrapper.find('#confirmPassword').setValue('1234567@');

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    expect(handlePasswordInput).toHaveBeenCalled();
  });

  it('renders correct errors for both passwords', async () => {
    const wrapper = mount(Register, {
      localVue,
      vuetify
    });

    const password = wrapper.find('#password');
    password.setValue('1234');

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.v-messages__message').length).toBe(1);
    expect(wrapper.find('.v-messages__message').text()).toBe(
      'Password must be at least 8 characters long'
    );

    password.setValue('12345678');

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.v-messages__message').length).toBe(1);
    expect(wrapper.find('.v-messages__message').text()).toBe(
      'Password must contains at least one of the following special character (!@#$%^&)'
    );

    password.setValue('1234567@');

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    const confirmPassword = wrapper.find('#confirmPassword');
    confirmPassword.setValue('1234');

    jest.runOnlyPendingTimers();

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

    jest.runOnlyPendingTimers();

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

    wrapper.find('#cancel').trigger('click');

    await wrapper.vm.$nextTick();

    expect(mocks.$router.push).toHaveBeenCalledWith({
      path: '/login'
    });
  });

  it('renders correct error for registration', async () => {
    const wrapper = mount(Register, {
      localVue,
      vuetify
    });

    const email = wrapper.find('#email');
    email.setValue('test@email.com');

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    wrapper.find('#password').setValue('12345678@');

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    wrapper.find('#confirmPassword').setValue('12345678@');

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    wrapper.find('#register').trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.v-snack').isVisible()).toBeTruthy();
    expect(wrapper.find('.v-snack__content').text()).toBe(
      'Error creating account'
    );

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    email.setValue('valid@email.com');

    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    wrapper.find('#register').trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.v-snack').isVisible()).toBeTruthy();
    expect(wrapper.find('.v-snack__content').text()).toBe(
      'Account created successfully!'
    );
  });
});
