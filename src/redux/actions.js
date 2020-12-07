
import { ADD_APPLICATION, DELETE_APPLICATION } from './constants/action-types';

let nextApplicationId = 0
export const addApplication = (content) => ({
    type: ADD_APPLICATION,
    payload: {
        id: ++nextApplicationId,
        content
    }
})

export const deleteApplication = (payload) => ({
    type: DELETE_APPLICATION,
    payload
})