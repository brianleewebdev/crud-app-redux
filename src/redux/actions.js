
import { ADD_APPLICATION, DELETE_APPLICATION, UPDATE_APPLICATION } from './constants/action-types';

export const addApplication = (content) => ({
    type: ADD_APPLICATION,
    content
})

export const deleteApplication = (payload) => ({
    type: DELETE_APPLICATION,
    payload
})

export const updateApplication = (content) => ({
    type: UPDATE_APPLICATION,
    content
})