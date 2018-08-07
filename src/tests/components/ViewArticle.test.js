import React from 'react';
import { shallow } from 'enzyme';
import { ViewArticle } from '../../components/ViewArticle';
import articles from '../fixtures/articlesFixtures';
import user from '../fixtures/usersFixtures';

let wrapper, startAddLike, startRemoveLike, startCommentArticle, startRemoveComment;

beforeEach(() => {
    startAddLike = jest.fn();
    startRemoveLike = jest.fn();
    startCommentArticle = jest.fn();
    startRemoveComment = jest.fn();
    wrapper = shallow(<ViewArticle 
                        article={articles[0]} 
                        startAddLike={startAddLike}
                        startRemoveLike={startRemoveLike}
                        startCommentArticle={startCommentArticle}
                        startRemoveComment={startRemoveComment}
                        userId={user.id}
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
    wrapper = shallow(<ViewArticle 
        article={articles[1]} 
        startAddLike={startAddLike}
        startRemoveLike={startRemoveLike}
        startCommentArticle={startCommentArticle}
        startRemoveComment={startRemoveComment}
        userId={user.id}
        />
    );
    wrapper.find('button').at(1).simulate('click');
    expect(startAddLike).toHaveBeenLastCalledWith(articles[1]._id, user.id)
});

test('should handle startRemoveLike on clicking heart button', () => {
    wrapper.find('button').at(1).simulate('click');
    expect(startRemoveLike).toHaveBeenLastCalledWith(articles[0]._id, user.id)
});


test('editing should be disabled if userId does not match  article._creatorID', () => {
    wrapper = shallow(<ViewArticle 
        article={articles[0]} 
        startAddLike={startAddLike}
        startRemoveLike={startRemoveLike}
        startCommentArticle={startCommentArticle}
        startRemoveComment={startRemoveComment}
        userId={'999'}
        />
    );
    expect(wrapper.find('button').at(0).props().disabled).toBe(true);
});



test('liking should be disabled if user does not exists', () => {
    wrapper = shallow(<ViewArticle 
        article={articles[1]} 
        startAddLike={startAddLike}
        startRemoveLike={startRemoveLike}
        startCommentArticle={startCommentArticle}
        startRemoveComment={startRemoveComment}
        userId={undefined}
        />
    );
    expect(wrapper.find('button').at(0).props().disabled).toBe(true);
});
