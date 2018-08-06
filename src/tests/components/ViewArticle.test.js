import React from 'react';
import { shallow } from 'enzyme';
import { ViewArticle } from '../../components/ViewArticle';
import articles from '../fixtures/articlesFixtures';
import user from '../fixtures/usersFixtures';

let wrapper, startAddLike, startCommentArticle, startRemoveComment;

beforeEach(() => {
    startAddLike = jest.fn();
    startCommentArticle = jest.fn();
    startRemoveComment = jest.fn();
    wrapper = shallow(<ViewArticle 
                        article={articles[0]} 
                        startAddLike={startAddLike}
                        startCommentArticle={startCommentArticle}
                        startRemoveComment={startRemoveComment}
                        userId = {user.id}
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

test('should handle startCommentArticle onSubmit', () => {
    wrapper.find('CommentArticle').simulate('submit', articles[0].comments[0]);
    expect(startCommentArticle).toHaveBeenLastCalledWith( articles[0]._id ,articles[0].comments[0]);
});

test('should handle startRemoveComment', () => {
    wrapper.find('CommentList').prop('onClickDeleteComment')(articles[0].comments[0]._id);
    expect(startRemoveComment).toHaveBeenLastCalledWith(articles[0]._id, articles[0].comments[0]._id);
});

test('should handle startAddLike on clicking heart button', () => {
    wrapper.find('button').at(1).simulate('click');
    expect(startAddLike).toHaveBeenLastCalledWith(articles[0]._id, user.id)
});

//I will also need test for startRemoveLike