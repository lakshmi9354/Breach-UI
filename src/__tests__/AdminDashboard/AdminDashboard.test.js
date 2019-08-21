import React, { Component } from 'react';
import { shallow , mount} from 'enzyme';
import AdminDashboard from '../../Components/AdminDashboard/AdminDashboard';



let wrapper;
beforeEach(()=>{

    wrapper=shallow(<AdminDashboard location={{state:{data:'1234'}}}/>);
});

describe('It should render dashboard component', () => {

    it('should render admin dashboard', () => {
        expect(wrapper).toMatchSnapshot();
    })
    

})


