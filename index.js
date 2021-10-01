import 'regenerator-runtime/runtime';
import axios from 'axios';


// Create the Pokemon Card
function makeCard(pokemon) {

    // Create all the necessary elements
    const card = document.createElement('div');
    const leftSide = document.createElement('div');
    const rightSide = document.createElement('div');

    const name = document.createElement('h1');
    const image = document.createElement('img');
    const types = document.createElement('p');
    const movesUL = document.createElement('ol');


    // Add all the classes
    card.classList.add('card');
    

    // "Hydrate" elements
    name.textContent = "hello";
    name.textContent = pokemon.name;
    image.src = pokemon.sprites.front_default;
    const moves = pokemon.moves;

    console.log(moves);

    for (let i = 0; i < moves.length; i++) {
        if (moves[i] instanceof Object) {
            const moveLI = document.createElement('li');
            moveLI.textContent = (moves[i].move.name);
            movesUL.appendChild(moveLI);
        }
    }

    pokemon.types.forEach(type => {
        types.textContent += type.type.name;
    })
    moves.forEach(move => {
        const moveText = document.createElement('li');
        moveText.textContent = move
    })



    // Strutcure the HTML
    card.appendChild(leftSide);
    card.appendChild(rightSide);
    leftSide.appendChild(name);
    leftSide.appendChild(image);
    rightSide.appendChild(types);
    rightSide.appendChild(movesUL)

    return card;
}

// Users may input a name or pokedex number (soon to have types and other searches)
function getPokemon(pokemon) {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
        .then(resp => {
            console.log(resp);
            const newPokemon = makeCard(resp.data);
            document.querySelector('.pokemon-list').appendChild(newPokemon);
        })
        .catch(err => {
            console.log(err)
        });
}

getPokemon("chArizard");