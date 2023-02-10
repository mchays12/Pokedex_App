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
/* this is going to display the name of my pokemon, a space, and their height in parenthesis
if the height is greater than 9, it will also display the message, "wow! that's big"*/
for (let i=0; i<pokemonList.length; i++) { 
  if (pokemonList[i].height >9){
  document.write("<p>" + pokemonList[i].name + " " + "(height:" + pokemonList[i].height + ")" + " Wow! That's big!" + "</p>")
  }else {
  document.write("<p>" + pokemonList[i].name + " " + "(height:" + pokemonList[i].height + ")" + "</p>");
  }
}