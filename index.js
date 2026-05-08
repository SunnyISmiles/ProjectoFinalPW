
function getAllPokemons() {
    let API_URL
    //1025
    for (let i = 1; i<=1025; i++) {
        API_URL = `https://pokeapi.co/api/v2/pokemon/${i}`
        fetch(API_URL)
        .then(resposta => resposta.json())
        .then(function(pokemons) {
            getDataPokemon(pokemons)
        })
    }
}

function getDataPokemon(pokemons) {
    console.log(pokemons.forms[0].name)
    let pokemonName = pokemons.forms[0].name
    let pokemonGIF = pokemons.sprites.other.showdown.front_default
    showPokemonHTML(name,pokemonGIF)
}

function showPokemonHTML(name,pokemonGIF) {
    let body = document.querySelector('body')
    let gif = document.createElement('img')
    body.append(gif)

    gif.src = pokemonGIF
}

getAllPokemons();