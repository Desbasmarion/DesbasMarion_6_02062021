let headerPhotographe = document.querySelector(".header_photographe")
let main = document.querySelector('#main');


let containerMedia = document.querySelector("#medias_photographe");
let htmlContainerMedia = "";

let paramID = window.location.search.split("=")[1];

fetch("../js/script.json")
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
                <img src="../Sample_Photos/Photographers_ID_Photos/${item.portrait}" class="profil_photographe">
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
                    <img src="../Sample_Photos/${item.photographerId}/${item.image}" class="visuel_media">
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

//////Fonctionnalités pour modale///////

//Elements Form
let formModal = document.querySelector('form')
let buttonContact = document.querySelector('.button_contact');
let modal = document.querySelector('#dialog');
let buttonClose = document.querySelector('.buttonClose');
let buttonSend = document.querySelector('.btnEnvoi');
let firstName = document.querySelector('#firstName');
let lastName = document.querySelector('#lastName');
let email = document.querySelector('#email');
let texteareaForm = document.querySelector('#message');
let arrayChampsForm = [firstName, lastName, email, texteareaForm];

//Error Message
let errorFirst = document.querySelector('.errorFirst');
let errorLast = document.querySelector('.errorLast');
let errorMail = document.querySelector('.errorMail');
let errorMessage = document.querySelector('.errorMessage');
let arrayErrorMessage = [errorFirst, errorLast, errorMail, errorMessage];


//Ouverture modale
buttonContact.addEventListener('click', e => modal.style.display = "block");

//Fermeture modale
buttonClose.addEventListener('click', e => modal.style.display = "none");

//Regex
const regexName = /^[a-zA-Z-\s]{2,}$/;
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-_]+$/;

//Controle champs de la modale 
buttonSend.addEventListener('click', e => {
    e.preventDefault();
    if(firstName.value == ""){
        errorFirst.textContent = "prénom manquant";
        errorFirst.style.fontStyle = "italic";
    }else if (regexName.test(firstName.value) == false){
        errorFirst.textContent = "syntaxe incorrecte";
        errorFirst.style.fontStyle = "italic";
    }else{
        errorFirst.textContent = "";
    }
    if(lastName.value == ""){
        errorLast.textContent = "nom manquant";
        errorLast.style.fontStyle = "italic";
    }else if (regexName.test(lastName.value) == false){
        errorLast.textContent = "syntaxe incorrecte";
        errorLast.style.fontStyle = "italic";
    }else{
       errorLast.textContent = "";
    }
    if(email.value == ""){
        errorMail.textContent = "adresse mail manquante";
        errorMail.style.fontStyle = "italic";
    }else if (regexEmail.test(email.value) == false){
        errorMail.textContent = "syntaxe incorrecte";
        errorMail.style.fontStyle = "italic";
    }else{
        errorMail.textContent = "";
    }
    if(texteareaForm.value == ""){
        errorMessage.textContent = "Veuillez renseigner votre message";
        errorMessage.style.fontStyle = "italic";
    }else{
        errorMessage.textContent ="";
    }

    if (!firstName.value == "" && !lastName.value == "" && !email.value == "" && regexName.test(firstName.value) == true && regexName.test(lastName.value) == true && regexEmail.test(email.value) == true && !texteareaForm.value == ""){
        formModal.textContent = "Votre message a bien été envoyé";
        formModal.style.fontSize = "20px";
        formModal.style.color = "white";
    }
});



//ESSAI BOUCLE VERIFICATION CHAMPS
//arrayChampsForm.forEach(item =>{
    //     if (item.value == ""){
    //         arrayErrorMessage.forEach(error => error.innerHTML = item.id + " manquant")
    //             //ERREUR > Ne retiens que id de message, dernier element vérifié         
    //     } else if(regexName.test(item.value) == false){
    //         arrayErrorMessage.forEach(error => error.innerHTML = "syntaxe incorrecte");
    //     } else{
    //        formModal.textContent = "OK";
    //        return true
    //     }
    // })
    
    
  

/////////Trouver solution pour ne pas répéter code et faire pareil pour autres champs////
    




