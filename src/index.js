import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './scss/main.css';
import App from './App';
import { HashRouter } from 'react-router-dom';

firebase.initializeApp({
	apiKey: "AIzaSyAbzw_iuCC7wya88lxix0BoZ1kKR9vU3Ic",
    authDomain: "timetracking-coddde.firebaseapp.com",
    databaseURL: "https://timetracking-coddde.firebaseio.com",
    projectId: "timetracking-coddde",
    storageBucket: "timetracking-coddde.appspot.com",
    messagingSenderId: "377778818961"

});

ReactDOM.render(<HashRouter>
		<App	/>
</HashRouter>, document.getElementById('root'));
