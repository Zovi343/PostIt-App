import React from 'react';
import { shallow } from 'enzyme';
import { EditArticle } from '../../components/EditArticle';
import articles from '../fixtures/articlesFixtures';

let wrapper, editArticle, removeArticle, history;

beforeEach(() => {
    editArticle = jest.fn();
    removeArticle = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<EditArticle 
                                article={articles[0]}
                                editArticle={editArticle}
                                history={history}
                                removeArticle={removeArticle}
                            />
                        );
});

test('should render EditArticle correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle editArticle', () => {
    wrapper.find('ArticleForm').prop('onSubmit')(articles[0]);
    expect(editArticle).toHaveBeenLastCalledWith(articles[0].id, articles[0]);
    expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle removeArticle', () => {
    wrapper.find('button').simulate('click');
    expect(removeArticle).toHaveBeenLastCalledWith(articles[0].id);
    expect(history.push).toHaveBeenLastCalledWith('/');
});