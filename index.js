
let body = document.querySelector('body')
let gallery = document.querySelector('#gallery')

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
    if (pokemonGIF == null) pokemonGIF = pokemons.sprites.front_default
    showPokemonHTML(pokemonName,pokemonGIF)
}

function showPokemonHTML(name,pokemonGIF) {
    let article = document.createElement('article')
    article.setAttribute('class','pokemon')

    let fig = document.createElement('figure')

    let gif = document.createElement('img')
    gif.src = pokemonGIF

    let figcaption = document.createElement('figcaption')
    figcaption.textContent = name

    gallery.append(article)
    article.append(fig)
    fig.append(gif)
    fig.append(figcaption)
}

getAllPokemons();