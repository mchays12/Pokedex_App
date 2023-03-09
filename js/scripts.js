// used IIFE to make code more readable //
let pokemonRepository = (function() {
  let pokemonList = []
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/'
/* The loadList function will fetch the data from the API above and then add 
each pokemon to the pokemonList from the add function used earlier*/
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

//double check to make sure that pokemon being added are added correctly//
function add(pokemon) {
  if (
    typeof pokemon === 'object'&&
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

function showDetails(pokemon) {
  loadDetails(pokemon).then(function() {
    console.log(pokemon);
  })
}

function addListItem(pokemon) {
  let pokemonList = document.querySelector('.pokemon-list');
  let listPokemon = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add = 'button-class';
  listPokemon.appendChild(button);
  pokemonList.appendChild(listPokemon);
  button.addEventListener('click', function(event) {
      event.preventDefault();
      showDetails(pokemon);
  });
}

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  showDetails: showDetails,
  loadList: loadList,
  loadDetails: loadDetails
}

})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});




/* this is going to display the name of my pokemon, a space, and their height in parenthesis
if the height is greater than 9, it will also display the message, "wow! that's big"*/
/* for (let i=0; i<pokemonList.length; i++) { 
  if (pokemonList[i].height >9){
  document.write("<p>" + pokemonList[i].name + " " + "(height:" + pokemonList[i].height + ")" + " Wow! That's big!" + "</p>")
  }else {
  document.write("<p>" + pokemonList[i].name + " " + "(height:" + pokemonList[i].height + ")" + "</p>");
  }
} */
