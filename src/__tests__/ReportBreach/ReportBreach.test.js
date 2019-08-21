import React, { Component } from 'react';
import { shallow , mount} from 'enzyme';

import ReportBreach from '../../Components/ReportBreach/ReportBreach';

const wrapper = shallow(<ReportBreach />)
describe('It should render login component', () => {

    it('should render report breach', () => {
        expect(wrapper).toMatchSnapshot();
    })
})

describe('When submit button is clicked it should call handle submit', () => {
    
    it('should handle submit',()=>{
        const comp = shallow(<ReportBreach />);
       // const fakeEvent = { preventDefault: () => console.log('preventDefault') };
          const spy = jest.spyOn(comp.instance(), 'handleSubmit');
          comp.instance().forceUpdate();
          comp.find('#submit').simulate('click');
          expect(spy).toHaveBeenCalled();

    })

});
