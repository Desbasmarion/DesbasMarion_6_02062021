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
    
    //Test factory method
    media.forEach( item => {
        function createImage(){
            htmlContainerMedia += `
                <div class="bloc_photo">
                    <img src="../Sample_Photos/${item.photographerId}/${item.image}" class="visuel_media">
                    <h2 class="titre_media">${item.title}</h2>
                    <p class="nombre_likes" data-media='${item.id}'>${item.likes}</p>
                    <i class="fas fa-heart" data-media='${item.id}'></i>
                </div>
            `
        }
            
        function createVideo(){
             htmlContainerMedia += `
                <div class="bloc_photo">
                    <video src="../Sample_Photos/${item.photographerId}/${item.video}" class="visuel_media"></video>
                    <h2 class="titre_media">${item.title}</h2>
                    <p class="nombre_likes" data-media="${item.id}">${item.likes}</p>
                    <i class="fas fa-heart" data-media='${item.id}'></i>
                </div>
            `
        }

        function mediaFactory(){
            if(item.photographerId == paramID && item.image){
                return createImage();
            }else if(item.photographerId == paramID && item.video){
                return createVideo();
            }
        }

        mediaFactory();
    })

    containerMedia.innerHTML = htmlContainerMedia;

    //Incrémentation nombre likes
    let numbersLikes = document.querySelectorAll('.nombre_likes');
    let iconHeart = document.querySelectorAll('.fa-heart');
    let iconHeartData = [];
   
    iconHeart.forEach(icon => {
        icon.addEventListener('click', e => {
            iconHeartData = icon.dataset.media;
            numbersLikes.forEach(number =>{
                if(number.dataset.media == iconHeartData){
                    number.innerHTML++;
                }
            })
        })
    });
    
    

    
    



    // for(i=0; i<iconHeart.length;i++){
    //     iconHeart[i].addEventListener('click', e => {
    //         for(i=0;i<media.length;i++){
    //             for(i=0;i<nombreLikes.length;i++){
    //                 if(media[i].id == nombreLikes[i].dataset.id){
    //                     console.log('ok');
    //                 }
    //             }
    //         }
    //     })
    // }
    
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

//Vérification des champs du formulaire 
buttonSend.addEventListener('click', e => {
    e.preventDefault();

    validateForm(firstName, errorFirst, regexName);
    validateForm(lastName, errorLast, regexName);
    validateForm(email, errorMail, regexEmail);

    if (!firstName.value == "" && !lastName.value == "" && !email.value == "" && regexName.test(firstName.value) == true && regexName.test(lastName.value) == true && regexEmail.test(email.value) == true && !texteareaForm.value == ""){
        console.log(firstName.value, lastName.value, email.value);
        formModal.textContent = "Votre message a bien été envoyé";
        formModal.style.fontSize = "20px";
        formModal.style.color = "white";
    }
});

//Fonction de vérification du formulaire 
function validateForm(firstName, errorFirst, regexName){
    if(firstName.value == ""){
        errorFirst.textContent = "champs obligatoire";
        errorFirst.style.fontStyle = "italic";
    }else if (regexName.test(firstName.value) == false){
        errorFirst.textContent = "syntaxe incorrecte";
        errorFirst.style.fontStyle = "italic";
    }else{
        errorFirst.textContent = "";
        return true;
    }
}











