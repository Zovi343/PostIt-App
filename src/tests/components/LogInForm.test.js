import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '../../components/LogInForm';

let changeForm, onSubmit, wrapper;

beforeEach(() => {
    changeForm = jest.fn();
    onSubmit = jest.fn();
    wrapper = shallow(<LoginForm 
        authFailed={null} 
        changeForm={changeForm} 
        onSubmit={onSubmit}
    />)
})

test('should render LogInForm correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should call this.props.onSubmit when form is submitted', () => {
    const name = 'Mark';
    const password = 'heslo1';
    wrapper.setState({ name, password});
    wrapper.find('form').simulate('submit' ,{
        preventDefault: () => {}
    });
    expect(onSubmit).toHaveBeenLastCalledWith({name, password});
});

test('should change name on input change', () => {
    const value = 'Mark';
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('name')).toBe(value);
});

test('should change password on input change', () => {
    const value = 'heslo1';
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('password')).toBe(value);
});

test('should call changeForm when clicked on OR SignUp button', () => {
    wrapper.find('button').simulate('click');
    expect(changeForm).toHaveBeenCalled();
});

test('should render error when authFailed is passed down with value', () => {
    wrapper = shallow(<LoginForm 
        authFailed={{ error: 'Wrong name or password.', login: true}} 
        changeForm={changeForm} 
        onSubmit={onSubmit}
    />)
    expect(wrapper).toMatchSnapshot();
});
