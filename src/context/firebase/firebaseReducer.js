import {ADD_NOTE, GET_NOTES} from '../types'

const handlers = {
    [ADD_NOTE]: (state, {payload}) => ({
        ...state,
        notes: [...state.notes, payload]
    }),
    [GET_NOTES]: (state, {payload}) => ({
        ...state,
        notes: payload,
    }),
    DEFAULT: state => state
}

export const FirebaseReducer = (state, action) => {
    const handle = handlers[action.type || handlers.DEFAULT]
    
    return handle(state, action);
}
