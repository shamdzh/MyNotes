import React, { useContext, useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

import axios from 'axios';
import { FirebaseContext } from "../context/firebase/firebaseContext";

export const Login = () => {
  const {firebase, auth, user } = useContext(FirebaseContext);
  
  const provider = new GoogleAuthProvider();
  const [check, setCheck] = useState(false);
  const url = 'https://mynotes-e2d75-default-rtdb.firebaseio.com';

  useEffect(() => {
    console.log("Сработал метод useEffect")
    console.log(auth)

      if (localStorage.getItem('user')) {
        console.log("Вы успешно авторизовались")
        console.log(user);
      } else {
        console.log(user)
        console.log("Вы не авторизованы")
      }
  }, [check]);




  const login = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem('user', JSON.stringify(result.user))
        setCheck(!check)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const request = async () => {
    const note = {
      title: "Новая заметка",
      text: "Получилось"
  }

  try {
      console.log("Пытаюсь отправить запрос на сервер...")
      const res = await axios.post(`${url}/notes.json?auth=eyJhbGciOiJSUzI1NiIsImtpZCI6IjJjZGFiZDIwNzVjODQxNDI0NDY3MTNlM2U0NGU5ZDcxOGU3YzJkYjQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU2hhbSBCbGFjayIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQVRYQUp6SGNIMG1IUS00ekNabHgtVUthWExoU3pVNGN2N3pjS21VZ1UtVT1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9teW5vdGVzLWUyZDc1IiwiYXVkIjoibXlub3Rlcy1lMmQ3NSIsImF1dGhfdGltZSI6MTYzMTAyMjA3OSwidXNlcl9pZCI6IkVnSEdGRjZkZWtSZWpHRDFjTTBPaG9wTnBwazEiLCJzdWIiOiJFZ0hHRkY2ZGVrUmVqR0QxY00wT2hvcE5wcGsxIiwiaWF0IjoxNjMxMDIyMDc5LCJleHAiOjE2MzEwMjU2NzksImVtYWlsIjoic2hkemhhbmhvdG92QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAzNzg5NjQ5OTM5MDI0NTM3NDk1Il0sImVtYWlsIjpbInNoZHpoYW5ob3RvdkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.FT7REqLZu4JIvLTSGXpUFefCuBTHoaRsr_z4Sa5NdMUsrMZcTa6oXz5W4RCTH70dPu-S9ePH6xAYUPuMcGjq4bV0tcG3yMPjBA-uET2bdyF-waTQCax4nkCJve6kTe6vXAE8s4BYUb4T7JbhbSGii8Eh8p2Gm5NW4hcvwAdKH6JoRV58rOOkpvdYQw302xWNJmnz9gMeeEOPy1HS75uDTAFucQlWFkWyOOCHmYFHAGLAHCiI4CHZynaJgvq1S2f4stbYowEIu5lAim-ikIz6v4zWJ-juO1hPlatxkx27gxFN-7WeAb8E6UiumN0IUOtDZayRcUJHkkzaLCMCvVpJUw`, note)
      
      console.log(res);
      
  } catch (e) {
      throw new Error(e.message)
  } 
  }

  const logOut = () => {
    signOut(auth)
    .then(() => {
      console.log("Sign-out successful");
      localStorage.removeItem('user');
      setCheck(!check)
    })
    .catch((error) => {
        console.log("Ошибка выхода")
      });
  };

  return localStorage.getItem('user') ?
    (
      <>
        <div>Вы успешно авторизованы, {JSON.parse(localStorage.getItem('user')).displayName}</div>
        <button
          class="authBtn btn btn-primary"
          type="submit"
          onClick={logOut}
        >
          Выйти
        </button>
        <button
          class="authBtn btn btn-primary"
          type="submit"
          onClick={request}
        >
          Отправить POST запрос
        </button>
      </>
    )
    :
    (
      <div class="d-flex flex-wrap justify-content-center">
        <button class="authBtn btn btn-primary" type="submit" onClick={login}>
          Войти
        </button>
      </div>
    )
};
