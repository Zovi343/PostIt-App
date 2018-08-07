import React from 'react';
import { shallow } from 'enzyme';
import { UserSection } from '../../components/UserSection';
import SignUpForm from '../../components/SingUpForm';
import user from '../fixtures/usersFixtures';

let startSignUp, 
    startLogin, 
    startLogout, 
    setYourArticlesFilter, 
    removeYourArticlesFilter,
    history,
    wrapper;

beforeEach(() => {
    startSignUp = jest.fn();
    startLogin =jest.fn();
    startLogout = jest.fn();
    setYourArticlesFilter = jest.fn();
    removeYourArticlesFilter = jest.fn();
    history= { push: jest.fn() }
    wrapper = shallow(<UserSection 
        startSignUp={startSignUp}
        startLogin={startLogin}
        startLogout={startLogout}
        setYourArticlesFilter={setYourArticlesFilter}
        removeYourArticlesFilter={removeYourArticlesFilter}
        user={{}}
        authFailed={undefined}
        filter={null}
        networkError={false}
        history={history}
                    />)
});

test('should render UserSection when loginIn', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render UserSection when signingUp', () => {
    wrapper.setState({ login: false });
    expect(wrapper).toMatchSnapshot();
});

test('should render UserSection when user is loggedIn', () => {
    wrapper = shallow(<UserSection 
        startSignUp={startSignUp}
        startLogin={startLogin}
        startLogout={startLogout}
        setYourArticlesFilter={setYourArticlesFilter}
        removeYourArticlesFilter={removeYourArticlesFilter}
        user={user} //<-- this is diffrent from befaoreach shallow
        authFailed={undefined}
        filter={null}
        networkError={false}
        history={history}
                    />)
    expect(wrapper).toMatchSnapshot();
});

test('should call startLogin onSubmitLogin when I am on on LoginForm', () => {
    wrapper.find('LoginForm').prop('onSubmit')(user);
    expect(startLogin).toHaveBeenLastCalledWith(user);
});

test('should cahnge login in state to false when changeForm is called on LoginForm', () => {
    wrapper.find('LoginForm').prop('changeForm')();
    expect(wrapper.state('login')).toBe(false);
});

// In order to make this two test work I had to import SignUpForm  query by that(I am not sure why I had to do this because two test cases above worked fine when querying only with string)
test('should call startSignUp onSubmitSignUp when I am on on SignUpForm', () => {
    wrapper.setState({ login: false });
    wrapper.find(SignUpForm).prop('onSubmit')(user);
    expect(startSignUp).toHaveBeenLastCalledWith(user);
});

test('should cahnge login in state to true when changeForm is called on SignUpForm', () => {
    wrapper.setState({ login: false });
    wrapper.find(SignUpForm).prop('changeForm')();
    expect(wrapper.state('login')).toBe(true);
});

test('should call call startLogout and removeArticles when LogginOut while on LoggedIn part', () => {
    wrapper = shallow(<UserSection 
        startSignUp={startSignUp}
        startLogin={startLogin}
        startLogout={startLogout}
        setYourArticlesFilter={setYourArticlesFilter}
        removeYourArticlesFilter={removeYourArticlesFilter}
        user={user} //<-- this is diffrent from befaoreach shallow
        authFailed={undefined}
        filter={null}
        networkError={false}
        history={history}
                    />, );
    wrapper.setState({ login: false });
    wrapper.find('LoggedIn').prop('onLogout')();
    expect(wrapper.state('login')).toBe(true);
    expect(startLogout).toHaveBeenLastCalledWith(user.token)
    expect(removeYourArticlesFilter).toHaveBeenCalledTimes(1);
    // I was not able to setup window.location.href(gosh!)
    //expect(history.push).toHaveBeenCalledWith('/');
});

test('should call setYourArticleFilter() when handleFilter is called while on LoggedIn part', () => {
    wrapper = shallow(<UserSection 
        startSignUp={startSignUp}
        startLogin={startLogin}
        startLogout={startLogout}
        setYourArticlesFilter={setYourArticlesFilter}
        removeYourArticlesFilter={removeYourArticlesFilter}
        user={user} //<-- this is diffrent from befaoreach shallow
        authFailed={undefined}
        filter={null}
        networkError={false}
        history={history}
                    />, );
    wrapper.find('LoggedIn').prop('handleFilter')();
    expect(setYourArticlesFilter).toHaveBeenCalledTimes(1);
});

test('should call removeYourArticleFilter() if filter is true and when handleFilter is called while on LoggedIn part', () => {
    wrapper = shallow(<UserSection 
        startSignUp={startSignUp}
        startLogin={startLogin}
        startLogout={startLogout}
        setYourArticlesFilter={setYourArticlesFilter}
        removeYourArticlesFilter={removeYourArticlesFilter}
        user={user} //<-- this is diffrent from befaoreach shallow
        authFailed={undefined}
        filter={true}
        networkError={false}
        history={history}
                    />, );
    wrapper.find('LoggedIn').prop('handleFilter')();
    expect(removeYourArticlesFilter).toHaveBeenCalledTimes(1);
});

test('should render Server is down when there is networkError', () => {
    wrapper = shallow(<UserSection 
        startSignUp={startSignUp}
        startLogin={startLogin}
        startLogout={startLogout}
        setYourArticlesFilter={setYourArticlesFilter}
        removeYourArticlesFilter={removeYourArticlesFilter}
        user={user} //<-- this is diffrent from befaoreach shallow
        authFailed={undefined}
        filter={null}
        networkError={true}
        history={history}
                    />, );
    expect(wrapper).toMatchSnapshot();
});
