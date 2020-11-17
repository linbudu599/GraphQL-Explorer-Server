import React from 'react';
import { mount } from 'enzyme';
import UserItem, { IUserItem } from '../../src/components/UsertItem';

describe('UserItem Test', () => {
  it('should render props correctly', () => {
    const data: IUserItem = {
      uid: '001',
      name: '穹心',
      age: 18,
      job: 'fe',
      isFool: false,
      registryDate: new Date(),
      lastUpdateDate: new Date(),
    };
    const Wrapper = mount(<UserItem user={data} />);

    expect(Wrapper.find('p').length).toBe(3);
    expect(Wrapper.find('p').at(0).text()).toContain(data.uid);
    expect(Wrapper.find('p').at(1).text()).toContain(data.name);
  });
});
