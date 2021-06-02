import firebaseConfig from '../config/firebase-config';
import firebase from "firebase/app";
import "firebase/database";

class FirestoreDatabase {
    #database;
    #data;
    #key;
    constructor(key) {
        this.#key = key;
        firebase.initializeApp(firebaseConfig);
        this.#database = firebase.database;
        const dbRef = this.#database().ref(this.#key);

        dbRef.get().then((snapshot) => {
            if (snapshot.exists()) {
                this.#data = JSON.parse(snapshot.val());
            } else {
                console.log("No data available");
                this.#data = [];
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    get(){
        return this.#data;
    }

    set(entry) {
        this.#data.push(entry);
        const dbRef = this.#database().ref(this.#key);
        dbRef.set(JSON.stringify( this.#data));
    }
}

export default FirestoreDatabase;