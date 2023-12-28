let secretNumber = Math.floor(Math.random() * 250) + 1;
let attempts = 0;
const maxAttempts = 15;

document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    checkGuess();
  }
});

function checkGuess() {
  const userGuess = parseInt(document.getElementById('userGuess').value);

  if (isNaN(userGuess) || userGuess < 1 || userGuess > 250) {
    setMessage('Veuillez entrer un nombre entre 1 et 250.');
    return;
  }

  attempts++;

  if (userGuess === secretNumber) {
    if (attempts === 1) {
      winGift();
    }
    setMessage(`Bravo, vous avez deviné le nombre ${secretNumber} en ${attempts} tentatives !`);
    disableInput();
  } else if (attempts === maxAttempts) {
    setMessage(`Dommage ! Le nombre mystère était ${secretNumber}. Essayez à nouveau.`);
    disableInput();
  } else if (userGuess < secretNumber) {
    setMessage('Trop petit ! Essayez à nouveau.');
  } else {
    setMessage('Trop grand ! Essayez à nouveau.');
    handleHeartLoss();
  }

  displayAttempts(maxAttempts - attempts);
}

function setMessage(message) {
  document.getElementById('message').textContent = message;
}

function disableInput() {
  document.getElementById('userGuess').disabled = true;
  document.querySelector('button').disabled = true;
}

function displayAttempts(remainingAttempts) {
  const heartsDiv = document.getElementById('hearts');
  heartsDiv.innerHTML = '';
  for (let i = 0; i < remainingAttempts; i++) {
    const heartImg = document.createElement('img');
    heartImg.src = 'https://us.123rf.com/450wm/yupiramos/yupiramos1712/yupiramos171210560/91423138-jeu-vid%C3%A9o-coeur-vie-ic%C3%B4ne-vector-illustration-ombre-image.jpg'; // Remplacez 'heart.png' par votre chemin d'accès vers l'image de cœur
    heartImg.alt = 'Heart';
    heartsDiv.appendChild(heartImg);
  }
}

function handleHeartLoss() {
  const heartsDiv = document.getElementById('hearts');
  const hearts = heartsDiv.querySelectorAll('img');
  if (attempts <= maxAttempts) {
    const lostHeart = hearts[maxAttempts - attempts];
    lostHeart.classList.add('heart-lost');
  }
}

function winGift() {
  const videoGift = document.getElementById('videoGift');
  videoGift.style.display = 'block';
  videoGift.play();
}
