import {ADD_NOTE, GET_NOTES, GET_CURRENT_NOTE, REMOVE_NOTE, EDIT_NOTE} from '../types'

const handlers = {
    [ADD_NOTE]: (state, {payload}) => ({
        ...state,
        notes: [...state.notes, payload]
    }),
    [REMOVE_NOTE]: (state, {payload}) => ({
        ...state,
        notes: state.notes.filter(note => note.id !== payload)
    }),
    [EDIT_NOTE]: (state, {payload}) => ({
        ...state,
        notes: state.notes.map(note => {
            if(note.id == payload.id) return payload; 
            else {
                return note
            }
        })
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
