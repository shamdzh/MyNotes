import {ADD_NOTE, GET_NOTES, GET_CURRENT_NOTE} from '../types'

const handlers = {
    [ADD_NOTE]: (state, {payload}) => ({
        ...state,
        notes: [...state.notes, payload]
    }),
    [GET_NOTES]: (state, {payload}) => ({
        ...state,
        notes: payload,
    }),
    [GET_CURRENT_NOTE]: (state, {payload}) => ({
        ...state,
        currentNote: payload,
    }),
    DEFAULT: state => state
}

export const FirebaseReducer = (state, action) => {
    const handle = handlers[action.type || handlers.DEFAULT]
    
    return handle(state, action);
}
