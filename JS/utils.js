function backToHome() {
  const logo = document.getElementById('logo');
  logo.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default anchor action
    
    // Update the URL hash to the root
    window.location.hash = '/';

    // Clear the individual pet section
    document.getElementById('individual-pet').innerHTML = '';
    document.getElementById('main').classList.remove('hidden');
  });
}

// Ensuring the DOM is fully loaded before attaching event listeners
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', backToHome);
} else {
  backToHome();
}

export { backToHome };
