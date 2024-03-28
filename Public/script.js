let score = 0;
let bgMusic = document.getElementById('bgMusic');
let isMuted = false;
let multiplier = 3; // Gives +3 multiplier at the beginning of the game
let multiplierCost = 50;
let level = 1;
let levelThreshold = 100; // Initial level threshold
const baseThresholdIncrease = 100; // Base increase in level threshold
const progressBarWidth = 300; // Width of the progress bar
let startTime; // Variable to store start time
let playTimeInterval; // Variable to store setInterval reference for updating play time

function increaseScore() {
  score += multiplier; // Increment score by the current multiplier
  let scoreElement = document.getElementById('scoreValue');
  scoreElement.innerText = score;
  scoreElement.classList.add('smooth-element'); // Add smooth transition class
  if (!startTime) {
    startTime = new Date(); // Set start time if it's not set already
    playTimeInterval = setInterval(updatePlayTime, 1000); // Start updating play time every second
  }
  if (score >= 500) {
    let privateBtn = document.getElementById('privateBtn');
    privateBtn.style.display = 'inline-block';
    privateBtn.classList.add('fade-in'); // Add fade-in animation class
  }
  checkLevel();
  updateProgressBar();
  saveProgress(); // Automatically save progress after each score increase
}

function resetScore() {
  if (confirm("Are you sure you want to reset the score?")) {
    score = 0;
    level = 1; // Reset level to 1
    multiplier = 1; // Reset multiplier to 1
    document.getElementById('scoreValue').innerText = score;
    document.getElementById('levelValue').innerText = level; // Update level display
    document.getElementById('multiplierValue').innerText = multiplier; // Update multiplier display
    localStorage.removeItem('clickerScore');
    localStorage.removeItem('clickerMultiplier'); // Remove multiplier from local storage
    document.getElementById('privateBtn').style.display = 'none'; // Hide the private button
    updateProgressBar(); // Update progress bar after resetting score
    saveProgress(); // Automatically save progress after resetting score
    clearInterval(playTimeInterval); // Stop updating play time
    startTime = null; // Reset start time
    document.getElementById('playTime').innerText = '00:00:00'; // Reset play time display
    window.location.reload(); // Refresh the page
  }
}

function checkLevel() {
  while (score >= levelThreshold) {
    level++;
    levelThreshold += baseThresholdIncrease * level; // Increase the threshold for the next level
    updateProgressBar(); // Update progress bar when level increases
  }
  document.getElementById('levelValue').innerText = level;
}

function buyMultiplier() {
  if (score >= multiplierCost) {
    score -= multiplierCost;
    multiplier++;
    multiplierCost *= 2; // Increase the cost of the next multiplier
    document.getElementById('scoreValue').innerText = score;
    document.getElementById('multiplierValue').innerText = multiplier;
    document.getElementById('multiplierCost').innerText = multiplierCost;
    let multiplierElement = document.getElementById('multiplierValue');
    multiplierElement.classList.add('smooth-element'); // Add smooth transition class
    saveMultiplier(); // Save multiplier in local storage
    saveProgress(); // Save progress after buying multiplier
  } else {
    alert('Not enough score to buy multiplier!');
  }
}

function updateProgressBar() {
  const progress = (score / levelThreshold) * 100;
  document.getElementById('progressBar').style.width = progress + '%';
  let progressBar = document.getElementById('progressBar');
  progressBar.classList.add('smooth-element'); // Add smooth transition class
}

function redirectToPrivateServer() {
  window.location.href = "https://youtu.be/o-YBDTqX_ZU?si=a6exJ9z-QHIlqyde"; // Redirect to private server link loll
}

function toggleMute() {
  if (!isMuted) {
    bgMusic.pause();
    document.getElementById('muteBtn').innerText = 'Unmute Music';
  } else {
    bgMusic.play();
    document.getElementById('muteBtn').innerText = 'Mute Music';
  }
  isMuted = !isMuted;
}

function updatePlayTime() {
  if (startTime) {
    const currentTime = new Date();
    const elapsedTime = currentTime - startTime;
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const formattedTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    document.getElementById('playTime').innerText = formattedTime;
  }
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

// Start playtime when the page loads
window.onload = function() {
  if(localStorage.getItem('clickerScore') !== null) {
    score = parseInt(localStorage.getItem('clickerScore'));
    console.log('Loaded score:', score); // Check if the score is correctly loaded
    document.getElementById('scoreValue').innerText = score;
    if (score >= 500) {
      document.getElementById('privateBtn').style.display = 'inline-block'; // Display the private button if score is already >= 500
    }
  }
  if(localStorage.getItem('clickerMultiplier') !== null) {
    multiplier = parseInt(localStorage.getItem('clickerMultiplier')); // Retrieve multiplier from local storage
    multiplierCost = 50 * Math.pow(2, multiplier - 1); // Calculate the current multiplier cost
    console.log('Loaded multiplier:', multiplier); // Check if the multiplier is correctly loaded
    document.getElementById('multiplierValue').innerText = multiplier; // Update multiplier display
    document.getElementById('multiplierCost').innerText = multiplierCost; // Update multiplier cost display
  }
  checkLevel(); // Check level on page load
  updateProgressBar(); // Update progress bar on page load
  
  // Start playtime when the page loads
  startPlayTime();
}

// Function to start playtime
function startPlayTime() {
  startTime = new Date(); // Set start time
  playTimeInterval = setInterval(updatePlayTime, 1000); // Start updating play time every second
}

function saveProgress() {
  localStorage.setItem('clickerScore', score);
}

function saveMultiplier() {
  localStorage.setItem('clickerMultiplier', multiplier); // Save multiplier in local storage
}