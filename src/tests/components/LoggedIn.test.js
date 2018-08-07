import React from 'react';
import { shallow } from 'enzyme';
import LoggedIn from '../../components/LoggedIn';
import user from '../fixtures/usersFixtures';

test('should redner LoggedIn correctly', () => {
    // I am not testin when filter is false, but I don't think thats necessary
    const wrapper = shallow(<LoggedIn 
                                name={user.name}
                                filter={true}
                                handleFilter={jest.fn()}
                                onLogout={jest.fn()}   
                            />)
    expect(wrapper).toMatchSnapshot();
});