
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
    let pokemonNum = pokemons.id
    showPokemonHTML(pokemonName,pokemonGIF,pokemonNum)
}

function showPokemonHTML(name,pokemonGIF,num) {
    let article = document.createElement('article')
    article.setAttribute('class','pokemon')

    let fig = document.createElement('figure')

    let pokemonNum = document.createElement('figcaption')
    pokemonNum.setAttribute('class','num')
    if (num>=1 && num<=9) pokemonNum.textContent="#000"+num
    else if(num>=10 && num<=99) pokemonNum.textContent="#00"+num
    else if(num>=100 && num<=999) pokemonNum.textContent="#0"+num
    else  pokemonNum.textContent="#"+num
   

    let gif = document.createElement('img')
    gif.src = pokemonGIF

    let pokemonName = document.createElement('figcaption')
    pokemonName.setAttribute('class','name')
    pokemonName.textContent = name

    

    gallery.append(article)
    article.append(fig)
    fig.append(pokemonNum)
    fig.append(gif)
    fig.append(pokemonName)
    
}

getAllPokemons();