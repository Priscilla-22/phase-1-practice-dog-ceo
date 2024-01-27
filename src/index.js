console.log('%c HI', 'color: firebrick');

//fetches and displays images
function fetchAndDisplayImages() {
  const imgUrl = 'https://dog.ceo/api/breeds/image/random/4';
  const imageContainer = document.getElementById('dog-image-container');

  fetch(imgUrl)
    .then((response) => response.json())
    .then((data) => {
      const dogImages = data.message;
      dogImages.forEach((imgUrl) => {
        const imgElement = document.createElement('img');
        imgElement.src = imgUrl;
        imgElement.alt = 'Dog Image';
        imageContainer.appendChild(imgElement);
      });
    })
    .catch((error) => {
      console.error('Error fetching dog images:', error);
    });
}

//fetches and displays breeds
function fetchAndDisplayBreeds() {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all';
  const breedList = document.getElementById('dog-breeds');

  fetch(breedUrl)
    .then((response) => response.json())
    .then((data) => {
      const breeds = Object.keys(data.message);

      breeds.forEach((breed) => {
        const listItem = document.createElement('li');
        listItem.textContent = breed;
        breedList.appendChild(listItem);

        listItem.addEventListener('click', function () {
          listItem.style.color = 'blue';
        });
      });
    })
    .catch((error) => {
      console.error('Error fetching breeds:', error);
    });
}

const selectedBreed = document.getElementById('breed-dropdown');
selectedBreed.addEventListener('change', filterBreeds);

//filters breeds using selected letters
function filterBreeds() {
  const selectedLetter = selectedBreed.value.toLowerCase();
  const breedList = document.getElementById('dog-breeds');

  while (breedList.firstChild) {
    breedList.removeChild(breedList.firstChild);
  }

  fetch('https://dog.ceo/api/breeds/list/all')
    .then((response) => response.json())
    .then((data) => {
      const breeds = Object.keys(data.message);

      breeds
        .filter((breed) => breed.startsWith(selectedLetter))
        .forEach((filteredBreed) => {
          const liElement = document.createElement('li');
          liElement.textContent = filteredBreed;
          breedList.appendChild(liElement);

          liElement.addEventListener('click', function () {
            liElement.style.color = 'blue';
          });
        });
    })
    .catch((error) => {
      console.error('Error fetching breeds:', error);
    });
  breedList.style.display = 'list-item';
}

document.addEventListener('DOMContentLoaded', () => {
  fetchAndDisplayImages();
  fetchAndDisplayBreeds();
});
