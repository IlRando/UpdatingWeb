// script.js

// ... timer logic (unchanged) ... 
const eventDate = new Date('October 18, 2024 00:00:00'); 

// Popup functionality
const timerPopup = document.createElement('div');
timerPopup.classList.add('popup');

// ... (rest of your timer logic - unchanged) ...

// Tabbed content functionality 
const tabs = document.querySelectorAll('.tab');
const tabContent = document.querySelectorAll('.tab-panel');

// ... (Your showTab function - unchanged) ...

// ... (Event listener for tabs - unchanged) ... 

// Show the first tab by default
showTab(0); 

// Add animation delays to all cards (updated selector)
const cards = document.querySelectorAll('.card-container .card'); 
cards.forEach((card, index) => {
    card.style.animationDelay = `${(index + 1) * 0.2}s`;
});

// Scroll button functionality (unchanged)
// ... (your scroll button logic - unchanged) ... 

// Context window functionality
const contextWindow = document.createElement('div');
contextWindow.classList.add('context-window');
contextWindow.innerHTML = `
  <button class="close-button">×</button>
  <div class="context-content"></div>
`;
document.body.appendChild(contextWindow);

// Add event listeners to cards to show context window
const playerCards = document.querySelectorAll('.card');

playerCards.forEach(card => {
  card.addEventListener('click', (event) => {
    // ... (rest of the event listener function - unchanged) ... 
  });
});

// Close button functionality (unchanged)
const closeButton = contextWindow.querySelector('.close-button');
closeButton.addEventListener('click', () => {
    contextWindow.style.display = 'none';
});