// Initialisation de la carte centrée sur le monde
const map = L.map('map').setView([20, 0], 2);

// Ajout du fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Chargement du fichier GeoJSON des pays
fetch('countries.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      onEachFeature: onCountryClick
    }).addTo(map);
  });

// Fonction appelée au clic sur un pays
function onCountryClick(feature, layer) {
  layer.on('click', () => {
    const countryName = feature.properties.ADMIN;
    const encodedName = encodeURIComponent(countryName);

    fetch(`https://restcountries.com/v3.1/name/${encodedName}`)
      .then(res => res.json())
      .then(info => {
        const country = info[0];
        const popupContent = `
          🇺🇳 <strong>${country.name.official}</strong><br>
          🏳️ <img src="${country.flags.svg}" width="50"><br>
          🧑‍⚖️ Chef d’État : ${country.headOfState || 'N/A'}<br>
          👥 Population : ${country.population.toLocaleString()}<br>
          🌍 Superficie : ${country.area.toLocaleString()} km²<br>
          🏛️ Organisations : ONU, UNESCO, OMS (à compléter)<br>
          📍 Capitale : ${country.capital}<br>
          🗣️ Langue(s) : ${Object.values(country.languages).join(', ')}<br>
          💰 Monnaie : ${Object.values(country.currencies)[0].name}<br>
          📈 PIB : (à intégrer via autre API)<br>
          📊 IDH : (à intégrer via autre source)
        `;
        layer.bindPopup(popupContent).openPopup();
      })
      .catch(() => {
        layer.bindPopup('Informations non disponibles pour ce pays.').openPopup();
      });
  });
}
