
const ALPHABET = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
    MAX_ATTEMPTS = 6,
    MASK_CHAR = "_";
new Vue({
    el: "#app",
    data: () => ({
        letters: {},
        hiddenWord: [],
        remainingAttempts: 0,
    }),
    async mounted() {
       
        this.resetGame();
    },
    methods: {
        resetGame() {
            this.resetAttempts();
            this.setupKeys();
            this.chooseWord();
        },
        
        async checkGameStatus () {
            if (this.playerWins()) {
                Swal.fire("You win! The word was " + this.getUnhiddenWord());
                deleteWord(this.getUnhiddenWord());
                const score = getScore();
                const addScore = this.remainingAttempts * 2;
                const newScore = score + addScore;

                saveScore(newScore);
                showScore();

                this.resetGame();
            }
            if (this.playerLoses()) {
                 

                const topten = await getTopTenValues();
                const score = getScore();

                if (score > topten[9].score) {
                    
                const result =  await Swal.fire({
                    title: 'Save score',
                    text: "Do you want to save your score?",
                    icon: 'question',
                    showCancelButton: true,
                    cancelButtonText: 'No',
                    confirmButtonText: 'Yes'
                });
                if (result.value) {
                    const { value: name } = await Swal.fire({
                        title: 'Enter your name',
                        input: 'text',
                        inputLabel: 'Your name',
                        inputPlaceholder: 'Enter your name'
                    });
                    if (name) {
                        const response = saveScoreToApi(name, score);
                        if (response.status === "ok") {
                            Swal.fire("Score saved");
                        } else {
                            Swal.fire("Error saving score");
                        }
                    }
                }
                }

                Swal.fire("You lose. The word was " + this.getUnhiddenWord());
                saveScore(0);
                showScore();
                this.resetGame();
            }
        },
        getUnhiddenWord() {
            let word = "";
            for (const letter of this.hiddenWord) {
                word += letter.letter;
            }
            return word;
        },
        playerWins() {
            for (const letter of this.hiddenWord) {
                if (letter.hidden) {
                    return false;
                }
            }
            return true;
        },
        playerLoses() {
            return this.remainingAttempts <= 0;
        },
        imagePath() {
            return `img/Ahorcado-${MAX_ATTEMPTS - this.remainingAttempts}.png`;
        },
        resetAttempts() {
            this.remainingAttempts = MAX_ATTEMPTS;
        },
        async chooseWord() {
            const words = getWords();
            if (!words.length) {

                //si no hay palabras decirle que elija una dificultad 
                const result = await Swal.fire({
                    title: 'Choose difficulty',
                    text: "Choose a difficulty",
                    icon: 'question',
                    showCancelButton: true,
                    cancelButtonText: 'Easy',
                    confirmButtonText: 'Hard'
                });
                if (result.value) {
                    const response = await getWordsFromApi3();
                    if (response.status === "ok") {
                        saveWords(response.words);
                        this.chooseWord();
                    } else {
                        Swal.fire("Error getting words");
                    }
                } else {
                    const response = await getWordsFromApi();
                    if (response.status === "ok") {
                        saveWords(response.words);
                        this.chooseWord();
                    } else {
                        Swal.fire("Error getting words");
                    }
                }
            } 
            let word = words[Math.floor(Math.random() * words.length)];
            this.prepareWord(word);
        },
        prepareWord(word) {
            word = word.toUpperCase();
            const hiddenWord = [];
            for (const letter of word) {
                hiddenWord.push({
                    letter,
                    hidden: true,
                });
            }
            this.hiddenWord = hiddenWord;
        },
        displayWord() {
            let displayedWord = "";
            for (const letter of this.hiddenWord) {
                if (letter.hidden) {
                    displayedWord += MASK_CHAR;
                } else {
                    displayedWord += letter.letter;
                }
                displayedWord += " ";
            }
            return displayedWord;
        },
        setupKeys() {
            for (const letter of ALPHABET) {
                Vue.set(this.letters, letter, {
                    letter,
                    disabled: false, 
                });
            }
        },
        letterExistsInWord(searchedLetter) {
            for (const letter of this.hiddenWord) {
                if (letter.letter === searchedLetter) {
                    return true;
                }
            }
            return false;
        },
        discoverLetter(letter) {
            for (const index in this.hiddenWord) {
                if (this.hiddenWord[index].letter === letter) {
                    this.hiddenWord[index].hidden = false;
                }
            }
        },
        attemptWithLetter(letter) {
            Vue.set(this.letters[letter], "disabled", true);
            if (!this.letterExistsInWord(letter)) {
                this.remainingAttempts -= 1;
            } else {
                this.discoverLetter(letter);
            }
            this.checkGameStatus();
        }
    }
});