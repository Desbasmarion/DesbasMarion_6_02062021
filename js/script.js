/*Récupération des tags*/
let containerFichesPhotograhes = document.getElementById('allFichesPhotographers');

let allFichePhotographeIndividuelle = document.querySelectorAll(".fiche_photographe");
let arrayFichePhotographe = Array.from(allFichePhotographeIndividuelle);


//Récupération tableaux JSON 
let tabsJson = fetch("../js/script.json")
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
                        <img src = "../Sample_Photos/Photographers_ID_Photos/${fiche.portrait}" alt =${fiche.name} id =${fiche.name}>
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
    const alltags = document.querySelectorAll(".hashtag");

    let arrayTagsFilter = [];
    let resultFilter = [];

    //pour chaque tags séléctionnés, je renvoie les photographes qui ont les tags correspondant
    alltags.forEach(tag => {
        
        tag.addEventListener('click', e =>{

            //Mise en évidence du tag séléctionné 
            tag.style. backgroundColor = "#901C1C";
            tag.style.color = "white";

            //Je stock le tag séléctionné dans un array + traitement du cas de la désélection 
            if(arrayTagsFilter.indexOf(tag.dataset.tag) === -1){
                arrayTagsFilter.push(tag.dataset.tag)
            }else{
                tag.style. backgroundColor = "white";
                tag.style.color = "#901C1C";
                arrayTagsFilter.pop();
            }
           
            //Je filtre les photographes en fonction des tags séléctionnés 
            resultFilter = dataPhotographers.filter(photographer =>
                arrayTagsFilter.every(tag => photographer.tags.includes(tag))
            );
            
            //J'affiche le résultat du filtre
            containerFichesPhotograhes.innerHTML = "";
            createPhotographer(resultFilter)

            //Si aucun résultat trouvé, le spécifier à l'utilisateur 
            if(resultFilter.length == 0){
                containerFichesPhotograhes.innerHTML = "Aucun résultat trouvé";
            }
        })
        
    });
    
})





