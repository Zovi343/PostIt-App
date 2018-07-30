import React from 'react';
import { shallow } from 'enzyme';
import { ArticleList } from '../../components/ArticleList';
import articles from '../fixtures/articlesFixtures';

test('should render ArticleList correctly', () => {
    const wrapper = shallow(<ArticleList articles={articles} />);
    expect(wrapper).toMatchSnapshot();
});