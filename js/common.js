
document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector("#menu"),
        botonMenu = document.querySelector("#botonMenu");
    if (menu) {
        botonMenu.addEventListener("click", () => menu.classList.toggle("show"));
    }
});
const LOCAL_STORAGE_WORDS_KEY = "words";
const getWords = () => (JSON.parse(localStorage.getItem(LOCAL_STORAGE_WORDS_KEY)) || []);
const saveWords = (words) => (localStorage.setItem(LOCAL_STORAGE_WORDS_KEY, JSON.stringify(words)));

const getScore = () => { return JSON.parse(localStorage.getItem("score")) || 0; };
const saveScore = (score) => { localStorage.setItem("score", JSON.stringify(score)); };


const deleteWord = (word) => { 
    const words = getWords();
    const index = words.indexOf(word);
    if (index > -1) {
        words.splice(index, 1);
    }
    saveWords(words);
}




const showScore = () => {
    const score = getScore();
    document.querySelector("#score").innerHTML = "Score: " + score;
}



const saveScoreToApi = async (name, score) => {
    const response = await fetch(`https://flamas29.000webhostapp.com/apihaorcado.php?name=${name}&score=${score}`);
    const data = await response.json();
    return data;
}



const getWordsFromApi = async () => {

    localStorage.removeItem(LOCAL_STORAGE_WORDS_KEY);
    localStorage.removeItem("score");


    const response = await fetch("https://random-word-api.herokuapp.com/word?length=5&lang=es&number=1000");
    //quitar las palabras que tengan caracteres especiales
    const words = await response.json();
    const filteredWords = words.filter(word => word.match(/^[a-zA-Z]+$/));
    saveWords(filteredWords);
    location.reload();



}

const getWordsFromApi2 = async () => {

    localStorage.removeItem(LOCAL_STORAGE_WORDS_KEY);
    localStorage.removeItem("score");


    const response = await fetch("https://random-word-api.herokuapp.com/word?length=10&lang=es&number=1000");
    const words = await response.json();
    const filteredWords = words.filter(word => word.match(/^[a-zA-Z]+$/));
    saveWords(filteredWords);

    location.reload();

    
}

const getWordsFromApi3 = async () => {
    localStorage.removeItem(LOCAL_STORAGE_WORDS_KEY);
    localStorage.removeItem("score");


    const response = await fetch("https://random-word-api.herokuapp.com/word?length=15&lang=es&number=1000");
    const words = await response.json();    
    const filteredWords = words.filter(word => word.match(/^[a-zA-Z]+$/));
    saveWords(filteredWords);
    location.reload();


}


const getTopTen = async () => {
    const response = await fetch("https://flamas29.000webhostapp.com/topten.php");
    const topten = await response.json();
    const toptenTable = document.querySelector("#topten");
    topten.forEach((element, index) => {
        toptenTable.innerHTML += `<tr><td>${index + 1}</td><td>${element.name}</td><td>${element.score}</td></tr>`;
    });

}

//obtener los valores del top ten y retornarlos
const getTopTenValues = async () => {
    const response = await fetch("https://flamas29.000webhostapp.com/topten.php");
    const topten = await response.json();
    return topten;
}


