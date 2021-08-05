import React, { Fragment, useState } from 'react';


export const Form = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    console.log(title, text);

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
                <button type="button" class="addBtn btn btn-lg">Добавить заметку</button>
            </div>
        </div>
    )
}
