import React from 'react';
import { shallow } from 'enzyme';
import CommentList from '../../components/CommentList';
import articles from '../fixtures/articlesFixtures';

test('should render CommentList correctly', () => {
    const onClickDeleteComment = jest.fn();
    const wrapper = shallow(
                            <CommentList 
                                onClickDeleteComment={onClickDeleteComment} 
                                comments={articles[0].comments} 
                            />
                            );
    expect(wrapper).toMatchSnapshot();
});

