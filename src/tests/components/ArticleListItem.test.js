import React from 'react';
import { shallow } from 'enzyme';
import ArticleListItem from '../../components/ArticleListItem';
import articles from '../fixtures/articlesFixtures';

test('should render ArticleListItem correctly', () => {
    const wrapper = shallow(<ArticleListItem {...articles[0]} />);
    expect(wrapper).toMatchSnapshot();
});