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

function filtreTags(el){
    for(i=0; i<allLiNav.length; i++){

        let textLi = allLiNav[i].innerText;
       
        if(textLi != "#portrait"){
            textLi.style.color = "green";
        };
    }
}


/*function filtreTags(tag){
    for(i=0; i<allFichePhotographe.length; i++){

        let childrenFiche = allFichePhotographe[i].childNodes;
        
        for (let i = 0; i < childrenFiche.length; i++) {

            let childFiche = childrenFiche[i].innerText;
            
        }
    }
}
*/