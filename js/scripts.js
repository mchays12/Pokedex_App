// used IIFE to make code more readable //
let pokemonRepository = (function() {
  let pokemonList = []
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/'
/* The loadList function will fetch the data from the API above and then add 
each pokemon to the pokemonList from the add function used earlier*/
  
  let modalContainer = document.querySelector('#modal-container');

//double check to make sure that pokemon being added are added correctly//
 function add(pokemon) {
  if (
    typeof pokemon === 'object' &&
    'name' in pokemon,
    'detailsUrl' in pokemon
  ) {
    pokemonList.push(pokemon);
  }else{
    console.log('Pokemon entry is incorrect');
  } 
}

function getAll () {
  return pokemonList;
}
// creates items for each pokemon and turns them into buttons //
function addListItem(pokemon) {
  let pokemonList = document.querySelector('.pokemon-list');
  let createPokemonListItem = document.createElement('li');
  createPokemonListItem.classList.add('list-group-item');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add('btn-primary');
  button.classList.add('btn-block');
  button.classList.add('button-pokemon');
  button.setAttribute('data-toggle', 'modal');
  button.setAttribute('data-target', '#exampleModal');
  createPokemonListItem.classList.add('col-xl-3');
  createPokemonListItem.classList.add('col-lg-4');
  createPokemonListItem.classList.add('col-md-6');
  createPokemonListItem.classList.add('col-sm-12');
  createPokemonListItem.appendChild(button);
  pokemonList.appendChild(createPokemonListItem);
  button.addEventListener('click', function(event) {
      event.preventDefault();
      showDetails(pokemon);
  });
}

function showDetails(pokemon) {
  loadDetails(pokemon).then(function() {
    showModal(pokemon);
  });
} 

function showModal (pokemon) {

let modalBody = $('.modal-body');
let modalTitle = $('.modal-title');

modalTitle.empty();
modalBody.empty();

let pokemonName = $('<h1>' + pokemon.name + '</h1>');
let pokemonHeight = $('<p>' + 'Height : ' + pokemon.height + '</p>');
let pokemonImage = $('<img class="modal-img" style="width:50%">');
pokemonImage.attr('src', pokemon.imageUrl);


modalTitle.append(pokemonName);
modalBody.append(pokemonHeight);
modalBody.append(pokemonImage);
}

function hideModal () {
  modalContainer.classList.remove('is-visible');

}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

document.querySelector('.pokemon-list').addEventListener('click', () => {
  showModal();
});

function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e) {
      console.error(e);
    });
  }

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  showDetails: showDetails,
  loadList: loadList,
  loadDetails: loadDetails,
  showModal: showModal
}

})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

