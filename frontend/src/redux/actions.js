import { USER_LOG_IN,
        PARKING_ADDED,
        PARKING_DELETED,
        PARKING_EDITED,
        FETCH_PARKINGS_ERROR,
        FETCH_PARKINGS_PROPERLY,
        FETCH_PARKINGS_LAUNCH,
        FETCH_RESERVATIONS_LAUNCH,
        FETCH_RESERVATIONS_PROPERLY,
        FETCH_RESERVATIONS_ERROR } from "./constants";

export const userLogIn = user => {
  return {
    type: USER_LOG_IN,
    payload: user
  };
};

export const parkingAdded = parking => {
  return {
    type: PARKING_ADDED,
    payload: parking  
  };
};

export const parkingDeleted = parking => {
  return {
    type: PARKING_DELETED,
    payload: parking  
  };
};

export const parkingEdited = parking =>{
  return {
    type: PARKING_EDITED,
    payload: parking  
  };
};

export const fetchParkingsLaunch = () => {
  return {
    type: FETCH_PARKINGS_LAUNCH
  };
};

export const fetchParkingsProperly = parkings => {
  return {
    type: FETCH_PARKINGS_PROPERLY,
    payload: parkings
  };
};

export const fetchParkingsError = error => {
  
  return {
    type: FETCH_PARKINGS_ERROR,
    payload: error
  };
};

export const fetchReservationsLaunch = () => {
  return {
    type: FETCH_RESERVATIONS_LAUNCH
  };
};

export const fetchReservationsProperly = parkings => {
  return {
    type: FETCH_RESERVATIONS_PROPERLY,
    payload: parkings
  };
};

export const fetchReservationsError = error => {
  return {
    type: FETCH_RESERVATIONS_ERROR,
    payload: error
  };
};

export const fetchParkings = () => {
  return dispatch => {
    dispatch(fetchParkingsLaunch());
    fetch("http://localhost:3004/parkings")
      .then(res => res.json())
      .then(parkings => {
        dispatch(fetchParkingsProperly(parkings));
      })
      .catch(error => {
        dispatch(fetchParkingsError(error));
      });
  };
};
  
export const fetchReservations = () => {
    return dispatch => {
      dispatch(fetchReservationsLaunch());
      fetch("http://localhost:3004/reservations")
        .then(res => res.json())
        .then(reservations => {
          dispatch(fetchReservationsProperly(reservations));
        })
        .catch(error => {
          dispatch(fetchReservationsError(error));
        });
    };
};