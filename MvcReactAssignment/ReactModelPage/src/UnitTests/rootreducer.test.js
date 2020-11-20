
import RootReducer from '../reducer/RootReducer';

const initState = {
    locationList: ['Mumbai', 'Pune', 'Navi Mumbai', 'Alwar', 'Goa', 'Chandigarh'],
    selectedLocation : 'Alwar'
}

const tempState = {
    locationList: ['Mumbai', 'Pune', 'Navi Mumbai', 'Alwar', 'Goa', 'Chandigarh'],
    selectedLocation : 'Pune'
}
describe('Root Reducer', () => {

    it('Should return default state', () => {
        const newState = RootReducer(undefined, {});
        expect(newState).toEqual(initState);
    });

    it('Should return default state if receiving type doesnt match', () => {
        const newState = RootReducer(undefined, {
            type: "GET_CITY",
            selectedLocation: "Pune"
        });
        expect(newState).toEqual(initState);
    });

    it('Should return new state if receiving type', () => {

        const newState = RootReducer(undefined, {
            type: "UPDATE_CITY",
            selectedLocation: "Pune"
        });
        expect(newState).toEqual(tempState);

    });

});