let headerPhotographe = document.querySelector(".header_photographe")
let htmlHeader = "";

let containerMedia = document.querySelector("#medias_photographe");
let htmlContainerMedia = "";

//implémentation éléments html avec données JSON
htmlHeader += `
<h1 class="nom_photographe"></h1>
<p class="localisation"></p>
<p class="tagline"></p>
<nav>
    <ul>
        <li class="tag_photographe"></li>
        <li></li>
    </ul>
</nav>
<button type="button" class="button_contact">
    Contactez-moi
</button>
<img src="" class="profil_photographe>
`    
htmlContainerMedia += `
<div class="bloc_photo">
    <img src="" class="visuel_media">
    <h2 class="titre_media"></h2>
    <p class="nombre_likes">1</p>
    <i class="fas fa-heart" id="heart"></i>
</div>
`

headerPhotographe.innerHTML = htmlHeader;
containerMedia.innerHTML = htmlContainerMedia;



//je récupère éléments js du DOM
let nomPhotographe = document.querySelector(".nom_photographe");
let localisation = document.querySelector(".localisation");
let tagline = document.querySelector(".tagline");
let tagPhotographe = document.querySelectorAll(".tag_photographe");
let photoProfil = document.querySelector(".profil_photographe");
let visuelMedia = document.querySelector(".visuel_media");
let titreMedia = document.querySelector(".titre_media");
let nombreLikes = document.querySelector(".nombre_likes");


fetch("script.json")
.then(response => response.json())
.then(data => {
    let media = data.media;
    let photographers = data.photographers;
       
})

//Incrémentation likes 
let resultNombreLikes = 0;
let iconHeart = document.querySelector("#heart");
iconHeart.addEventListener("click", e=>{
    resultNombreLikes++;
    nombreLikes.innerHTML = resultNombreLikes;
})

