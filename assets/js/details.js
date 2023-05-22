// const popup = document.getElementById("popup-wrapper");

//fecha a popup quando clicada
pokemonPopup.addEventListener('click', (event) => {
//ponto chave para nao fechar com qualquer clique, so nos lugares especificos atraves de classes
    const classNameOfClickedElement = event.target.classList[0]; 
    const classNames = ['popup-wrapper','popup-close'];
    const shouldClosePopup = classNames.some((className) => 
    className === classNameOfClickedElement);

     // some() perrcorre cada elemento do array e compara com o elemento clicado : retorna bolean
     
    if (shouldClosePopup) {
        pokemonPopup.style.display = 'none' //alterar 
    }
    
   
});