export function renderPets(petsData) {
    const petsContainer = document.getElementById('pets-container');
    petsContainer.innerHTML = ''; // Clear the container before adding new pets
    console.log(petsData)
    petsData.forEach(pet => {
        var petPic = 'Images/default_puppy.jpeg'
        if (pet.photos.length > 0) {
            petPic = pet.photos[0].large;
        }
        const petElement = document.createElement('div');
        petElement.className = 'pet';
      
        petElement.innerHTML = `
            <img src=${petPic} alt="pic of pet" >
            <h2>${pet.name}</h2>
            <p>${pet.breeds.primary}</p>
            <p>${pet.age}  |  ${pet.gender}</p>
            <button id="${pet.id}"><a class="navlink adoptbtn" id="${pet.id}" href="#/pet/${pet.id}">Adopt Me</a></button>
        `
        
        petsContainer.appendChild(petElement);
        });
}