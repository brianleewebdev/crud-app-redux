import {ADD_APPLICATION, DELETE_APPLICATION} from './constants/action-types';

const initialState = {
    applications: []
}

const rootReducer = (state = initialState, action) => {
    console.log(action)
    console.log(state)
    switch(action.type) {
        case ADD_APPLICATION:
            return {
                ...state,
                applications: [...state.applications, action.payload]
            }
        case DELETE_APPLICATION:
            return {
                applications: state.applications.filter(app => app.id !== action.payload)
            }
        default:
            return state
    }
    
}

export default rootReducer;