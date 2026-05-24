const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
const words = [
    "an", "cat", "dog", "sun", "moon", "star", "tree", "book", "chair", "apple",
    "orange", "banana", "grape", "peach", "mango", "kiwi", "melon", "berry", "plum", "lemon",
    "rocket", "planet", "galaxy", "nebula", "meteor", "comet", "saturn", "jupiter", "venus", "mercury",
    "ocean", "river", "stream", "forest", "desert", "island", "mountain", "valley", "canyon", "waterfall",
    "computer", "keyboard", "monitor", "printer", "speaker", "internet", "browser", "software", "hardware", "database",
    "python", "javascript", "react", "angular", "backend", "frontend", "server", "hosting", "network", "firewall",
    "dragon", "wizard", "castle", "sword", "shield", "knight", "kingdom", "treasure", "monster", "adventure",
    "school", "teacher", "student", "library", "notebook", "backpack", "pencil", "eraser", "science", "history",
    "guitar", "piano", "violin", "drummer", "trumpet", "melody", "rhythm", "concert", "playlist", "headphones",
    "basketball", "football", "baseball", "volleyball", "badminton", "swimming", "cycling", "skateboard", "marathon", "tournament",
    "sandwich", "hamburger", "spaghetti", "pancakes", "waffles", "cupcake", "brownies", "popcorn", "chocolate", "marshmallow",
    "penguin", "elephant", "kangaroo", "alligator", "crocodile", "butterfly", "dolphin", "octopus", "squirrel", "chimpanzee",
    "airplane", "helicopter", "motorcycle", "submarine", "spaceship", "scooter", "bicycle", "ambulance", "firetruck", "spacesuit",
    "backyard", "playground", "apartment", "restaurant", "hospital", "museum", "stadium", "airport", "warehouse", "marketplace",
    "friendship", "kindness", "happiness", "curiosity", "knowledge", "imagination", "creativity", "motivation", "leadership", "confidence",
    "electricity", "technology", "engineering", "mathematics", "chemistry", "biology", "astronomy", "geography", "psychology", "philosophy",
    "flashlight", "microscope", "binoculars", "calculator", "refrigerator", "television", "smartphone", "microphone", "controller", "typewriter",
    "adulthood", "aftershock", "alignment", "animation", "apocalypse", "beautifully", "blacksmith", "boundaries", "breakfast", "cafeteria",
    "celebration", "championship", "civilization", "collection", "commercial", "competition", "companion", "construction", "conversation", "creatures",
    "dangerously", "definition", "demonstrate", "development", "dictionary", "difference", "discussion", "earthquake", "efficiency", "electricity",
    "embarrassing", "emergency", "engineering", "enthusiastic", "environment", "especially", "everything", "experience", "exploration", "expression",
    "fascinating", "generation", "government", "historical", "holographic", "illustration", "imagination", "impossible", "impressive", "independent",
    "information", "ingredient", "inspiration", "intelligent", "interaction", "interesting", "journalism", "laboratory", "landscaping", "leadership",
    "management", "mathematics", "measurement", "mechanical", "meditation", "motivation", "mysterious", "navigation", "neighborhood", "networking",
    "observation", "organization", "originality", "partnership", "performance", "personality", "philosophy", "photography", "population", "possibility",
    "prediction", "preparation", "presentation", "production", "programming", "protection", "psychology", "publication", "qualification", "recognition",
    "reflection", "relationship", "remarkable", "reputation", "revolution", "scientific", "sensitivity", "separation", "simplicity", "simulation",
    "situation", "skateboard", "smartphone", "spacecraft", "specialized", "strawberry", "submarine", "successful", "supermarket", "technology",
    "television", "temperature", "theoretical", "traditional", "transformer", "transportation", "understanding", "university", "vegetarian", "watermelon"
];

let randomWord;
let score = 0;
let time = 10;
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'ez';
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'ez';
text.focus();

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
};

function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

function updateScore() {
    score++;
    scoreEl.innerHTML = score;
};

function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';
    if (time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
};

function gameOver() {
    endgameEl.innerHTML = `
    <h1>no more time boi</h1>
    <p>your score: ${score}</p>
    <button onclick = 'location.reload()'>restart</button>
    `;
    endgameEl.style.display = 'flex'
};

addWordToDOM();

text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();
        e.target.value = '';
        if (difficulty === 'not ez') {
            time += 2;
        } else if (difficulty === 'meh') {
            time += 3;
        } else {
            time += 2;
        };
        updateTime();
    };
});

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});
