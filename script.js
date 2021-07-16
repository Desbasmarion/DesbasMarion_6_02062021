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

//Récupération tableaux JSON 
let tabsJson = fetch ("script.json")
.then((response) => response.json())
.then(data => {
    //je récupère les 2 tableaux 
    let dataPhotographers = data.photographers;
    let dataMedia = data.media;

    //je concatène les 2 tableaux pour pouvoir les filtrer 
    let newTabConcat = dataPhotographers.concat(dataMedia);
    
    //je laisse uniquement les tags en contenu 
    let tagsTabConcat = newTabConcat.map(function (tags) {
        return tags.tags
        
      });
    
    //je filtre mon nouveau tableau de tags
    tagsTabConcat.filter(e => {
        for(i=0; i<tagsTabConcat.length; i++){
            if(tagsTabConcat[i] == "art"){
                console.log("ok")
            }else{
                
            }
        }
    })
})












//Ex fonction filtre sur tableau 
/*let tab = [
    {
        "id": 1,
        "age": 12,
        "rue": "la vallée",
    },
    {
        "id": 2,
        "age" : 19,
        "rue" : "le clos",
    },
    {
        "id" : 3,
        "age" : 22,
        "rue" : "brisou",
    },
        
]

let result = tab.filter(function(tab){
    if (tab.age > 18){
        return true
    }
})

//meme fonction mais syntaxe simplifiée
let result = tab.filter (tab => (tab.age > 18))
})
*/


/*intégration images en JS */
//let img = document.getElementById("Mimi_Keel")

/*fetch("script.json")
.then(response => response.json())
.then (data => img.src = data.photographers[0].portrait)
*/


