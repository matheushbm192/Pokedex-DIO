//Pega o elemento pai, que vai receber a lista, atraves do ID
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const pokemonPopup = document.getElementById('popup')

const maxRecords = 300;
const limit = 10;
let offset = 0;

//molde do html
function convertPokemonToLi(pokemon) {
    return ` <li id="${pokemon.number}" class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span> 
        <span class="name">${pokemon.name}</span>
    
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
   
    </li>`
}

function gerarDetalhesPokemons (id, pokemons) { //achar usando some() pelo nome do pokemon
    return`
    <div class="popup-close">x</div>
    <div class="popup-content">
        <div class="header-popup">
            <span class="name">Bulbasauro</span>
            <span class="number">#000</span>
        </div>
        <div class="types-popup">
            <ol class="types">
                <li class="type">grass</li>
                <li class="type">fire</li>
            </ol>
        </div>

        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
            alt="bulbasauro">
    </div>
    <div class="white-part">

        <span>Base Stats</span>
        <ol class="status">
            <li>
                <span>HP</span>
                <span>00</span>
            </li>
            <li>
                <span>Attack</span>
                <span>00</span>
            </li>
            <li>
                <span>Defense</span>
                <span>00</span>
            </li>
            <li>
                <span>Special-attack</span>
                <span>00</span>
            </li>
            <li>
                <span>Special-Defense</span>
                <span>00</span>
            </li>
            <li>
                <span>Speed</span>
                <span>00</span>
            </li>
            <li>
                <span>Total</span>
                <span>00</span>
            </li>
        </ol>
        <div class="fluxo">
            <button id="loadPrevious" class="">Antes</button>
            <button id="loadNext">Depois</button>
        </div>
    </div>
    `
}


//atribui a lista de pokemons ao HTML
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
       const newHtml = pokemons.map(convertPokemonToLi).join('')
       pokemonList.innerHTML += newHtml
       //lista(pokemons)
    //    const newPopup = pokemons.map(gerarDetalhesPokemons).join('')
    //    console.log(newPopup)
    //    pokemonPopup.innerHTML += newPopup
        popups(pokemons)
    })
    .catch((error) => console.error(error));
} 

//pega os li e atribuem a função de clique neles para exibir o popup
function lista(pokemons) {
    const pokemonElements = document.getElementsByClassName('pokemon');

    for (let i = 0; i < pokemonElements.length; i++) {
        const element = pokemonElements[i];
    
        element.addEventListener('click', () =>  popup.style.display = 'block')
        console.log(element)
}}

//Requisita mais pokemon
loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordNextPage = offset + limit;

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else {
        loadPokemonItens(offset, limit);
    }
    
})

function executar(offset, limit) {
  return  loadPokemonItens(offset, limit)
    

}
//primeira requisição
executar(offset, limit);



// Obtém o elemento pai
//var lista = document.getElementById('lista');
function popups(pokemons) {
    pokemonList.addEventListener('click', function(event) {
        // Verifica se o elemento clicado é um <li>
        if (event.target.tagName === 'LI' ||  event.target.parentElement.tagName === 'LI' || event.target.parentElement.parentElement.tagName === 'LI' || event.target.parentElement.parentElement.parentElement.tagName === 'LI') {
          // Obtém o ID do elemento clicado
          let id = "";
          elementHtml = event.target.tagName;
      
          if (elementHtml === 'LI') {
              id = event.target.id === undefined ?
                  event.target.parentElement.parentElement.parentElement.id : event.target.id;
              console.log(id)
      
          } else if (elementHtml === 'SPAN') {
              id = event.target.parentElement.id
              console.log(id)
          } else if (elementHtml === "IMG") {
              id = event.target.parentElement.parentElement.id
              console.log(id)
          } else if (elementHtml === "DIV") {
              id = event.target.parentElement.id
              console.log(id)
          }
      
      
         const newPopup =  gerarDetalhesPokemons(id,pokemons)
         pokemonPopup.innerHTML = newPopup;
         popup.style.display = 'block'
        
        }
      });
}
