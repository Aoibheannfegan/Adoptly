import { fetchIndividualPetData } from "./api.js";

function listenForPetClick() {
    // Attach the event listener to each button individually
    console.log(document.querySelectorAll('.adoptbtn'));
    document.querySelectorAll('.adoptbtn').forEach(button => {
        button.addEventListener('click', function() {
            loadIndividualPet(button.id); // Call loadIndividualPet when clicked
        });
    });
}


async function loadIndividualPet(id) {
    console.log("Adopt button with ID " + id + " clicked");
    document.getElementById('main').classList.add('hidden');
    let petSection = document.getElementById('individual-pet');

    // Clear previous content and show loading message
    petSection.innerHTML = '<h1 id="loading">Loading...</h1>';

    try {
        // Fetch the individual pet data
        const petData = await fetchIndividualPetData(id);
        console.log(petData);

        // Determine the image to display
        let petImg = petData.photos && petData.photos[0] && petData.photos[0].large
                     ? petData.photos[0].large
                     : 'default_puppy.jpeg';
        // Create the pet page content
        let petPage = document.createElement('div');
        petPage.id = "pet-page";
        petPage.innerHTML = `
            <img src="${petImg}" alt="Pet Image" >
            <h1>${petData.name}</h1>
            <p>${petData.description}</p>
            <p>Breed: ${petData.breeds.primary}</p>
            <p>Status: ${petData.status}</p>
        `;

        // Replace the loading message with the pet page content
        petSection.innerHTML = '';
        petSection.appendChild(petPage);

    } catch (error) {
        console.error('Failed to load pet data:', error);
        petSection.innerHTML = '<div id="load-error">Error loading pet details. Please try again later.</div>';
    }
}


export {loadIndividualPet, listenForPetClick};
