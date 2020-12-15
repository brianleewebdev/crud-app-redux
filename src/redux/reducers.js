import { ADD_APPLICATION, DELETE_APPLICATION, UPDATE_APPLICATION } from './constants/action-types';

const initialState = {
    applications: []
}

const rootReducer = (state = initialState, action) => {
    //console.log(action)
    //console.log(state)
    switch (action.type) {
        case ADD_APPLICATION:
            let today = new Date()
            let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate()
            const newApplication = {
                entry: action.content,
                timestamp: date,
                id: state.applications.id ? Math.floor(Math.random() * Math.floor(100)) : Math.floor(Math.random() * Math.floor(100))
            }
            return {
                applications: state.applications.concat(newApplication)
            }
        case DELETE_APPLICATION:
            return {
                applications: state.applications.filter(app => app.id !== action.payload)
            }
        case UPDATE_APPLICATION:
            return {
                applications: state.applications.map(app => app.id === action.content.currentId ?
                    {
                        ...app,
                        entry: {
                            ...app.entry,
                            first_name: action.content.first_name,
                            last_name: action.content.last_name,
                            address: action.content.address,
                            city: action.content.city,
                            state: action.content.state,
                            zip: action.content.zip,
                            phone: action.content.phone,
                            email: action.content.email,
                            dob_day: action.content.dob_day,
                            dob_month: action.content.dob_month,
                            dob_year: action.content.dob_year,
                            social_security: action.content.social_security,
                            gross_annual_income: action.content.gross_annual_income
                        }
                    }
                    : app
                )
            }
        default:
            return state
    }

}

export default rootReducer;