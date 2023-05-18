const popup = document.getElementById("popup");
// async function lista() {
 
// for (let i = 0; i < pokemonElements.length; i++) {
//     const pokemonElement = pokemonElements[i];
//     const pokemonId = pokemonElement.id;
// console.log(pokemonId)
// console.log(pokemonElement)
//     pokemonElement.addEventListener('click', () => {
        
//     })

// }
// }

// lista()

// console.log(pokemonElements)
// const pokemonElementsArray = Array.from(pokemonElements);
// pokemonElementsArray.map((element) => {
//     console.log(element)
// });

//aparece a popup
// li.addEventListener('click', () => popup.style.display = 'block')
// addEventListener("click", () => popup.style.display = 'block');

//fecha a popup quando clicada
popup.addEventListener('click', (event) => {
//ponto chave para nao fechar com qualquer clique, so nos lugares especificos atraves de classes
    const classNameOfClickedElement = event.target.classList[0]; 
    const classNames = ['popup-wrapper','popup-close'];
    const shouldClosePopup = classNames.some((className) => 
    className === classNameOfClickedElement);

     // some() perrcorre cada elemento do array e compara com o elemento clicado : retorna bolean
     
    if (shouldClosePopup) {
        popup.style.display = 'none' //alterar 
    }
    
   
});