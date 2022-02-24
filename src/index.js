console.log('%c HI', 'color: firebrick')

let breeds = [];

document.addEventListener('DOMContentLoaded', function () {
  loadImages();
  loadBreeds();
});

function loadImages() {
  const imageUrl = "https://dog.ceo/api/breeds/image/random/4"
  fetch(imageUrl)
    .then(res=> res.json())
    .then(results => {
      results.message.forEach(image => addImage(image))
    });
}

function addImage(dogPic) {
  let container = document.querySelector('#dog-image-container');
  let img1 = document.createElement('img');
  img1.src = dogPic;
  container.appendChild(img1);
}

function loadBreeds() {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  fetch(breedUrl)
    .then(res => res.json())
    .then(results => {

      breeds = Object.keys(results.message);
      updateBreedList(breeds);
      addBreedListener();
    });
}

function updateBreedList(breeds) {
  let ul = document.querySelector('#dog-breeds');
  removeKid(ul);
  breeds.forEach(breed => addBreed(breed));
}

function removeKid(element) {
  let child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
}

function selectBreeds(letter) {
  updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function updateColor(event) {
    event.target.style.color = 'red';
  }

function addBreedListener() {
  let breedDropdown = document.querySelector('#breed-dropdown');
  breedDropdown.addEventListener('change', function (event) {
    selectBreeds(event.target.value);
  });
}

function addBreed(breed) {
  let ul = document.querySelector('#dog-breeds');
  let li = document.createElement('li');
  li.innerText = breed;
  li.style.cursor = 'pointer';
  ul.appendChild(li);
  li.addEventListener('click', updateColor);
}
