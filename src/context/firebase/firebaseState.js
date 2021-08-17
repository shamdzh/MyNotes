import React, { useReducer } from 'react';
import axios from 'axios';
import {FirebaseContext} from './firebaseContext';
import {FirebaseReducer} from './firebaseReducer';
import {ADD_NOTE} from '../types'


const url = 'https://mynotes-e2d75-default-rtdb.firebaseio.com';

export const FirebaseState = ({children}) => {
   const initialState = {
        notes: []
    }

    const [state, dispatch] = useReducer(FirebaseReducer, initialState);
    

    const addNote = async (title, text) => {
        const note = {
            title,
            text,
            date: new Date().toJSON()
        }

        try {
            console.log("Пытаюсь отправить запрос на сервер...")
            const res = await axios.post(`${url}/notes.json`, note)
            
            const payload = {
                ...note,
                id: (res.data.name)
            }

            dispatch({type:ADD_NOTE, payload})

        } catch (e) {
            throw new Error(e.message)
        } 
    }

    return (
        <FirebaseContext.Provider value={{
            addNote,
            notes: state.notes
        }}>
            {children}
        </FirebaseContext.Provider>
    )
}
