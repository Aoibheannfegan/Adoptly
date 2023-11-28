// Router.js
import { loadIndividualPet } from "./renderPetPage.js";

const Router = {
  init: () => {
    // Listen for hash changes and initial load
    window.addEventListener("hashchange", Router.handleHashChange);
    Router.handleHashChange(); // Handle the initial route
  },
  handleHashChange: () => {
    const path = window.location.hash.slice(1); // Get the path without the hash
    console.log(path)
    Router.go(path);
  },

  go: (path) => {
    console.log(`Going to ${path}`);
    // Clear any previously displayed content
    const mainContent = document.getElementById('main');
    const petContent = document.getElementById('individual-pet');
    
    // Based on the path, hide or show the appropriate content
    if (path === "" || path === "/") {
      // Handle the root route by showing the main content and hiding the pet content
      petContent.innerHTML = '';
      mainContent.classList.remove('hidden');
      
    } else if (path.startsWith("/pet/")) {
   
      mainContent.classList.add('hidden');
      petContent.classList.remove('hidden');
      // Extract the pet ID and load the pet details
      const petId = path.split("/")[2];
      console.log(petId)
      loadIndividualPet(petId);
    } else {
      // Handle 404 or redirect to home by default
      mainContent.classList.remove('hidden');
      petContent.innerHTML = '';
      // Optionally, show a 404 message or redirect to home
      // mainContent.innerHTML = '<h1>404 - Page Not Found</h1>';
    }
  }
}

export default Router;
