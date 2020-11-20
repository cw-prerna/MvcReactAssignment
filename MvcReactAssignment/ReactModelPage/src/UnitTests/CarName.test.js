import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr, checkProps } from '../../Utils';
import CarName from '../component/CarName';
import Rating from '../component/Rating'


const setUp = (props = {}) => {
    const component = shallow(<CarName {...props} />);
    return component;
};



describe('CarName Component', () => {

    describe('Checking PropTypes', () => {

        it('Should not throw a warning', () => {

            const expectedProps = {
                model: {
                    ModelId: 1,
                    ModelName: 'X1',
                    Rating: 5,
                    ImageUrl: "https://imgd.aeplcdn.com/664x374/n/cw/ec/45242/bmw-x1-facelift-right-front-three-quarter2.jpeg?q=85",

                }
            };
            const propsErr = checkProps(CarName, expectedProps)
            expect(propsErr).toBeUndefined();

        });

    });

    describe('Have NO props', () => {

        let wrapper;
        beforeEach(() => {
            wrapper = setUp();
        });

        it('Should not render', () => {
            const component = findByTestAtrr(wrapper, 'ratingsandreviews');
            expect(component.length).toBe(0);
        });


    });




    describe('Have props', () => {

        let wrapper;
        beforeEach(() => {
            const props = {
                model: {
                    ModelId: 1,
                    ModelName: 'X1',
                    Rating: 5,
                    ImageUrl: "https://imgd.aeplcdn.com/664x374/n/cw/ec/45242/bmw-x1-facelift-right-front-three-quarter2.jpeg?q=85",

                }

            };
            wrapper = setUp(props);
        });

        it('Should render without errors', () => {
            const component = findByTestAtrr(wrapper, 'ratingsandreviews');
            expect(component.length).toBe(1);
        });
        it('Model Name should render Correctly', () => {
            expect(wrapper.find(".RatingsAndReviews").childAt(0).find(".Car-Name").text()).toBeDefined();
        });
        it('Rating should render Properly', () => {
            expect(wrapper.find(<Rating />)).toBeTruthy();
        });

    });


});



