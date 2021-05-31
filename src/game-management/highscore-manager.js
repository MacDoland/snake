class HighScoreManager {
    #key;
    #highScores;

    constructor(key) {
        this.#key = key;
        this.#highScores = [];
        let savedHighScoresString = window.localStorage.getItem(key);

        if (typeof (savedHighScoresString) === 'string') {
            let savedHighScores = JSON.parse(savedHighScoresString);

            if (Array.isArray(savedHighScores)) {
                this.#highScores = [...savedHighScores];
            }
        }
    }

    getHighScores() {
        return this.#highScores;
    }

    addHighScore(name, value) {
        console.log("addHighScore");
        this.#highScores.push({ name, value, date: new Date().toISOString() });
        this.#save();
    }

    getTopTen() {
        return this.#highScores
            .sort(this.#compare)
            .filter((element, index) => index < 10);
    }

    #save() {
        console.log("save");
        window.localStorage.setItem(this.#key, JSON.stringify(this.#highScores));
    }

    #compare(a, b) {
        if (a.value > b.value) return -1;
        if (b.value > a.value) return 1;
      
        if(Date.parse(a.date) > Date.parse(b.date)) return 1;
        if(Date.parse(b.date) > Date.parse(a.date)) return -1;

        return 0;
      }


}

export default HighScoreManager;