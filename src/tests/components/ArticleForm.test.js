import React from 'react';
import { shallow } from 'enzyme';
import ArticleForm from '../../components/ArticleForm';
import articles from '../fixtures/articlesFixtures';

test('should render ArticleForm correctly with default data', () => {
    const wrapper = shallow(<ArticleForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ArticleForm correctly with article data', () => {
    const wrapper = shallow(<ArticleForm article={articles[0]} />);
    expect(wrapper).toMatchSnapshot();
}); 

test('should call onSubmit when correct data is provided', () => {
    const onSubmitSpy = jest.fn()
    const wrapper = shallow(<ArticleForm article={articles[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        title: articles[0].title,
        text: articles[0].text,
        createdAt: articles[0].createdAt
    });
});

test('should print error when when  form is submitted with incorrect data', () => {
    const wrapper = shallow(<ArticleForm />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('Your title and text must contain at least 3 characters');
});

test('should change title on input onChange', () => {
    const value = 'Testing '
    const wrapper = shallow(<ArticleForm />);
    wrapper.find('input').at(0).simulate('change',{
        target: { value }
    });
    expect(wrapper.state('title')).toBe(value);
});

test('should change text on textarea onChange', () => {
    const value = 'Some text for testing';
    const wrapper = shallow(<ArticleForm />);
    wrapper.find('textarea').simulate('change',{
        target: { value }
    });
    expect(wrapper.state('text')).toBe(value);
});