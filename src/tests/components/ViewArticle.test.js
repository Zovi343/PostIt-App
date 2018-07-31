import React from 'react';
import { shallow } from 'enzyme';
import { ViewArticle } from '../../components/ViewArticle';
import articles from '../fixtures/articlesFixtures';

let wrapper, addLike, commentArticle, removeComment;

beforeEach(() => {
    addLike = jest.fn();
    commentArticle = jest.fn();
    removeComment = jest.fn();
    wrapper = shallow(<ViewArticle 
                        article={articles[0]} 
                        addLike={addLike}
                        commentArticle={commentArticle}
                        removeComment={removeComment}
                    />
                );
});

test('should render ViewArticle correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ViewArticle with error message ', () => {
    wrapper = shallow( <ViewArticle />);
    expect(wrapper).toMatchSnapshot();
});

test('should handle commentArticle onSubmit', () => {
    wrapper.find('CommentArticle').simulate('submit', articles[0].comments[0]);
    expect(commentArticle).toHaveBeenLastCalledWith( articles[0].id ,articles[0].comments[0]);
});

test('should handle removeComment', () => {
    wrapper.find('CommentList').prop('onClickDeleteComment')(articles[0].comments[0].id);
    expect(removeComment).toHaveBeenLastCalledWith(articles[0].id, articles[0].comments[0].id);
});

test('should handle addLike on clicking heart button', () => {
    wrapper.find('button').simulate('click');
    expect(addLike).toHaveBeenLastCalledWith(articles[0].id, expect.any(String))
});