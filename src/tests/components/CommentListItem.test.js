import React from 'react';
import { shallow } from 'enzyme';
import CommentListItem from '../../components/CommentListItem';
import articles from '../fixtures/articlesFixtures';
import user from '../fixtures/usersFixtures';

test('should render CommentListItem correctly', () => {
    const wrapper = shallow(<CommentListItem {...articles[0].comments[0]} />);
    expect(wrapper).toMatchSnapshot();
});

test('button should not exist if creatorId and userId do not match!', () => {
    const someId = 'kdmwqlqlkmd'
    const onClickDeleteComment = jest.fn();
    const wrapper = shallow(<CommentListItem 
                                onClickDeleteComment={onClickDeleteComment} 
                                _creatorId ={someId}
                                userId ={user.id}
                                {...articles[0].comments[0]}
                            />
                        );
    expect(wrapper).toMatchSnapshot();
});