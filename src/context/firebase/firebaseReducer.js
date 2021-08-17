import {ADD_NOTE} from '../types'

const handlers = {
    [ADD_NOTE]: (state, {payload}) => ({
        ...state,
        notes: [...state.notes, payload]
    }),
    DEFAULT: state => state
}

export const FirebaseReducer = (state, action) => {
    const handle = handlers[action.type || handlers.DEFAULT]
    return handle;
}
