/*Récupération des tags*/
let containerFichesPhotograhes = document.getElementById('allFichesPhotographers');

let allFichePhotographeIndividuelle = document.querySelectorAll(".fiche_photographe");
let arrayFichePhotographe = Array.from(allFichePhotographeIndividuelle);


//Récupération tableaux JSON 
let tabsJson = fetch ("script.json")
.then((response) => response.json())
.then(data => {
    //je récupère les 2 tableaux 
    let dataPhotographers = data.photographers;
    let dataMedia = data.media;

    //je crée dynamiquement fiches photographes
    let listOfPhotographers = "";

    //je crée div globale pour chaque fiche photographe avec ses données
    function createPhotographer(dataPhotographers){
        dataPhotographers.forEach(fiche =>{
            listOfPhotographers = document.createElement('div');
            listOfPhotographers.classList.add('fiche_photographe');
            listOfPhotographers.innerHTML += `
                    <a href ="page_photographe.html?id=${fiche.id}" class="lien">
                        <img src = "./Sample_Photos/Photographers ID Photos/${fiche.portrait}" alt =${fiche.name} id =${fiche.name}>
                        <h2>${fiche.name}</h2>
                    </a>
                    <p class = "localisation">${fiche.city}, ${fiche.country}</p>
                    <p>${fiche.tagline}</p>
                    <p class = "tarif">${fiche.price}€</p>
            `
    
            //je crée un span pour chaque tags
            let ulTags = document.createElement('ul');
            
            fiche.tags.forEach( tag => {
                let spanTag = document.createElement('span');
                spanTag.classList.add('hashtag');
                spanTag.innerHTML += `#${tag}`;
                ulTags.append(spanTag);
                listOfPhotographers.append(ulTags);
            })
            containerFichesPhotograhes.append(listOfPhotographers);
        });
    }

    //J'appelle ma fonction pour créer les fiches photographes
    createPhotographer(dataPhotographers);
    
    //je filtre mon nouveau tableau de photographes quand un tag est selectionné, avec boucle 
    let allTags = document.getElementsByClassName('hashtag');
    let arrayAllTags = Array.from(allTags);

    let arrayTagsFilter = [];
    let resultFilter = [];
    
    
    
    //pour chaque tags séléctionnés, j'appelle ma fonction filtre
    arrayAllTags.forEach(tag => {
        tag.addEventListener('click', e =>{

            arrayTagsFilter.push(tag.dataset.tag); 

            arrayTagsFilter.forEach(tag => {
                resultFilter = dataPhotographers.filter(photographe => photographe.tags.includes(tag)) 
            })

            containerFichesPhotograhes.innerHTML = "";
            createPhotographer(resultFilter)
        })  
    });  
    
    
})
