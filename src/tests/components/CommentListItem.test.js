import React from 'react';
import { shallow } from 'enzyme';
import CommentListItem from '../../components/CommentListItem';
import articles from '../fixtures/articlesFixtures';

test('should render CommentListItem correctly', () => {
    const wrapper = shallow(<CommentListItem {...articles[0].comments[0]} />);
    expect(wrapper).toMatchSnapshot();
});

test('should handle delete button onClick', () => {
    const onClickDeleteComment = jest.fn();
    const wrapper = shallow(<CommentListItem 
                                onClickDeleteComment={onClickDeleteComment} 
                                {...articles[0].comments[0]}
                            />
                        );
    wrapper.find('button').simulate('click');
    expect(onClickDeleteComment).toHaveBeenCalledWith(articles[0].comments[0].id);

});