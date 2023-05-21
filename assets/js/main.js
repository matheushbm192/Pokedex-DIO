//Pega o elemento pai, que vai receber a lista, atraves do ID
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const pokemonPopup = document.getElementById('popup')

const allPokemons = []

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

function gerarDetalhesPokemons(pokemons) { //achar usando some() pelo nome do pokemon
    console.log(pokemons)
    return `
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

        pokemons.forEach(pokemon => {
            allPokemons.push(pokemon)
            //metodo q exclui oq ja existe
        });
    })
        // .then(popups(allPokemons))
        .catch((error) => console.error(error));

}
 
//Requisita mais pokemon
loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordNextPage = offset + limit;

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit);
    }

})

loadPokemonItens(offset, limit)


console.log(allPokemons)

//primeira requisição




// Obtém o elemento pai
//var lista = document.getElementById('lista');

    pokemonList.addEventListener('click', function (event) {
        // Verifica se o elemento clicado é um <li>
        let id = "";
        if (event.target.tagName === 'LI' || event.target.parentElement.tagName === 'LI' || event.target.parentElement.parentElement.tagName === 'LI' || event.target.parentElement.parentElement.parentElement.tagName === 'LI') {
            // Obtém o ID do elemento clicado
            
            elementHtml = event.target.tagName; //pega o nome
            idHtml = event.target.id;
            if (elementHtml === 'LI') {
                if (idHtml === undefined) {
                    id = event.target.parentElement.parentElement.parentElement.id;
                } else {
                    id = event.target.id;
                }  
                console.log(id)
            }else if (elementHtml === "IMG") {
                id = event.target.parentElement.parentElement.id
                console.log(id)
            } else if (elementHtml === 'SPAN') {
                id = event.target.parentElement.id
                console.log(id)
            }  else if (elementHtml === "DIV") {
                id = event.target.parentElement.id
                console.log(id)
            } else {
                console.log(erro)
            }
        }
        function separarPokemon(id, pokemons) {

            return pokemons[id - 1]
        }

        const newPopup = gerarDetalhesPokemons(separarPokemon(id, allPokemons))
        pokemonPopup.innerHTML = newPopup;
        popup.style.display = 'block'


    });

// mexer no convertApiToDetail e deixar dinamico