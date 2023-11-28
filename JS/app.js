import { handlePetsData } from './api.js';
import { populateTypeFilter } from './filters.js';
import { listenForPetClick } from './renderPetPage.js';
import { backToHome } from './utils.js';
import Router from './router.js';



async function initApp() {
    try {
      await handlePetsData(); // Wait for the pets data to be rendered
      await populateTypeFilter();
      backToHome();
      Router.init();
    } catch (error) {
      console.error('Error initializing the app:', error);
    }
  }
  

document.addEventListener('DOMContentLoaded', initApp);
