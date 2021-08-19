let headerPhotographer = document.querySelector(".header_photographer")
let main = document.querySelector('#main');


let containerMedia = document.querySelector("#medias_photographer");
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
            htmlHeader.classList.add('header_photographer');
            htmlHeader.innerHTML += `
                <h1 class="name_photographer">${item.name}</h1>
                <p class="localisation">${item.city}, ${item.country}</p>
                <p class="tagline">${item.tagline}</p>
                <img src="../Sample_Photos/Photographers_ID_Photos/${item.portrait}" class="profil_photographer">
                `    
            
            let ulTags = document.createElement('ul');

            item.tags.forEach(tag => {
                let spanTag = document.createElement('span');
                spanTag.classList.add('hashtag');
                spanTag.innerHTML += `#${tag}`;
                ulTags.append(spanTag);
                htmlHeader.append(ulTags);
                
            })
            headerPhotographer.remove();
            main.prepend(htmlHeader);
        }
    })
    
    /////////////////////////////Factory method - content generation/////////////////////////////
    media.forEach( item => {
        function createImage(){
            htmlContainerMedia += `
                <div class="block_photo">
                    <img src="../Sample_Photos/${item.photographerId}/${item.image}" class="visual_media">
                    <h2 class="title_media">${item.title}</h2>
                    <p class="number_likes" data-media='${item.id}'>${item.likes}</p>
                    <i class="fas fa-heart" data-media='${item.id}'></i>
                </div>
            `
        }
            
        function createVideo(){
             htmlContainerMedia += `
                <div class="block_photo">
                    <video src="../Sample_Photos/${item.photographerId}/${item.video}" class="visual_media"></video>
                    <h2 class="title_media">${item.title}</h2>
                    <p class="number_likes" data-media="${item.id}">${item.likes}</p>
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

    /////////////////////////////Incrementation number of likes/////////////////////////////
    let numbersLikes = document.querySelectorAll('.number_likes');
    let iconHeart = document.querySelectorAll('.fa-heart');
    let iconHeartData = [];
   
    iconHeart.forEach(icon => {
        icon.addEventListener('click', e => {
            //Push icon click on array + processing in case of click again
            if(iconHeartData.indexOf(icon.dataset.media) === -1){
                iconHeartData.push(icon.dataset.media)
            }else{
                iconHeartData.pop();
            }
            //Incrementation number of likes click + one-click limitation per medias
            numbersLikes.forEach(number =>{
                if(number.dataset.media == iconHeartData){
                    number.innerHTML++;
                }else if (number.dataset.media == icon.dataset.media){
                    number.innerHTML--;
                }
            })
        })
    });

    /////////////////////////////Lightbox/////////////////////////////

    //Creation + insertion global div in DOM
    let lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    document.body.appendChild(lightbox);
    
    //Creation close button
    let close = document.createElement('button');
    close.classList.add('buttonCloseLightbox');
    close.textContent = 'X';

    //Creation navigation arrows
    let arrowPrevious = document.createElement('img');
    arrowPrevious.classList.add('arrowPrevious');
    arrowPrevious.src = '../images/vector.png'
    let arrowNext = document.createElement('img');
    arrowNext.classList.add('arrowNext');
    arrowNext.src = '../images/vector.png'

    let mediasLightbox = document.querySelectorAll('.visual_media');
    
    //For each medias,to the click, show lightbox version
    mediasLightbox.forEach(media => {
        
        media.addEventListener('click', e => {
            let currentMediaSrc = e.currentTarget.src;
            let arrayMedias = Array.from(mediasLightbox)
            let indexCurrentMedia = arrayMedias.findIndex( i => i === e.currentTarget);

            lightbox.classList.add('active');

            let mediaImage = document.createElement('img');
            let mediaVideo = document.createElement('video');

            mediaImage.src = media.src;
            mediaVideo.src = media.src;

            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild)
            }
            
            if(media.src.includes('jpg')){
                lightbox.appendChild(mediaImage);
                lightbox.appendChild(close);
                lightbox.appendChild(arrowPrevious);
                lightbox.appendChild(arrowNext);
            }else{
                lightbox.appendChild(mediaVideo)
                lightbox.appendChild(close);
                lightbox.appendChild(arrowPrevious);
                lightbox.appendChild(arrowNext);
            }
            
            //Défilement des médias avec les flèches
            // arrowNext.addEventListener('click', e => {
            //     lightbox.removeChild(lightbox.firstChild);
            //     mediaACharger = indexCurrentMedia + 1;
            //     console.log(mediaACharger);
            // })
        })
        ///// IDEE //// 
        // au clic, charger image + 1 
        
        
    })

    

    //Fermeture de lightbox
    close.addEventListener('click', e => {
        lightbox.classList.remove('active')
    })
})
//Fin du fetch//


/////////////////////////////Fonctionnalités pour modale/////////////////////////////

//Elements Form
let formModal = document.querySelector('form')
let buttonContact = document.querySelector('.button_contact');
let modal = document.querySelector('#dialog');
let buttonClose = document.querySelector('.buttonClose');
let buttonSend = document.querySelector('.btnSend');
let firstName = document.querySelector('#firstName');
let lastName = document.querySelector('#lastName');
let email = document.querySelector('#email');
let texteareaForm = document.querySelector('#message');
let arrayFilesForm = [firstName, lastName, email, texteareaForm];

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











