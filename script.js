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

    //je concatène les 2 tableaux pour pouvoir les filtrer 
    let tabPhotographers = dataPhotographers.concat(dataMedia);

    //je créer dynamiquement fiches photographes
    let listOfPhotographers = "";

    //je créer div globale pour chaque fiche photographe avec ses données
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

        //je créer un span pour chaque tags
        let ulTags = document.createElement('ul');
        
        fiche.tags.forEach( tag => {
            let spanTag = document.createElement('span');
            spanTag.classList.add('hashtag');
            spanTag.setAttribute('data-tag', `${tag}`);
            spanTag.innerHTML += `#${tag}`;
            ulTags.append(spanTag);
            listOfPhotographers.append(ulTags);
        })
        containerFichesPhotograhes.append(listOfPhotographers);
    });
    
    //je filtre mon nouveau tableau de photographes quand un button est cliqué, avec boucle 
    
    let allTags = document.getElementsByClassName('hashtag');
    let arrayAllTags = Array.from(allTags);

    function filtre(){
        arrayAllTags.forEach(item => {
            item.addEventListener('click', e => {
                let resultFilter = dataPhotographers.filter(photographe => {
                    if( photographe.tags.includes(item.dataset.tag)){
                        return true;
                    }else{
                        return false;
                    }
                })
                
                containerFichesPhotograhes.innerHTML ="";
                listOfPhotographers.innerHTML ="";

                resultFilter.forEach(result => { 
                    listOfPhotographers = document.createElement('div');
                    listOfPhotographers.classList.add('fiche_photographe');
                    listOfPhotographers.innerHTML += `
                        <a href ="page_photographe.html?id=${result.id}" class="lien">
                            <img src = "./Sample_Photos/Photographers ID Photos/${result.portrait}" alt =${result.name} id =${result.name}>
                            <h2>${result.name}</h2>
                        </a>
                        <p class = "localisation">${result.city}, ${result.country}</p>
                        <p>${result.tagline}</p>
                        <p class = "tarif">${result.price}€</p>
                    `

                    let ulTagsFilter = document.createElement('ul');
        
                    result.tags.forEach( tag => {
                        let spanTag = document.createElement('span');
                        spanTag.classList.add('hashtag');
                        spanTag.setAttribute('data-tag', `${tag}`);
                        spanTag.innerHTML += `#${tag}`;
                        ulTagsFilter.append(spanTag);
                        listOfPhotographers.append(ulTagsFilter);
                    })
                    
                    containerFichesPhotograhes.append(listOfPhotographers);
                })
             })
        })
    }
     
    //j'appelle ma fonction filtre()
    filtre();
    
})
