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

function addListItem(pokemon) {
  let pokemonList = document.querySelector('.pokemon-list');
  let listPokemon = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add = 'button-pokemon';
  listPokemon.appendChild(button);
  pokemonList.appendChild(listPokemon);
  button.addEventListener('click', function(event) {
      event.preventDefault();
      showDetails(pokemon);
  });
}

function showDetails(pokemon) {
  loadDetails(pokemon).then(function() {
    showModal(pokemon);
  })
} 

function showModal (pokemon) {
 //this below will clear the modal of anythign that was within it//
 modalContainer.innerHTML = ' ';
 
 let modal = document.createElement('div');
 modal.classList.add('modal');

 let closeButton = document.createElement('button');
 closeButton.innerText = 'Close';
 closeButton.classList.add('close-modal');
 closeButton.addEventListener('click', hideModal); 

 let titlePokemon = document.createElement('h1');
 titlePokemon.innerText = pokemon.name;

 let contentPokemon = document.createElement('p');
 contentPokemon.innerText = `height ${pokemon.height}`;

 let imagePokemon = document.createElement('img');
 imagePokemon.src = pokemon.imageUrl;

 modal.appendChild(closeButton);
 modal.appendChild(titlePokemon);
 modal.appendChild(contentPokemon);
 modal.appendChild(imagePokemon);
 modalContainer.appendChild(modal);
 
 modalContainer.classList.add('is-visible');
 
}

function hideModal () {
  modalContainer.classList.remove('is-visible');

}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

modalContainer.addEventListener('click', (e) => {
  let target = e.target;
  if (target === modalContainer) {
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

