// Initialisation de la carte centrée sur Marseille
const map = L.map('map').setView([43.2965, 5.3698], 13);

// Ajout du fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Ajout d’un marqueur avec popup
L.marker([43.2965, 5.3698]).addTo(map)
  .bindPopup('Bienvenue à Marseille !')
  .openPopup();
