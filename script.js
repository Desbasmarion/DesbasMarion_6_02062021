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

    //je créer dynamiquement fiches photographes
    let listOfPhotographers ="";

    dataPhotographers.forEach(fiche => 
        listOfPhotographers += `
            <div class = "fiche_photographe">
                <a href ="page_photographe.html" class="lien">
                    <img src = "./Sample_Photos/Photographers ID Photos/${fiche.portrait}" alt =${fiche.name} id =${fiche.name}>
                    <h2>${fiche.name}</h2>
                </a>
                <p class = "localisation">${fiche.city}</p>
                <p>${fiche.tagline}</p>
                <p class = "tarif">${fiche.price}€</p>
                <nav>
                    <ul>
                        <li>${fiche.tags}</li>
                    </ul>
                </nav>
            </div>
        `
    )

    containerFichesPhotograhes.innerHTML = listOfPhotographers;
    
    //je filtre mon nouveau tableau de photographes quand un button est cliqué, avec boucle 
    allButtons.forEach(item => {
        item.addEventListener('click', e => {
            let resultFilter = dataPhotographers.filter(photographe => {
                if( photographe.tags.includes(item.name)){
                    return true;
                }else{
                    return false;
                }
            })

            let listOfPhotographersFilter = "";

            resultFilter.forEach(result => 
                listOfPhotographersFilter += `
                <div class = "fiche_photographe">
                    <a href="page_photographe.html" class="lien">
                        <img src = "./Sample_Photos/Photographers ID Photos/${result.portrait}" alt =${result.name} id =${result.name}>
                        <h2>${result.name}</h2>
                    </a>
                    <p class = "localisation">${result.city}</p>
                    <p>${result.tagline}</p>
                    <p class = "tarif">${result.price}€</p>
                    <nav>
                        <ul>
                            <li>${result.tags}</li>
                        </ul>
                    </nav>
                </div>
                `
            )
            containerFichesPhotograhes.innerHTML = listOfPhotographersFilter;
        })
    })

})

allFichePhotographeIndividuelle.forEach( item => {
    item.addEventListener("click", e => {
        window.location.href = window.location.href + "Mimi_Keel_Page.html"}
        )
})
let lienPhotographe = /* à completer pour injecter la valeur dans innerHTML*/ "";



//////////////////////////////Regarder cours oc js pour le web////////////////////////////
