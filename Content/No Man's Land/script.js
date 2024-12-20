// script.js
// ... timer logic ...
const eventDate = new Date('December 25, 2024 00:00:00');

// Popup functionality
const timerPopup = document.createElement('div');
timerPopup.classList.add('popup');

// Remove the original countdown element from the page
const countdownElement = document.querySelector('.timer');
if (countdownElement) {
    countdownElement.parentNode.removeChild(countdownElement);
}

// Update the timer within the popup 
function updateCountdown() {
    const now = new Date();
    const distance = eventDate - now;

    if (distance <= 0) {
        // Update the popup 
        timerPopup.innerHTML = `
            <div class="timer">Event has started!</div>
        `;
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update or set the popup's content 
    timerPopup.innerHTML = `
        <div class="timer">${days}d ${hours}h ${minutes}m ${seconds}s</div>
    `;
}

// Call updateCountdown once to initially populate the popup
updateCountdown();

setInterval(updateCountdown, 1000);

document.body.appendChild(timerPopup);

// Show the popup after a delay (e.g., 3 seconds)
setTimeout(() => {
    timerPopup.classList.add('show');
}, 500);

const preguntas = document.querySelectorAll('.pregunta');

preguntas.forEach((pregunta) => {
    pregunta.addEventListener('click', () => {
        const respuesta = pregunta.nextElementSibling;
        respuesta.classList.toggle('mostrar');
    });
});

// Tabbed content functionality with smooth transition
const tabs = document.querySelectorAll('.tab');
const tabContent = document.querySelectorAll('.tab-panel');

function showTab(index) {
    // Hide all tabs
    tabs.forEach((tab) => {
        tab.classList.remove('active');
    });

    // Show the selected tab
    tabs[index].classList.add('active');

    // Fade out all tab panels
    tabContent.forEach((panel) => {
        panel.style.opacity = '0';
    });

    // Fade in the selected tab panel
    setTimeout(() => {
        tabContent.forEach((panel) => {
            panel.style.display = 'none';
        });
        tabContent[index].style.display = 'block';
        setTimeout(() => {
            tabContent[index].style.opacity = '1';
        }, 50); // Keep the original smooth transition for tabs
    }, 300); // This delay should match the transition duration in CSS
}

tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        showTab(index);
    });
});

// Show the first tab by default
showTab(0);

// Add animation delays to all cards
const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
    card.style.animationDelay = `${(index + 1) * 0.2}s`;
});

// Scroll button functionality
const scrollButton = document.getElementById('scrollButton');
scrollButton.setAttribute('aria-label', 'Scroll to Top/Bottom');

// Track the previous scroll position to determine scroll direction
let prevScrollPos = 0;

window.addEventListener('scroll', () => {
    const currentScrollPos = window.pageYOffset;
    const scrollHeight = document.body.scrollHeight - window.innerHeight;

    if (currentScrollPos > 200 && currentScrollPos < scrollHeight - 200) {
        scrollButton.style.opacity = '0.7 !important';
        scrollButton.style.transform = 'translateY(0) !important';
    } else {
        scrollButton.style.opacity = '0 !important';
        scrollButton.style.transform = 'translateY(20px) !important';
    }

    // Update scroll direction and button appearance
    if (currentScrollPos > prevScrollPos) {
        scrollButton.classList.remove('scroll-to-top');
        scrollButton.classList.add('scroll-to-bottom');
    } else if (currentScrollPos < prevScrollPos) {
        scrollButton.classList.remove('scroll-to-bottom');
        scrollButton.classList.add('scroll-to-top');
    }

    prevScrollPos = currentScrollPos;
});

scrollButton.addEventListener('click', () => {
    if (scrollButton.classList.contains('scroll-to-bottom')) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
});

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
    event.stopPropagation();

    const iframe = card.querySelector('iframe'); 

    if (iframe) {
        const iframeSrc = iframe.src;

        const contextContent = contextWindow.querySelector('.context-content');
        contextContent.innerHTML = `
            <iframe src="${iframeSrc}" allowfullscreen></iframe>
        `;

        // Calculate context window position
        const cardRect = card.getBoundingClientRect();
        const windowWidth = window.innerWidth; 
        const contextWindowWidth = 420; // Approximate width of the context window

        // Determine if it should be on the left or right
        if (cardRect.left + cardRect.width + contextWindowWidth + 10 > windowWidth) {
          contextWindow.style.left = `${cardRect.left - contextWindowWidth - 10}px`;
        } else {
          contextWindow.style.left = `${cardRect.left + cardRect.width + 10}px`;
        }
        contextWindow.style.top = `${cardRect.top + window.scrollY + cardRect.height / 2}px`; 

        // Show the context window before checking for scrolling
        contextWindow.style.display = 'block';

        // Scroll the card into view if necessary
        card.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest', // Align to the nearest edge vertically
          inline: 'nearest' // Align to the nearest edge horizontally 
        });
      }
  });
});

document.addEventListener('DOMContentLoaded', () => {
    const galleryWrapper = document.querySelector('.gallery-wrapper');
    const images = document.querySelectorAll('.gallery-image');
    const prevButton = document.querySelector('.gallery-button.prev');
    const nextButton = document.querySelector('.gallery-button.next');
    
    let currentIndex = 0;
    let autoSwitchTimer;
    
    function showImage(index) {
        galleryWrapper.style.transform = `translateX(${-index * 100}%)`;
    }
    
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
        resetAutoSwitchTimer();
    }
    
    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
        resetAutoSwitchTimer();
    }

    function resetAutoSwitchTimer() {
        clearTimeout(autoSwitchTimer);
        autoSwitchTimer = setTimeout(nextImage, 10000); // Change image every 10 seconds
    }
    
    nextButton.addEventListener('click', nextImage);
    prevButton.addEventListener('click', prevImage);
    
    // Initialize the automatic image switch
    autoSwitchTimer = setTimeout(nextImage, 10000);
});

// Close button functionality 
const closeButton = contextWindow.querySelector('.close-button');
closeButton.addEventListener('click', () => {
    // Pause or mute the iframe before closing
    const iframe = contextWindow.querySelector('iframe');
    if (iframe) {
        iframe.contentWindow.postMessage('{"event":"command","func":"pause","args":""}', '*'); // This sends a message to the iframe to pause
    }

    contextWindow.style.display = 'none';
    
    setTimeout(() => {
        const currentScrollPos = window.pageYOffset;

        // Actualizar la dirección del scroll y la apariencia del botón
        if (currentScrollPos > prevScrollPos) { 
            scrollButton.classList.remove('scroll-to-top');
            scrollButton.classList.add('scroll-to-bottom');
        } else if (currentScrollPos < prevScrollPos) { 
            scrollButton.classList.remove('scroll-to-bottom');
            scrollButton.classList.add('scroll-to-top');
        }

        window.dispatchEvent(new Event('scroll'));
    }, 100);

    const tabs = document.querySelectorAll('.tab');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remover las clases 'active' de todas las pestañas y paneles
        tabs.forEach(t => t.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
    
        // Agregar la clase 'active' a la pestaña seleccionada
        tab.classList.add('active');
    
        // Obtener el ID del panel correspondiente y mostrarlo
        const targetPanelId = tab.getAttribute('data-target');
        const targetPanel = document.getElementById(targetPanelId);
        targetPanel.classList.add('active');
      });
    });    

});

