
let body = document.querySelector('body')
let gallery = document.querySelector('#gallery')

function getAllPokemons() {
    let API_URL
    let promises = []

    //54 Pokémons 
    for (let i = 1; i<=54; i++) {

        
        API_URL = `https://pokeapi.co/api/v2/pokemon/${i}`
        let promise = fetch(API_URL)
        .then(function(response) {
            return response.json()
        })

        promises.push(promise)
        
    }

    Promise.all(promises)
        .then(function(resultados) {
            
            resultados.sort(function(a,b) {
                return a.id - b.id
            })

            getDataPokemons(resultados)
        })
        .catch(function(erro) {
            console.log(erro)
        })
}

function getDataPokemons(resultados) {
    for (const pokemon of resultados) {
        getDataPokemon(pokemon)
    }
}

let pokemonArticle = [];

function getDataPokemon(pokemons) {
    let pokemonName = pokemons.forms[0].name
    pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)
    let pokemonGIF = pokemons.sprites.other.showdown.front_default
    if (pokemonGIF == null) pokemonGIF = pokemons.sprites.front_default
    let pokemonNum = pokemons.id
    showPokemonHTML(pokemonName,pokemonGIF,pokemonNum)
}

function showPokemonHTML(name,pokemonGIF,num) {
    let article = document.createElement('article')
    article.setAttribute('class','pokemon')
    pokemonArticle.push(article)

    let btn = document.createElement("button");
    btn.setAttribute('class', 'favourites-button');
    btn.innerHTML = "&#x2665;&#xfe0f;";
    article.append(btn);

    document.querySelectorAll('button.favourites-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const nome = e.target.parentElement.querySelector('.name').textContent;
            adicionarFavorito("1", nome);
            btn.innerHTML = "&#11088"; +
                if (btn.innerHTML == "&#11088"){
                    removerFavorito("1", nome);
                    btn.innerHTML = "&#x2665;&#xfe0f;";
                }
        })
    })

    let fig = document.createElement('figure')

    let pokemonNum = document.createElement('figcaption')
    pokemonNum.setAttribute('class','num')
    if (num>=1 && num<=9) pokemonNum.textContent="#000"+num
    else if(num>=10 && num<=99) pokemonNum.textContent="#00"+num
    else if(num>=100 && num<=999) pokemonNum.textContent="#0"+num
    else  pokemonNum.textContent="#"+num
   

    let gif = document.createElement('img')
    gif.src = pokemonGIF
    gif.setAttribute('class', 'pokemon-gif'); //faltava isto

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


let input = document.querySelector('input');

function filterByName(event){
    const searchTerm = event.target.value.trim().toLowerCase();
    
    pokemonArticle.forEach(article=> {
        article.style.display = '';

        if(!article.innerText.toLowerCase().includes(searchTerm)){
            article.style.display = 'none';
        }
    });
}


let DB_URL = "https://projetoipw-836ce-default-rtdb.europe-west1.firebasedatabase.app";

function criarUser(id, name) {
  fetch(`${DB_URL}/username/${id}.json`, {
    method: "PUT",
    body: JSON.stringify({
      id: id,
      name: name,
      favorites: {}
    })
  });
}

criarUser("1", "Ash");

function adicionarFavorito(userId, pokemonName) {
  fetch(`${DB_URL}/username/${userId}/favorites/${pokemonName}.json`, {
    method: "PUT",
    body: JSON.stringify(pokemonName)
  });
}

