import FirestoreDatabase from "../store/firestore";
import LocalStore from "../store/localstore";

class HighScoreManager {
    #database;

    constructor(key) {
        this.#database = window.location.hostname === 'localhost' ? new FirestoreDatabase(key) : new FirestoreDatabase(key);
    }

    getHighScores() {
        this.#database.get();
    }

    addHighScore(name, value) {
        this.#database.set({ name, value, date: new Date().toISOString() });
    }

    getTopTen() {
        return this.#database.get()
            .sort(this.#compare)
            .filter((element, index) => index < 10);
    }

    #compare(a, b) {
        if (a.value > b.value) return -1;
        if (b.value > a.value) return 1;

        if (Date.parse(a.date) > Date.parse(b.date)) return 1;
        if (Date.parse(b.date) > Date.parse(a.date)) return -1;

        return 0;
    }


}

export default HighScoreManager;