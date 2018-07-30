import React from 'react';
import { shallow } from 'enzyme';
import { AddArticle } from '../../components/AddArticle';
import articles from '../fixtures/articlesFixtures';

let addArticle, history, wrapper;

beforeEach(() => {
    addArticle = jest.fn();
    history = { push: jest.fn()};
    wrapper = shallow(<AddArticle addArticle={addArticle} history={history}/>)
});

test('should render AddArticle correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit call', () => {
    wrapper.find('ArticleForm').prop('onSubmit')(articles[0]);
    expect(addArticle).toHaveBeenLastCalledWith(articles[0]);
    expect(history.push).toHaveBeenLastCalledWith('/');
});