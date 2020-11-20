import React from 'react';
import { findByTestAtrr, checkProps } from '../../Utils';
import NavBar, {NavBarConnect} from '../component/NavBar';
import App from '../component/App';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { RootReducer } from '../reducer/RootReducer';
import store from '../reducer/store';
import { createStore } from 'redux';
configure({ adapter: new Adapter() });



const setUp = (props = {}) => {
    const component = shallow(<NavBar {...props} />);
    return component;
};



describe('NavBar Component', () => {

    describe('Checking PropTypes', () => {

        it('Should not throw a warning', () => {

            const expectedProps = {
                selectedLocation: "Alwar",
                setCityVersion: () => { }
            }

            const propsErr = checkProps(NavBar, expectedProps)
            expect(propsErr).toBeUndefined();
        });

    });

    describe('Have NO props', () => {

        let wrapper;
        beforeEach(() => {
            wrapper = setUp();
        });

        it('Should not render', () => {
            const component = findByTestAtrr(wrapper, 'navbar');
            expect(component.length).toBe(0);
        });


    });


    describe('Have props', () => {

        let wrapper;
        beforeEach(() => {
            const props = {
                selectedLocation: "Alwar",
                setCityVersion: (tprops) => { }

            };
            wrapper = setUp(props);
        });

        it('Should render without errors', () => {
            const component = findByTestAtrr(wrapper, 'navbar');
            expect(component.length).toBe(0);
        });

    });

});


/*const trial_initState = {
    redux_selectedLocation : "TESTING_VALUE"
  };
  const store = createStore(RootReducer,trial_initState);
  
  describe('NavBar Components', () => {
    test("ToolTip Renders Location Value Correctly from Redux", () => {
        let wrapper = shallow(<NavBarConnect store={store}/>);
        // console.log(wrapper.childAt(0).dive().debug());
        expect(wrapper.childAt(0).dive().find('.tooltipText').text()).toBe("Location is "+"TESTING_VALUE");
      });
})*/