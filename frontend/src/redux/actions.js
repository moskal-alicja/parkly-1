import { USER_LOG_IN,
        PARKING_ADDED,
        PARKING_DELETED,
        PARKING_EDITED,
        PARKINGS_MODIFIED,
        FETCH_PARKINGS_ERROR,
        FETCH_PARKINGS_PROPERLY,
        FETCH_PARKINGS_LAUNCH,
        FETCH_RESERVATIONS_LAUNCH,
        FETCH_RESERVATIONS_PROPERLY,
        FETCH_RESERVATIONS_ERROR,
        RESERVATIONS_MODIFIED } from "./constants";

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

export const parkingsModified = parkings =>{
  return {
    type: PARKINGS_MODIFIED,
    payload: parkings  
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

export const fetchReservationsProperly = reservations => {
  return {
    type: FETCH_RESERVATIONS_PROPERLY,
    payload: reservations
  };
};

export const fetchReservationsError = error => {
  return {
    type: FETCH_RESERVATIONS_ERROR,
    payload: error
  };
};

export const reservationsModified = reservations =>{
  return {
    type: RESERVATIONS_MODIFIED,
    payload: reservations  
  };
};

export const fetchParkings = (id,token) => {
  return dispatch => {
    dispatch(fetchParkingsLaunch());
    fetch("http://localhost:8080/parkings/my-parkings/"+id,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'user_name':'parkly',
        'user_token':token
      },
    })
      .then(res => res.json())
      .then(parkings => {
        dispatch(fetchParkingsProperly(parkings));
      })
      .catch(error => {
        dispatch(fetchParkingsError(error));
      });
  };
};
  
export const fetchReservations = (id,token,flag) => {
    let url=''
    if(flag==='parking')
    {
      url='http://localhost:8080/reservations/parking/'+id
    }

    else
    {
      url='http://localhost:8080/reservations/filter/'+id
    }
    return dispatch => {
      dispatch(fetchReservationsLaunch());
      fetch(url,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'user_name':'parkly',
          'user_token':token
        },
      })
        .then(res => res.json())
        .then(reservations => {
          dispatch(fetchReservationsProperly(reservations));
        })
        .catch(error => {
          dispatch(fetchReservationsError(error));
        });
    };
};