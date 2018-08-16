import React from 'react';
import { shallow } from 'enzyme';
import { ArticleListFilter } from '../../components/ArticleListFilter';

test('should render ArticleListFilter with both buttons disabled set to true if user is not logged in', () => {
    const filter = {
        yourArticles: false,
        text: ''
    }
    const wrapper = shallow(<ArticleListFilter filter={filter} user={{}}/>);
    expect(wrapper).toMatchSnapshot();
});

test('only button See Your Articles should not be disabled if user is logged in', () => {
    const filter = {
        yourArticles: false,
        text: ''
    }
    const wrapper = shallow(<ArticleListFilter filter={filter} user={{name: 'Mark'}}/>);
    expect(wrapper.find('button').at(0).props().disabled).toBe(true);
    expect(wrapper.find('button').at(1).props().disabled).toBe(false);
});

test('both buttons should not be disabled if user is logged in and there is some text in search field', () => {
    const filter = {
        yourArticles: false,
        text: 'some text'
    }
    const wrapper = shallow(<ArticleListFilter filter={filter} user={{name: 'Mark'}}/>);
    expect(wrapper.find('button').at(0).props().disabled).toBe(false);
    expect(wrapper.find('button').at(1).props().disabled).toBe(false);
});

test('only button See ALl Articles should not be disabled if user is logged in and he is alredy viewing his articles', () => {
    const filter = {
        yourArticles: true,
        text: 'some text'
    }
    const wrapper = shallow(<ArticleListFilter filter={filter} user={{name: 'Mark'}}/>);
    expect(wrapper.find('button').at(0).props().disabled).toBe(false);
    expect(wrapper.find('button').at(1).props().disabled).toBe(true);
});

test('should call setTextFilter when value in input field changes', () => {
    const setTextFilter = jest.fn();
    const filter = {
        yourArticles: true,
        text: ''
    }
    const wrapper = shallow(<ArticleListFilter filter={filter} setTextFilter={setTextFilter} user={{name: 'Mark'}}/>);
    wrapper.find('input').simulate('change', { target: { value: 'test' }});
    expect(setTextFilter).toHaveBeenLastCalledWith('test');
});

test('should call setYourArticlesFilter when user clicks See Your Articles button', () => {
    const setYourArticlesFilter = jest.fn();
    const filter = {
        yourArticles: true,
        text: ''
    }
    const wrapper = shallow(<ArticleListFilter filter={filter} setYourArticlesFilter={setYourArticlesFilter} user={{name: 'Mark'}}/>);
    wrapper.find('button').at(1).simulate('click');
    expect(setYourArticlesFilter).toHaveBeenCalled();
});

test('should call removeYourArticlesFilter and setTextFilter with empty string  when user clicks See All Articles button', () => {
    const removeYourArticlesFilter = jest.fn();
    const setTextFilter = jest.fn();

    const filter = {
        yourArticles: true,
        text: ''
    }
    const wrapper = shallow(<ArticleListFilter 
                                filter={filter} 
                                setTextFilter={setTextFilter} 
                                removeYourArticlesFilter={removeYourArticlesFilter} 
                                user={{name: 'Mark'}}
                            />);
    wrapper.find('button').at(0).simulate('click');
    expect(removeYourArticlesFilter).toHaveBeenCalled();
    expect(setTextFilter).toHaveBeenLastCalledWith('');
});



