import { getAccessToken, fetchAnimalTypes, fetchTypeBreeds, fetchFilteredPets } from './api.js'
import { renderPets } from './renderPets.js';
import { listenForPetClick } from './renderPetPage.js';
// import Choices from 'choices.js';
// import 'choices.js/public/assets/styles/choices.min.css'; // Import the CSS for Choices.js


async function populateTypeFilter() {
    const accessToken = await getAccessToken();
    const types = await fetchAnimalTypes(accessToken);
    const typeFilter = document.getElementById("type");
    types.forEach(type => {
        let option = type.name;
        let optionElement = document.createElement('option')
        optionElement.value = option;
        optionElement.textContent = option;
        typeFilter.appendChild(optionElement)
    })
}

async function populateBreedFilter(type) {
    const accessToken = await getAccessToken();
    const breeds = await fetchTypeBreeds(accessToken, type);
    const breedFilter = document.getElementById("breed");
    breedFilter.innerHTML = '';
    const defaultOption = document.createElement('option')
    defaultOption.value = 'all';
    defaultOption.textContent= 'All';
    breedFilter.appendChild(defaultOption);
    breeds.forEach(breed => {
        let option = breed.name;
        let optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        breedFilter.appendChild(optionElement)
    })
}

document.getElementById('type').addEventListener('change', async(event) => {
    const selectedType = event.target.value;
    await populateBreedFilter(selectedType);
})

document.getElementById('filterbtn').addEventListener('click', async(event) => {
    event.preventDefault();

    const typeValue = document.getElementById('type').value;
    const breedValue = document.getElementById('breed').value;
    const ageValue = document.getElementById('age').value;
    const sizeValue = document.getElementById('size').value;
    const genderValue = document.getElementById('gender').value;
    const locationValue = document.getElementById('location').id;
    
    let petsContainer = document.getElementById('pets-container');
    petsContainer.innerHTML = '';
    petsContainer.innerHTML = '<h1 id="loading">Loading...</h1>';
    const filteredPets = await fetchFilteredPets(typeValue, breedValue, ageValue, sizeValue, genderValue, locationValue);
    if(!filteredPets || filteredPets.length == 0) {
        petsContainer.innerHTML = '';
        console.log("No pets found to match these queries")
        let notFound = document.createElement('h1')
        notFound.textContent = "No Pets Found that match these filters. Please Try Another Search or Broaden your search criteria."
        petsContainer.appendChild(notFound);
    } else {
        renderPets(filteredPets);
        listenForPetClick();
    }
})

document.getElementById('resetbtn').addEventListener('click', async(event) => {
    event.preventDefault();

    document.getElementById('type').value = 'all';
    document.getElementById('breed').value = 'all';
    document.getElementById('age').value = 'all';
    document.getElementById('size').value = 'all';
    document.getElementById('gender').value = 'all';
    document.getElementById('location').value = '';
    
    let petsContainer = document.getElementById('pets-container');
    petsContainer.innerHTML = '';
    petsContainer.innerHTML = '<h1 id="loading">Loading...</h1>';
    const resetPets = await fetchFilteredPets('all','all','all','all','all','location');
    renderPets(resetPets);
    listenForPetClick();

})

document.getElementById('filter-icon').addEventListener("click", () => {
    console.log('filter icon clicked')
    let filters = document.getElementById('filters');
    filters.style.display = "grid"
    document.getElementById('filterbtn').addEventListener('click', () => {
        filters.style.display = "none";
    })
    document.getElementById('resetbtn').addEventListener('click', () => {
        filters.style.display = "none";
    })
})

export { populateTypeFilter };
