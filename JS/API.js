import { config } from './config.js';
import { renderPets } from './renderPets.js';

// Function to fetch the access token
async function getAccessToken() {
  const response = await fetch(config.tokenUrl, {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: config.clientId,
      client_secret: config.clientSecret
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  const data = await response.json();
  return data.access_token;
}

// Function to fetch pets data using the access token
async function fetchPetsData(accessToken) {
  const response = await fetch(`${config.apiUrl}/animals`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const data = await response.json();
  return data.animals; 
}

function handlePetsData() {
  const cacheKey = 'petsData';
  const cacheExpiryKey = 'petsDataExpiry';
  const cacheTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  // Check if we have cached data and it hasn't expired
  const cachedData = localStorage.getItem(cacheKey);
  const expiry = localStorage.getItem(cacheExpiryKey);
  const now = new Date().getTime();

  if (cachedData && expiry && now < expiry) {
    // Use the cached data
    const petsData = JSON.parse(cachedData);
    renderPets(petsData);
  } else {
    // No valid cache, fetch the data again
    getAccessToken()
      .then(fetchPetsData)
      .then(petsData => {
        // Cache the fetched data
        localStorage.setItem(cacheKey, JSON.stringify(petsData));
        localStorage.setItem(cacheExpiryKey, (now + cacheTime).toString());
        
        // Render the fetched data
        renderPets(petsData);
      })
      .catch(error => {
        console.error(error);
        // Handle errors, possibly by showing a message to the user
      });
  }
}

async function fetchAnimalTypes(accessToken) {
  const response = await fetch(`${config.apiUrl}/types`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const data = await response.json();
  return data.types;
}

async function fetchTypeBreeds(accessToken, type) {
  const response = await fetch(`${config.apiUrl}/types/${type}/breeds`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const data = await response.json();
  return data.breeds;
}

async function fetchFilteredPets(type, breed, age, size, gender, location) {
  const accessToken = await getAccessToken();
  let url = `${config.apiUrl}/animals?`;
  if(type !== 'all') {
    url += `type=${type}&`;
  }
  if(breed !== 'all') {
    url += `breed=${breed}&`;
  }
  if(age !== 'all') {
    url += `age=${age}&`;
  }
  if(size !== 'all') {
    url += `size=${size}&`;
  }
  if(gender !== 'all') {
    url += `gender=${gender}&`;
  }
  if(location !== 'location') {
    url += `location=${location}&`;
  }
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const data = await response.json();
  return data.animals;
}

const petDataCache = {};

async function fetchIndividualPetData(id) {
  // check if the data for this pet is already in the cache
  if (petDataCache[id]) {
      return petDataCache[id]; // Return the cached data
  }

  // If not in the cache, fetch it from the API
  const accessToken = await getAccessToken();
  const response = await fetch(`${config.apiUrl}/animals/${id}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  // Store the fetched data in the cache before returning it
  petDataCache[id] = data.animal;

  return data.animal;
}

export {handlePetsData, getAccessToken, fetchAnimalTypes, fetchTypeBreeds, fetchFilteredPets, fetchIndividualPetData};