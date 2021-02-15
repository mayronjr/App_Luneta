import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

//Insira abaixo a chave da API do Firebase
const config = {
};

export const firebaseImpl = firebase.initializeApp(config);
export const FBDatabase = firebase.database();
export const FBStorage = firebase.storage();
