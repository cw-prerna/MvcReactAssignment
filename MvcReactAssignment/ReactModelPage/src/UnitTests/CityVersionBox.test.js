import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr, checkProps } from '../../Utils';
import CityVersionBox from '../component/CityVersionBox';


const setUp = (props = {}) => {
    const component = shallow(<CityVersionBox {...props} />);
    return component;
};



describe('CityVersionBox Component', () => {

    describe('Checking PropTypes', () => {

        it('Should NOT throw a warning', () => {
            const expectedProps = {
                selectedLocation: "Goa",
                setCityVersion: () => {

                },
                selectedVersion: {
                    CompanyId: 1,
                    CompanyName: 'BMW',
                    ModelId: 1,
                    ModelName: 'X1',
                    Rating: 5,
                    VersionId: 1,
                    ImageUrl: "https://imgd.aeplcdn.com/664x374/n/cw/ec/45242/bmw-x1-facelift-right-front-three-quarter2.jpeg?q=85",
                    VersionName: 'sDrive 20i SportX',
                    Price: 43.12
                }
            };
            const propsError = checkProps(CityVersionBox, expectedProps);
            expect(propsError).toBeUndefined();
        });

    });


    describe('Have NO props', () => {

        let wrapper;
        beforeEach(() => {
            wrapper = setUp();
        });

        it('Should not render', () => {
            const component = findByTestAtrr(wrapper, 'popUpContainer');
            expect(component.length).toBe(0);
        });


    });


 /*   describe('Have props', () => {

     
        let wrapper;
        let mockFunc;
        beforeEach(() => {
            mockFunc = jest.fn();
            const props = {
                selectedLocation: "Goa",
                setCityVersion: mockFunc,
                selectedVersion: {
                    CompanyId: 1,
                    CompanyName: 'BMW',
                    ModelId: 1,
                    ModelName: 'X1',
                    Rating: 5,
                    VersionId: 1,
                    ImageUrl: "https://imgd.aeplcdn.com/664x374/n/cw/ec/45242/bmw-x1-facelift-right-front-three-quarter2.jpeg?q=85",
                    VersionName: 'sDrive 20i SportX',
                    Price: 43.12
                }
            };
            wrapper = shallow(<CityVersionBox {...props} />);
        });

        it('Should render without errors', () => {
            const component = findByTestAtrr(wrapper, 'popUpContainer');
            expect(component.length).toBe(1);
        });

    });

*/


});





