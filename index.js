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
        resultados.sort(function(a, b) { return a.id - b.id });
        getDataPokemons(resultados);
        carregarFavoritos("1"); 
    })
    .catch(function(erro) {
        console.log(erro);
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
    btn.dataset.favorito = "false";
    article.append(btn);

    
    btn.addEventListener('click', (e) => {
        let nome = e.target.parentElement.querySelector('.name').textContent;
        let isFavorito = btn.dataset.favorito === "true";

        if (isFavorito){
            removerFavorito("1", nome);
            btn.innerHTML = "&#x2665;&#xfe0f;";
            btn.dataset.favorito = "false";
        } else {
            adicionarFavorito("1", nome);
            btn.innerHTML = "&#127775";
            btn.dataset.favorito = "true";
        }
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
    let searchTerm = event.target.value.trim().toLowerCase();
    
    pokemonArticle.forEach(article=> {
        article.style.display = '';

        if(!article.innerText.toLowerCase().includes(searchTerm)){
            article.style.display = 'none';
        }
    });
}


let DB_URL = "https://projetoipw-836ce-default-rtdb.europe-west1.firebasedatabase.app";

function criarUser(id, name) {
  fetch(`${DB_URL}/username/${id}.json`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if (data === null) {
        fetch(`${DB_URL}/username/${id}.json`, {
          method: "PUT",
          body: JSON.stringify({
            id: id,
            name: name,
            favorites: {}
          })
        });
      }
    });
}


function adicionarFavorito(userId, pokemonName) {
  fetch(`${DB_URL}/username/${userId}/favorites/${pokemonName}.json`, {
    method: "PUT",
    body: JSON.stringify(pokemonName)
  });
}

function removerFavorito(userId, pokemonName) {
    fetch(`${DB_URL}/username/${userId}/favorites/${pokemonName}.json`, {
    method: "DELETE"
    })
}

function carregarFavoritos(userId) {
  fetch(`${DB_URL}/username/${userId}/favorites.json`)
    .then(function(response) {
      return response.json();
    })
    .then(function(favoritos) {
        if (!favoritos) return;

        pokemonArticle.forEach(function(article) {
            let nome = article.querySelector('.name').textContent;
            if (favoritos[nome]) {
                const btn = article.querySelector('.favourites-button');
                btn.innerHTML = "&#127775";
                btn.dataset.favorito = "true";
            }
        });
    });
}

function abrirFavoritos() {
  fetch(`${DB_URL}/username/1/favorites.json`)
    .then(function(r) { return r.json(); })
    .then(function(favoritos) {
      let lista = document.getElementById('lista-favoritos');
      lista.innerHTML = '';

      if (!favoritos) {
        lista.innerHTML = '<li>Nenhum favorito ainda.</li>';
      } else {
        Object.keys(favoritos).forEach(function(nome) {
          let li = document.createElement('li');
          li.textContent = nome;
          lista.append(li);
        });
      }

      document.getElementById('drawer-favoritos').classList.remove('fechado');
      document.getElementById('overlay').classList.add('visivel');
    });
}

function fecharFavoritos() {
  document.getElementById('drawer-favoritos').classList.add('fechado');
  document.getElementById('overlay').classList.remove('visivel');
}
