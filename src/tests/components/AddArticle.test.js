import React from 'react';
import { shallow } from 'enzyme';
import { AddArticle } from '../../components/AddArticle';
import articles from '../fixtures/articlesFixtures';

let startAddArticle, history, wrapper;

beforeEach(() => {
    startAddArticle = jest.fn();
    history = { push: jest.fn()};
    wrapper = shallow(<AddArticle startAddArticle={startAddArticle} history={history}/>)
});

test('should render AddArticle correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit call', () => {
    wrapper.find('ArticleForm').prop('onSubmit')(articles[0]);
    expect(startAddArticle).toHaveBeenLastCalledWith(articles[0]);
    expect(history.push).toHaveBeenLastCalledWith('/');
});