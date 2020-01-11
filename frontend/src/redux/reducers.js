import {USER_LOG_IN,
        PARKING_ADDED,
        PARKING_DELETED,
        FETCH_PARKINGS_ERROR,
        FETCH_PARKINGS_PROPERLY,
        FETCH_PARKINGS_LAUNCH } from "./constants";

export const initialState = {
  parkings:[],
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
    default:
      return state;
  }
};

export default appReducer;
