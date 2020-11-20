export function updateCityNameAction(city) {
    return {
        type: "UPDATE_CITY",
        selectedLocation: city
    };
}

export function mapStateToProps(state) {
    return {
        ...state,
        selectedLocation: state.selectedLocation
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        changeCityName: function (selectedLocation) {
            dispatch(updateCityNameAction(selectedLocation));
        }
    };
}



