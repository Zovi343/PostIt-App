import React from 'react';
import { shallow } from 'enzyme';
import CommentArticle from '../../components/CommentArticle';

test('should render CommentArticle with default data', () => {
    const wrapper = shallow(<CommentArticle likeOrCommentAllowed={false} />);
    expect(wrapper).toMatchSnapshot();
});

test('should print error when Submiting with invalid data', () => {
    const wrapper = shallow(<CommentArticle likeOrCommentAllowed={false} />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('Yout comment must contain at least 3 characters.')
});

test('should call onSubmit when Submiting with correct data', () => {
    const onSubmitSpy = jest.fn();
    const value = 'test';
    const wrapper = shallow(<CommentArticle likeOrCommentAllowed={false} onSubmit={onSubmitSpy}/>);
    wrapper.find('textarea').simulate('change', {
        target: { value }
    });
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        comment: value,
        createdAt: '1.1.1970'
    })
});

test('should change comment value when changing textarea', () => {
    const value = 'test';
    const wrapper = shallow(<CommentArticle likeOrCommentAllowed={false} />);
    wrapper.find('textarea').simulate('change', {
        target: { value }
    });
    expect(wrapper.state('comment')).toBe(value);
});

test('comment button should be disabled if likeOrCommentAllowed props is false ', () => {
    const wrapper = shallow(<CommentArticle likeOrCommentAllowed={true} />);
    expect(wrapper.find('input').props().disabled).toBe(true);
});




