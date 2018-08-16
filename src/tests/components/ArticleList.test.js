import React from 'react';
import { shallow } from 'enzyme';
import { ArticleList } from '../../components/ArticleList';
import articles from '../fixtures/articlesFixtures';
import user from '../fixtures/usersFixtures';

test('should render ArticleList correctly', () => {
    const wrapper = shallow(<ArticleList articles={articles} user={user} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render message if user have filter to see only his articles and he have not created any articles', () => {
    const wrapper = shallow(<ArticleList articles={[]} filter={true} user={user}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render error message if server is down', () => {
    const wrapper = shallow(<ArticleList articles={[]} filter={true} networkError={true}/>);
    expect(wrapper).toMatchSnapshot();
});