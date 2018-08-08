import React from 'react';
import { shallow } from 'enzyme';
import { ArticleList } from '../../components/ArticleList';
import articles from '../fixtures/articlesFixtures';

test('should render ArticleList correctly', () => {
    const wrapper = shallow(<ArticleList articles={articles} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render message if user have filter to see only his articles and he have not created any articles', () => {
    const wrapper = shallow(<ArticleList articles={[]} filter={true}/>);
    expect(wrapper).toMatchSnapshot();
})