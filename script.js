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

/*intégration images en JS */
let img = document.getElementById("Mimi_Keel")

/*fetch("script.json")
.then(response => response.json())
.then (data => img.src = data.photographers[0].portrait)
*/
/*fonction filtre*/
tagPortrait.addEventListener("click", e => {
    fetch("script.json")
    .then(response => response.json())
/*Je teste la fonctionnalité sur la première fiche photographe*/
    .then (dataTags => dataTags.photographers.filter(e =>{
        photographers.tags = "portrait";
        console.log(dataTags)
    }))
});


/*Implémenter images pages photographes en JS*/
let photosContainer = document.querySelector(".photos")


fetch("script.json")
.then(response => response.json())
.then (dataPhotos => {
    for(i=0; i<dataPhotos.media.lenght; i++){
        if(media[i].photographerID = "242"){
           let resultImg = document.createElement("img");
            resultImg.src = dataPhotos.media.image;
        }
    }
})

