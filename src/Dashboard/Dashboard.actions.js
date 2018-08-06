import {
    GET_LIST_DATA,
    UPDATE_LIST_SEQUENCE,
    UPDATE_LIST,
    UPDATE_ITEM,
    DELETE_ITEM,
    GET_LIST_DATA_SUCCESS
} from './Dashboard.actionTypes';

export function getInitialData(){
    return {
        type: GET_LIST_DATA
    }
}

export function updateListSequence(newSequence){
    return {
        type: UPDATE_LIST_SEQUENCE,
        newSequence
    }
}

export function updateList(listId, updatedData){
    return {
        type: UPDATE_LIST,
        listId,
        updatedData
    }
}

export function updateItem(itemId, updatedData){
    return {
        type: UPDATE_ITEM,
        itemId,
        updatedData
    }
}

export function deleteItem(itemId){
    return {
        type: DELETE_ITEM,
        itemId
    }
}

export function getListDataSucess(data){
    return {
        type: GET_LIST_DATA_SUCCESS,
        data
    }
}