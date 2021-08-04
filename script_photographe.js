let headerPhotographe = document.querySelector(".header_photographe")
let main = document.querySelector('#main');


let containerMedia = document.querySelector("#medias_photographe");
let htmlContainerMedia = "";

let paramID = window.location.search.split("=")[1];

fetch("script.json")
.then(response => response.json())
.then(data => {

    let media = data.media;
    let photographers = data.photographers;

    let htmlHeader = "";

    photographers.forEach(item => {
        if (item.id == paramID){
            htmlHeader = document.createElement('section');
            htmlHeader.classList.add('header_photographe');
            htmlHeader.innerHTML += `
                <h1 class="nom_photographe">${item.name}</h1>
                <p class="localisation">${item.city}, ${item.country}</p>
                <p class="tagline">${item.tagline}</p>
                <img src="./Sample_Photos/Photographers ID Photos/${item.portrait}" class="profil_photographe">
                `    
                
            let ulTags = document.createElement('ul');

            item.tags.forEach(tag => {
                let spanTag = document.createElement('span');
                spanTag.classList.add('hashtag');
                spanTag.innerHTML += `#${tag}`;
                ulTags.append(spanTag);
                htmlHeader.append(ulTags);
                
            })
            headerPhotographe.remove();
            main.prepend(htmlHeader);
        }
    })
    
    media.forEach( item => {
        if(item.photographerId == paramID){
            htmlContainerMedia += `
                <div class="bloc_photo">
                    <img src="./Sample_Photos/${item.photographerId}/${item.image}" class="visuel_media">
                    <h2 class="titre_media">${item.title}</h2>
                    <p class="nombre_likes">${item.likes}</p>
                    <i class="fas fa-heart"></i>
                </div>
            `
        }
    })

    containerMedia.innerHTML = htmlContainerMedia;

    //je récupère éléments js du DOM
    let nomPhotographe = document.querySelectorAll(".nom_photographe");
    let localisation = document.querySelectorAll(".localisation");
    let tagline = document.querySelectorAll(".tagline");
    let tagPhotographe = document.querySelectorAll(".tag_photographe");
    let photoProfil = document.querySelectorAll(".profil_photographe");
    let visuelMedia = document.querySelectorAll(".visuel_media");
    let titreMedia = document.querySelectorAll(".titre_media");
    let nombreLikes = document.querySelectorAll(".nombre_likes");
    let iconHeart = document.querySelectorAll('.fa-heart');

    /*fonction incrementation
    //Incrémentation likes 
    nombreLikes.forEach(item => {
        iconHeart.forEach(icon => {
            icon.addEventListener('click', e => {
                let resultLikes = 0;
                resultLikes++;
                item.innerHTML = resultLikes;
            })
        })

    })
    */
})

//Fonctionnalités pour modale 
let buttonContact = document.querySelector('.button_contact');
let modal = document.querySelector('#dialog');
let buttonClose = document.querySelector('.buttonClose');

//Ouverture modale
buttonContact.addEventListener('click', e => modal.style.display = "block");

//Fermeture modale
buttonClose.addEventListener('click', e => modal.style.display = "none");



