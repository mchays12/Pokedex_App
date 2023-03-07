// used IIFE to make code more readable //
let pokemonRepository = (function() {
  let pokemonList = [
    { height: 10,
      name: 'Bulbasaur',
      types:[
        'grass', 
        'poison'
      ]
    },
    { height: 8,
      name: 'Pikachu',
      types:[ 
        'electric' 
      ]
    },
    { height: 5,
      name: 'Mewtwo',
      types:[
        'artificial'
      ]
    }
  ];

//double check to make sure that pokemon being added are added correctly//
function add(pokemon) {
  if (
    typeof pokemon === 'object'&&
    'name' in pokemon
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
  console.log(pokemon.name);
}

function addListItem(pokemon) {
  let pokemonList = document.querySelector('.pokemon-list');
  let listPokemon = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add = 'button-class';
  listPokemon.appendChild(button);
  pokemonList.appendChild(listPokemon);
  button.addEventListener('click', function(showDetails){
  });
}

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  showDetails: showDetails
}

})();

pokemonRepository.add({ name: 'Charmander', height: 12, types: ['fire, fly']});

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
})




/* this is going to display the name of my pokemon, a space, and their height in parenthesis
if the height is greater than 9, it will also display the message, "wow! that's big"*/
/* for (let i=0; i<pokemonList.length; i++) { 
  if (pokemonList[i].height >9){
  document.write("<p>" + pokemonList[i].name + " " + "(height:" + pokemonList[i].height + ")" + " Wow! That's big!" + "</p>")
  }else {
  document.write("<p>" + pokemonList[i].name + " " + "(height:" + pokemonList[i].height + ")" + "</p>");
  }
} */
