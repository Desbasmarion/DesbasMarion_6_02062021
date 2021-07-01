/*tags
Si un tags selectionné dans le banner est présent dans une fiche photographes, alors afficher toutes les fiches photographes concernées
*/

/*methodo
1- integration html/css
2- accessibilité
3- Js
*/


/*Récupération des tags*/
let tagPortrait = document.querySelector(".button_portrait");
let tagArt = document.querySelector(".button_art");
let tagFashion = document.querySelector(".button_fashion");
let tagArchitecture = document.querySelector(".button_architecture");
let tagTravel = document.querySelector(".button_travel");
let tagSport = document.querySelector(".button_sport");
let tagAnimals = document.querySelector(".button_animals");
let tagEvents = document.querySelector(".button_events");

let allLiNav = document.getElementsByTagName("li");

let allFichePhotographe = document.querySelectorAll(".fiche_photographe");
let arrayFichePhotographe = Array.from(allFichePhotographe);


/*Evenement sur tags + fonction filtre*/
tagPortrait.addEventListener("click", e =>{
    arrayFichePhotographe.filter(filtreTags);
});

let img = document.getElementById("Mimi_Keel")

fetch("script.json")
.then(response => response.json())
.then (data => img.src = data.photographers[0].portrait)

/* 
1- Récupérer toutes les images profils photographes avec js
2- les implémenter via fetch
*/
