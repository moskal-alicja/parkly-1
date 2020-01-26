import { 
    USER_LOG_IN,
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
    RESERVATIONS_MODIFIED, } from "./constants";

export const initialState = {
  parkings:[],
  reservations:[],
  user: undefined,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOG_IN: {
      const user = action.payload;
      return { ...state, user};
    }

    case PARKING_ADDED:{

      const parking =action.payload
      const updatedParkings=[...state.parkings,parking]
      return {...state, parkings:updatedParkings}
    }
    case PARKING_DELETED:{

      const parking =action.payload
      const updatedParkings=[...state.parkings]
      updatedParkings.splice( updatedParkings.indexOf(parking), 1 );
      return {...state, parkings:updatedParkings}
    }

    case PARKING_EDITED:{

      const parking =action.payload
      
      const updatedParkings=state.parkings.map(p =>{
        if(p.id!==parking.id)
          return p
        else
          return parking;
      } );

      return {...state, parkings:updatedParkings}
    }

    case PARKINGS_MODIFIED: {
      const newParkings=action.payload
      return { ...state, parkings:newParkings  };
    }

    case FETCH_PARKINGS_LAUNCH: {
      return { ...state, loaded: false };
    }

    case FETCH_PARKINGS_PROPERLY: {
      const parkings = action.payload;
      return { ...state, parkings, loaded: true };
    }

    case FETCH_PARKINGS_ERROR: {
      const error = action.payload;
      return { ...state, error, loaded: true };
    }

    case FETCH_RESERVATIONS_LAUNCH: {
      return { ...state, loaded: false };
    }

    case FETCH_RESERVATIONS_PROPERLY: {
      const reservations = action.payload;
      return { ...state, reservations, loaded: true };
    }

    case FETCH_RESERVATIONS_ERROR: {
      const error = action.payload;
      return { ...state, error, loaded: true };
    }

    case RESERVATIONS_MODIFIED: {
      const newReservations=action.payload
      return { ...state, reservations:newReservations  };
    }
    default:
      return state;
  }
};

export default appReducer;
