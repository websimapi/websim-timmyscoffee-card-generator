import { getTypeIcon, getTypeColor } from '../utils.js';

export function handleHover(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = (y - centerY) / 20; // Reduced intensity
  const rotateY = -(x - centerX) / 20; // Reduced intensity
  
  card.style.transform = `
    perspective(2000px) 
    rotateX(${rotateX}deg) 
    rotateY(${rotateY}deg) 
    scale3d(1.02, 1.02, 1.02)
  `;
}

export function resetHover(e) {
  const card = e.currentTarget;
  card.style.transform = 'perspective(2000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  card.style.transition = 'transform 0.5s ease';
  
  // Remove transition after it's complete
  setTimeout(() => {
    card.style.transition = '';
  }, 500);
}

export async function loadCardToMain(cardData) {
  // Create a new card with the saved data
  const cardContainer = document.getElementById('cardContainer');
  
  // Remove existing card and submenu
  const existingCard = document.querySelector('.card');
  const existingSubmenu = document.querySelector('.submenu');
  if (existingCard) existingCard.remove();
  if (existingSubmenu) existingSubmenu.remove();

  // Create new card
  const card = document.createElement('div');
  card.className = 'card show';
  
  const cardInner = document.createElement('div');
  cardInner.className = 'card-inner flipped';
  
  // Get type colors for gradient
  const types = cardData.type.split('/');
  const primaryType = types[0].toLowerCase().trim();
  const secondaryType = types[1] ? types[1].toLowerCase().trim() : primaryType;
  const primaryColor = getTypeColor(primaryType);
  const secondaryColor = getTypeColor(secondaryType);
  
  cardInner.innerHTML = `
    <div class="card-front" style="background: linear-gradient(135deg, ${primaryColor}26, ${secondaryColor}26 70%)">
      <h2 class="pokemon-name">${cardData.name}</h2>
      <div class="card-image-container">
        <img class="pokemon-image" src="${cardData.imageUrl}" alt="${cardData.description}">
      </div>
      <div class="stats-container">
        <div class="type-wrapper">
          ${types.map(type => `
            <div class="type-icon ${type.toLowerCase().trim()}" title="${type.trim()}">
              ${getTypeIcon(type.trim())}
            </div>
          `).join('')}
        </div>
        <p class="pokemon-stats">${cardData.height} | ${cardData.weight}</p>
      </div>
      <div class="card-description">
        <p class="pokemon-description">${cardData.description}</p>
      </div>
    </div>
    <div class="card-back">
      <div class="card-back-design">
        <svg class="card-back-logo" viewBox="0 0 100 100">
          <path fill="currentColor" d="M30 20h40c5.5 0 10 4.5 10 10v30c0 16.6-13.4 30-30 30S20 76.6 20 60V30c0-5.5 4.5-10 10-10z"/>
          <path fill="currentColor" d="M80 35h10c2.8 0 5 2.2 5 5v10c0 2.8-2.2 5-5 5H80V35z"/>
          <path fill="rgba(255,255,255,0.2)" d="M35 30c0 0 15-5 30 0c-5 10-25 10-30 0z"/>
        </svg>
        <div class="card-back-pattern"></div>
      </div>
    </div>
  `;
  
  card.appendChild(cardInner);
  cardContainer.appendChild(card);

  // Create submenu
  const submenu = document.createElement('div');
  submenu.className = 'submenu hidden';
  
  submenu.innerHTML = `
    <div class="submenu-grid">
      <div class="stat-box">
        <div class="stat-label">Name</div>
        <div class="stat-value">${cardData.name}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Type</div>
        <div class="stat-value">${cardData.type}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Height</div>
        <div class="stat-value">${cardData.height}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Weight</div>
        <div class="stat-value">${cardData.weight}</div>
      </div>
    </div>
    <div class="description-box">
      <div class="description-title">Description</div>
      <div class="full-description">${cardData.description}</div>
    </div>
  `;
  
  cardContainer.appendChild(submenu);
  
  // Add hover effect
  card.addEventListener('mousemove', handleHover);
  card.addEventListener('mouseleave', resetHover);
  
  // Add click handler with submenu toggle and auto-flip after mounting
  card.addEventListener('click', (e) => {
    const cardInner = e.currentTarget.querySelector('.card-inner');
    cardInner.classList.toggle('flipped');
    
    // Show/hide submenu based on card flip state
    if (!cardInner.classList.contains('flipped')) {
      setTimeout(() => {
        submenu.classList.remove('hidden');
      }, 400); // Half the flip animation duration
    } else {
      submenu.classList.add('hidden');
    }
  });

  // Auto flip the card after a short delay
  setTimeout(() => {
    const cardInner = card.querySelector('.card-inner');
    cardInner.classList.remove('flipped');
    setTimeout(() => {
      submenu.classList.remove('hidden');
    }, 400);
  }, 100);
}