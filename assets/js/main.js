//Pega o elemento pai, que vai receber a lista, atraves do ID
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 300;
const limit = 10;
let offset = 0;

//molde do html
function convertPokemonToLi(pokemon) {
    return ` <li class="pokemon ${pokemon.type}">
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

/*
pega o resultado da API já em Json, percorre o array retornando cada elemento.
Converte no elemento HTML atraves da funçao 'convertPokemonToLi' e retorna em forma de string atraves do Join
depois incrementa ao HTML
*/
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
       const newHtml = pokemons.map(convertPokemonToLi).join('')
       pokemonList.innerHTML += newHtml
    })
    .catch((error) => console.error(error));
} 

//primeira requisição
loadPokemonItens(offset, limit);
 

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
