import React, {useContext, useState} from 'react';
import { FirebaseContext } from '../context/firebase/firebaseContext';

// url = https://mynotes-e2d75-default-rtdb.firebaseio.com/

export const Form = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const firebase = useContext(FirebaseContext);

    console.log(title, text);

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(title.trim()) {
            firebase.addNote(title.trim(), text.trim()).then(() => {
                console.log("Заметка была добавлена")
            }).catch(() => {
                console.log("Произошла ошибка")
            })

            setTitle('');
            setText('');
        } else {
            console.log("Введите название заметки")
        }
    }

    return (
        <div class="note-form">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Название заметки:</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="exampleFormControlInput1" 
                    placeholder="Введите название заметки"
                    value={title}
                    onChange={(e)=> {setTitle(e.target.value)}} 
                />
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Текст заметки:</label>
                <textarea 
                    class="form-control" 
                    id="exampleFormControlTextarea1" 
                    rows="3" 
                    placeholder="Введите текст..."
                    value={text}
                    onChange={(e) => {setText(e.target.value)}}
                >
                </textarea>
            </div>

            <div class="btnBox">
                <button onClick={onSubmitHandler} type="button" class="addBtn btn btn-lg">Добавить заметку</button>
            </div>
        </div>
    )
}
