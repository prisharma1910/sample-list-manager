
import {
    GET_LIST_DATA_SUCCESS,
    UPDATE_LIST_SEQUENCE_SUCCESS,
    UPDATE_LIST_SUCCESS,
    UPDATE_ITEM_SUCCESS,
    DELETE_ITEM_SUCCESS,
} from './Dashboard.actionTypes';
//import { listData, items, listOrder } from '../initial-data';

function dashboardData(state, action) {
    //can handle actions via switch-case for different scenarios
    const { type, data } = action;
    switch (type) {
        case GET_LIST_DATA_SUCCESS:
        case UPDATE_LIST_SEQUENCE_SUCCESS:
        case UPDATE_LIST_SUCCESS:
        case UPDATE_ITEM_SUCCESS:
        case DELETE_ITEM_SUCCESS:
            return data;
        default:
            return state;
    }
}

export default function DashboardReducer(state = {}, action) {
    return {
        dashboardData: dashboardData(state, action)
    }
}