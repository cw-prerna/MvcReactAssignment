import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr, checkProps } from '../../Utils';
import PriceDetails from '../component/PriceDetails';


const setUp = (props = {}) => {
    const component = shallow(<PriceDetails {...props} />);
    return component;
};



describe('PriceDetails Component', () => {

    describe('Checking PropTypes', () => {

        it('Should not throw a warning', () => {

            const expectedProps = {
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
            const propsErr = checkProps(PriceDetails, expectedProps)
            expect(propsErr).toBeUndefined();

        });

    });

    describe('Have NO props', () => {

        let wrapper;
        beforeEach(() => {
            wrapper = setUp();
        });

        it('Should not render', () => {
            const component = findByTestAtrr(wrapper, 'priceDetails');
            expect(component.length).toBe(0);
        });


    });




    describe('Have props', () => {

        let wrapper;
        beforeEach(() => {
            const props = {
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
            wrapper = setUp(props);
        });

        it('Price Value should render without errors', () => {
            const component = findByTestAtrr(wrapper, 'priceDetails');
            expect(component.length).toBe(1);
        });
    });


});