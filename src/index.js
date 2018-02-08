import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';

firebase.initializeApp({
		apiKey: "AIzaSyAbzw_iuCC7wya88lxix0BoZ1kKR9vU3Ic",
    authDomain: "timetracking-coddde.firebaseapp.com",
    databaseURL: "https://timetracking-coddde.firebaseio.com",
    projectId: "timetracking-coddde",
    storageBucket: "timetracking-coddde.appspot.com",
    messagingSenderId: "377778818961"

});

ReactDOM.render(<App />, document.getElementById('root'));
