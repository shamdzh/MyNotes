import React, { useReducer } from 'react';
import axios from 'axios';
import {FirebaseContext} from './firebaseContext';
import {FirebaseReducer} from './firebaseReducer';
import {ADD_NOTE, GET_NOTES, GET_CURRENT_NOTE} from '../types'


const url = 'https://mynotes-e2d75-default-rtdb.firebaseio.com';

export const FirebaseState = ({children}) => {
   const initialState = {
        notes: [],
        currentNote: 'null'
    }

    const [state, dispatch] = useReducer(FirebaseReducer, initialState);
    
    const getNotes = async () => {
        const res = await axios.get(`${url}/notes.json`);

        if(res.data == null) {
            return;
        }

        const payload = Object.keys(res.data).map(key => {
            return {
                ...res.data[key],
                id: key
            }
        })

        dispatch({type: GET_NOTES, payload})
        
        console.log(payload);
    }

    const addNote = async (title, text) => {

        function reverseString(str) {
            return str.split("-").reverse().join("-");
        }
     
        const note = {
            title,
            text,
            date: reverseString(new Date().toJSON().substr(0, 10)).replace( /-/g, "." )
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

    const editNotes = async (id, title, text) => {
        const res = await axios.put(`${url}/notes/-MhkhXl4mPwSc_OmYpfv.json/`, {
            title: title,
            text: text
        });

        // if(res.data == null) {
        //     return;
        // }

        // const payload = Object.keys(res.data).map(key => {
        //     return {
        //         ...res.data[key],
        //         id: key
        //     }
        // })

        // dispatch({type: GET_NOTES, payload})
        
        // console.log(payload);
    }

    const getCurrentNote = (note) => {
        const payload = {
           ...note
        }

        dispatch({type:GET_CURRENT_NOTE, payload})
    } 

    return (
        <FirebaseContext.Provider value={{
            addNote, getNotes, getCurrentNote,
            notes: state.notes,
            currentNote: state.currentNote
        }}>
            {children}
        </FirebaseContext.Provider>
    )
}
