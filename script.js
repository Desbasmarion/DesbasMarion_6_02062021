/*Récupération des tags*/
let buttonPortrait = document.querySelector(".button_portrait");
let buttonArt = document.querySelector(".button_art");
let buttonFashion = document.querySelector(".button_fashion");
let buttonArchitecture = document.querySelector(".button_architecture");
let buttonTravel = document.querySelector(".button_travel");
let buttonSport = document.querySelector(".button_sport");
let buttonAnimals = document.querySelector(".button_animals");
let buttonEvents = document.querySelector(".button_events");
let allButtons = [buttonPortrait, buttonArt, buttonFashion, buttonArchitecture, buttonTravel, buttonSport, buttonAnimals, buttonEvents]

let tagsPortrait = document.querySelectorAll(".tag_portrait");
let tagsArt = document.querySelectorAll(".tag_art");
let tagsFashion = document.querySelectorAll(".tag_fashion");
let tagsArchitecture = document.querySelectorAll(".tag_architecture");
let tagsTravel = document.querySelectorAll(".tag_travel");
let tagsSport = document.querySelectorAll(".tag_sport");
let tagsAnimals = document.querySelectorAll(".tag_animals");
let tagsEvents = document.querySelectorAll(".tag_events");

let allLiNav = document.getElementsByTagName("li");

let containerFichesPhotograhes = document.querySelector("#allFichesPhotographers");

let allFichePhotographeIndividuelle = document.querySelectorAll(".fiche_photographe");
let arrayFichePhotographe = Array.from(allFichePhotographeIndividuelle);


//Récupération tableaux JSON 
let tabsJson = fetch ("script.json")
.then((response) => response.json())
.then(data => {
    //je récupère les 2 tableaux 
    let dataPhotographers = data.photographers;
    let dataMedia = data.media;

    //je concatène les 2 tableaux pour pouvoir les filtrer 
    let tabPhotographers = dataPhotographers.concat(dataMedia);
    
    //je filtre mon nouveau tableau de photographes quand un button est cliqué, avec boucle 
    allButtons.forEach(item => {
        item.addEventListener('click', e => {
            let resultFilter = tabPhotographers.filter(photographe => {
                if( photographe.tags.includes(item.name)){
                    return true;
                }else{
                    return false;
                }
            })
            console.log(resultFilter);
        })
    })
})


/*
//intégration photos des pages photographes
let containerPhotos = document.querySelector("#photosMimi")

fetch("script.json")
.then(response => response.json())
.then (data => {
    let dataMedia = data.media;
    let dataMimi = function(){
        if (dataMedia.photographerId = 243){
            return data
        }
    }

    let imageAddress = data.media.map(img => img.image)
    
    dataMedia.forEach(e=>{
        if (dataMedia.photographerId = 243){  
            let newImages = document.createElement("img");
            newImages.src = "Sample_Photos/Mimi".concat(imageAddress);
            
        }
    })
})
*/