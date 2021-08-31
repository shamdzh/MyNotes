import React from 'react';
import { AlertReducer } from './alertReducer';

export const AlertState = ({children}) => {

    const [state, dispatch] = useReduser(AlertReducer, {visible: false})

    const show = () => {

    }

    const hide = () => {
        
    }

    return (
        <div></div>
    )
}