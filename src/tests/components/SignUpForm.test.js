import React from 'react';
import { shallow } from 'enzyme';
import SignUpForm from '../../components/SingUpForm';

let changeForm, onSubmit, wrapper;

beforeEach(() => {
    changeForm = jest.fn();
    onSubmit = jest.fn();
    wrapper = shallow(<SignUpForm 
        authFailed={null} 
        changeForm={changeForm} 
        onSubmit={onSubmit}
    />)
})

test('should render SignUpForm correctly', () => {
    expect(wrapper).toMatchSnapshot();
});


test('should call this.props.onSubmit when form is submitted', () => {
    const name = 'Mark';
    const password = 'heslo1';
    const passwordAgain = 'heslo1';
    wrapper.setState({ name, password, passwordAgain  });
    wrapper.find('form').simulate('submit' ,{
        preventDefault: () => {}
    });
    expect(onSubmit).toHaveBeenLastCalledWith({name, password});
});

test('should not call this.props.onSubmit if name or passwords do not have length greater than 3', () => {
    const name = 'Mark';
    const password = 'heslo';
    const passwordAgain = 'heslo';
    wrapper.setState({ name, password, passwordAgain  });
    wrapper.find('form').simulate('submit' ,{
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('Your name must contain at least 3 characters and password must contain at least 6');
});

test('should not call this.props.onSubmit if passwords do not mathc', () => {
    const name = 'Mark';
    const password = 'heslo1';
    const passwordAgain = 'heslo2';
    wrapper.setState({ name, password, passwordAgain  });
    wrapper.find('form').simulate('submit' ,{
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('Passwords do not match!');
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
    wrapper = shallow(<SignUpForm 
        authFailed={{ error: 'This name already exists', login: false}} 
        changeForm={changeForm} 
        onSubmit={onSubmit}
    />)
    expect(wrapper).toMatchSnapshot();
});
