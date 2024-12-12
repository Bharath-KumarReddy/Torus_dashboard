import { Dispatch } from 'redux';
import { ActionType } from '../ActionTypes/Actiontype';
import axios from 'axios';
import { ThunkAction } from 'redux-thunk';


export const listUsers = (): ThunkAction<void, any, unknown, any> => async (dispatch: Dispatch) => {
    try {
        const data = await axios.get('https://retoolapi.dev/ryFIGz/data');
        dispatch({
            type: ActionType.ALLUSER,
            payload: data.data,
        });
    } catch (error) {
        console.error(error);
    }
};

export const detailUser = (id: number): ThunkAction<void, any, unknown, any> => async (dispatch: Dispatch) => {
    try {
        const data = await axios.get(`https://retoolapi.dev/ryFIGz/data/${id}`);
        dispatch({
            type: ActionType.DETAILUSER,
            payload: data.data,
        });
    } catch (error) {
        console.error(error);
    }
};
