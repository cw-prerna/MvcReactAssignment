import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import { findByTestAtrr, checkProps } from '../../Utils';
import CommonPopUp, {CommonPopUpConnect} from '../component/CommonPopUp';
import App from '../component/App'
import Adapter from 'enzyme-adapter-react-16';
import { RootReducer } from '../reducer/RootReducer';
import { createStore } from 'redux';
configure({ adapter: new Adapter() });


const setUp = (props = {}) => {
    const component = shallow(<CommonPopUp {...props} />);
    return component;
};



describe('CommonPopUp Component', () => {

    describe('Checking PropTypes', () => {

        it('Should not throw a warning', () => {

            const expectedProps = {
                popUpType: "Version",
                popupList: {
                    CompanyId: 1,
                    CompanyName: 'BMW',
                    ModelId: 1,
                    ModelName: 'X1',
                    Rating: 5,
                    VersionId: 1,
                    ImageUrl: "https://imgd.aeplcdn.com/664x374/n/cw/ec/45242/bmw-x1-facelift-right-front-three-quarter2.jpeg?q=85",
                    VersionName: 'sDrive 20i SportX',
                    Price: 43.12
                },
                setCityVersion: () => { },
                visibleItem: {
                    CompanyId: 1,
                    CompanyName: 'BMW',
                    ModelId: 1,
                    ModelName: 'X1',
                    Rating: 5,
                    VersionId: 1,
                    ImageUrl: "https://imgd.aeplcdn.com/664x374/n/cw/ec/45242/bmw-x1-facelift-right-front-three-quarter2.jpeg?q=85",
                    VersionName: 'sDrive 20i SportX',
                    Price: 43.12
                },
                popUpVisible: true
            }

            const propsErr = checkProps(CommonPopUp, expectedProps)
            expect(propsErr).toBeUndefined();
        });

    });

/*
    describe('Have NO props', () => {

        let wrapper;
        beforeEach(() => {
            wrapper = setUp();
        });

        it('Should not render', () => {
            const component = findByTestAtrr(wrapper, 'commonpopup');
            expect(component.length).toBe(0);
        });


    });
   
    describe('Have props', () => {

     
        let wrapper;

        beforeEach(() => {
            const props = {
                popUpType: "Version",
                popupList: {
                    CompanyId: 1,
                    CompanyName: 'BMW',
                    ModelId: 1,
                    ModelName: 'X1',
                    Rating: 5,
                    VersionId: 1,
                    ImageUrl: "https://imgd.aeplcdn.com/664x374/n/cw/ec/45242/bmw-x1-facelift-right-front-three-quarter2.jpeg?q=85",
                    VersionName: 'sDrive 20i SportX',
                    Price: 43.12
                },
                setCityVersion    : () => { },
                visibleItem: {
                    CompanyId: 1,
                    CompanyName: 'BMW',
                    ModelId: 1,
                    ModelName: 'X1',
                    Rating: 5,
                    VersionId: 1,
                    ImageUrl: "https://imgd.aeplcdn.com/664x374/n/cw/ec/45242/bmw-x1-facelift-right-front-three-quarter2.jpeg?q=85",
                    VersionName: 'sDrive 20i SportX',
                    Price: 43.12
                },
                popUpVisible: true
            }
            //wrapper = shallow(<CommonPopUp {...props} />);
        });

        it('Should render without errors', () => {
            const component = findByTestAtrr(wrapper, 'commonpopup');
            expect(component.length).toBe(1);
        });
        

       const props = {
        CompanyId: 1,
        CompanyName: 'BMW',
        ModelId: 1,
        ModelName: 'X1',
        Rating: 5,
        VersionId: 1,
        ImageUrl: "https://imgd.aeplcdn.com/664x374/n/cw/ec/45242/bmw-x1-facelift-right-front-three-quarter2.jpeg?q=85",
        VersionName: 'sDrive 20i SportX',
        Price: 43.12
    };
    

      // let version = {"companyId":1,"companyName":"Maruti Suzuki","modelId":10,"modelName":"Swift","rating":4,"versionId":1,"imageUrl":"https://imgd.aeplcdn.com/664x374/n/cw/ec/26742/swift-exterior-right-front-three-quarter-2.jpeg","versionName":"Vxi","price":784251,"transmission":"Manual","fuelType":"Petrol"};

       describe('PopUpDisplayBox Component', () => {
           test("Version Display Box Displays Version Name Correctly", () => {
               let wrapper = shallow(<CommonPopUpConnect selectedVersion={props} store={store}/>);
               expect(wrapper.childAt(0).dive().find('.displayVersionName').text()).toBe(props.VersionName);
           });
           test("Location Display Box Displays City Location Correctly", () => {
               let wrapper = shallow(<CommonPopUpConnect selectedVersion={props} store={store}/>);
               expect(wrapper.childAt(0).dive().find('.displayLocationName').text()).toBe("TESTING_VALUE");
           });
       })

*/

});

