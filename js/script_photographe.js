const headerPhotographer = document.querySelector('.header_photographer');
const main = document.querySelector('#main');
const containerMedia = document.querySelector('#medias_photographer');
let htmlContainerMedia = '';

const paramID = window.location.search.split('=')[1];

fetch('../js/script.json')
	.then(response => response.json())
	.then(data => {

		const media = data.media;
		const photographers = data.photographers;

		const totalLikes = [];
		const pricePerDay = document.createElement('span');

		let htmlHeader = '';

		photographers.forEach(item => {
			if (item.id == paramID){
				modal.ariaLabel = 'contact me ' + item.name;
				namePhotographer.innerHTML += `<br>${item.name}`;

				pricePerDay.innerHTML = item.price + '€/jour';
           
				htmlHeader = document.createElement('section');
				htmlHeader.classList.add('header_photographer');
				htmlHeader.innerHTML += `
                <h1 class="name_photographer">${item.name}</h1>
                <p class="localisation">${item.city}, ${item.country}</p>
                <p class="tagline">${item.tagline}</p>
                <img src="../Sample_Photos/Photographers_ID_Photos/${item.portrait}" class="profil_photographer">
                `;    
            
				const ulTags = document.createElement('ul');

				item.tags.forEach(tag => {
					const spanTag = document.createElement('span');
					spanTag.classList.add('hashtag');
					spanTag.innerHTML += `#${tag}`;
					ulTags.append(spanTag);
					htmlHeader.append(ulTags);
                
				});
				headerPhotographer.remove();
				main.prepend(htmlHeader);
			}
		});
    
   
		/////////////////////////////Factory method - content generation/////////////////////////////
		function createElements(){
			media.forEach( item => {
				function createImage(){
					htmlContainerMedia += `
                    <article class="block_photo">
                        <img src="../Sample_Photos/${item.photographerId}/${item.image}" class="visual_media" alt="${item.title}, close up view"  tabindex="0">
                        <div class="media_infos">
                            <h2 class="title_media">${item.title}</h2>
                            <p class="number_likes" data-media='${item.id}'>${item.likes}</p>
                            <i class="fas fa-heart" data-media='${item.id}' aria-label="likes"></i>
                        </div>
                    </article>
                `;
				}
                
				function createVideo(){
					htmlContainerMedia += `
                    <article class="block_photo">
                        <video src="../Sample_Photos/${item.photographerId}/${item.video}" class="visual_media" alt="${item.title}, close up view" tabindex="0"></video>
                        <div class="media_infos">
                            <h2 class="title_media">${item.title}</h2>
                            <p class="number_likes" data-media="${item.id}">${item.likes}</p>
                            <i class="fas fa-heart" data-media='${item.id}' aria-label="likes"></i>
                        </div>
                    </article>
                `;
				}

				function mediaFactory(){
					if(item.photographerId == paramID && item.image){
						return createImage();
					}else if(item.photographerId == paramID && item.video){
						return createVideo();   
					}
				}

				mediaFactory();
			});
		}
    
		createElements();
		containerMedia.innerHTML = htmlContainerMedia;
    
    
		/////////////////////////////Incrementation number of likes/////////////////////////////

		function incrementationLikes(){
			const numbersLikes = document.querySelectorAll('.number_likes');
			const iconHeart = document.querySelectorAll('.fa-heart');
			const iconHeartData = [];
       
			iconHeart.forEach(icon => {
				icon.addEventListener('click', () => {
					//Push icon click on array + processing in case of click again
					if(iconHeartData.indexOf(icon.dataset.media) === -1){
						iconHeartData.push(icon.dataset.media);
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
					});
				});
			});
		}
		incrementationLikes();
    
   

		/////////////////////////////Lightbox/////////////////////////////

		/**
     * @property {HTMLElement} element
     * @property {string[]} gallery Chemins des images de la lightbox
     * @property {string} url Media actuellement affiché
     */

		class lightbox{
			static init() {
				const links = Array.from(document.querySelectorAll('.visual_media'));

				const gallery = links.map(link => link.getAttribute('src'));
				const altMedias = links.map(link => link.getAttribute('alt'));

				links.forEach(link => {
					link.addEventListener('click', e => {
						e.preventDefault();
						const mediaDescription = e.currentTarget.getAttribute('alt');
						new lightbox(e.currentTarget.getAttribute('src'), gallery, altMedias,mediaDescription);
					});
    
					//Accessibility version
					link.addEventListener('keydown', e => {
						if(e.which === keyCodes.enter){
							e.preventDefault();
							const mediaDescription = e.currentTarget.getAttribute('alt');
							new lightbox(e.currentTarget.getAttribute('src'), gallery, altMedias, mediaDescription);
						}
					});
				});
			}

			/**
         * 
         * @param {string} url media URL
         * @param {string[]} gallery medias paths of lightbox
         */
			constructor(url, gallery, altMedias, mediaDescription){
				this.element = this.buildDOM(url, mediaDescription);
				this.gallery = gallery;
				this.altMedias = altMedias;
            
				document.body.appendChild(this.element);
				this.loadMedia(url,mediaDescription);
				this.onKeyUp = this.onKeyUp.bind(this);
				document.addEventListener('keyup', this.onKeyUp.bind(this));
			}
			/**
         * 
         * @param {string} url media URL
         */
			loadMedia(url, mediaDescription){
				const titleMedia = document.querySelector('.titleMedia');
				titleMedia.innerHTML = mediaDescription.split(',')[0];

				const image = new Image();
				const video = document.createElement('video');
				video.setAttribute('controls', '');
				const container = this.element.querySelector('.mediaContainer');

				container.innerHTML = '';
				this.url = url;
				this.mediaDescription = mediaDescription;
        
				if(url.includes('jpg')){                
					container.appendChild(image);
					image.src = url;
					image.alt = mediaDescription;
				} else if(url.includes('mp4')){
					container.appendChild(video);
					video.src = url;
				}
			}

			/**
         * 
         * @param {KeyboardEvent} e 
         */
			onKeyUp (e){
				if(e.key === 'Escape'){
					this.close(e);
				}else if(e.key === 'ArrowLeft'){
					this.previous(e);
				}else if(e.key === 'ArrowRight'){
					this.next(e);
				}
			}

			/**
         * Close lightbox
         * @param {MouseEvent|KeyboardEvent} e 
         */
			close(e){
				e.preventDefault();
				this.element.parentElement.removeChild(this.element);
				document.removeEventListener('keyup', this.onKeyUp);
			}

			/**
         * Next media
         * @param {MouseEvent|KeyboardEvent} e 
         */
			next(e){
				e.preventDefault();
				let i = this.gallery.findIndex(image => image === this.url);
				let p = this.altMedias.findIndex(media => media === this.mediaDescription);
           
				if(i === this.gallery.length - 1){
					i = -1;
				}
            
				if(p === this.altMedias.length - 1){
					p = -1;
				}

				this.loadMedia(this.gallery[i + 1], this.altMedias[p + 1]);
			}

			/**
         * Previous media
         * @param {MouseEvent|KeyboardEvent} e 
         */
			previous(e){
				e.preventDefault();
				let i = this.gallery.findIndex(image => image === this.url);
				let p = this.altMedias.findIndex(media => media === this.mediaDescription);

				if(i === 0){
					i = this.gallery.length;
				}

				if(p === 0){
					p = this.altMedias.length;
				}

				this.loadMedia(this.gallery[i - 1], this.altMedias[p - 1]);
			}

			/**
         * 
         * @param {string} _url media URL
         * @return {HTMLElement}
         */
			// eslint-disable-next-line no-unused-vars
			buildDOM(url){
				const dom = document.createElement('section');
				dom.classList.add('lightbox');
				dom.ariaLabel = 'image open view';
				dom.innerHTML = `<button type="button" class="closeLightbox" aria-label="Close dialog"></button>
            <button type="button" class="nextMedia"></button>
            <button type="button" class="previousMedia"></button>
            <div class="mediaContainer"></div>
            <span class='titleMedia'></span>
            `;
				dom.querySelector('.closeLightbox').addEventListener('click', this.close.bind(this));
				dom.querySelector('.nextMedia').addEventListener('click', this.next.bind(this));
				dom.querySelector('.previousMedia').addEventListener('click', this.previous.bind(this));
				return dom;
			}
		}

		lightbox.init();

		/////////////////////////////Sorting medias/////////////////////////////
		const select = document.querySelector('select');
		select.value = -1;
		select.ariaLabel = 'Order by';
		let option = '';
    
		select.addEventListener('change', e => {
			option = e.currentTarget.value;
        
			if (option === 'popularite'){
				htmlContainerMedia = '';
				media.sort((a, b) => {
					if(a.likes > b.likes){
						return -1;
					}
				});
				createElements();
				containerMedia.innerHTML = htmlContainerMedia;
				lightbox.init();
				incrementationLikes();
            
			}else if(option === 'date'){
				htmlContainerMedia = '';
				media.sort((a,b) =>{
					if(a.date > b.date){
						return -1;
					}
				});
				createElements();
				containerMedia.innerHTML = htmlContainerMedia;
				lightbox.init();
				incrementationLikes();
        
			}else if(option === 'titre'){
				htmlContainerMedia = '';
				media.sort((a,b) => {
					if(a.title < b.title){
						return -1; 
					}
				});
				createElements();
				containerMedia.innerHTML = htmlContainerMedia;
				lightbox.init();
				incrementationLikes();
			}
		});

		/////////////////////////////Total likes + price per day/////////////////////////////
		const infosPhotographer = document.createElement('aside');
		infosPhotographer.classList.add('infosPhotographer');

		const heart = document.createElement('i');
		heart.innerHTML = '<i class="fas fa-heart" aria-label="likes"></i>';

		media.forEach(media => {
			if(media.photographerId == paramID){
				totalLikes.push( media.likes);
			}
		});

		const reducer = (accumulator, curr) => accumulator + curr;
		const resultTotalLikes = document.createElement('span');
		resultTotalLikes.innerHTML = totalLikes.reduce(reducer);

		const containerLikes = document.createElement('div');
		containerLikes.classList.add('containerLikes');
		containerLikes.append(resultTotalLikes, heart);

		infosPhotographer.appendChild(containerLikes);
		infosPhotographer.appendChild(pricePerDay);
    
		document.body.appendChild(infosPhotographer);

	});
//End of fetch//


/////////////////////////////Features for modal/////////////////////////////

//Elements Form
const formModal = document.querySelector('form');
let namePhotographer = document.querySelector('form > h2');
const buttonContact = document.querySelector('.button_contact');
let modal = document.querySelector('#dialog');
const buttonClose = document.querySelector('.buttonClose');
const buttonSend = document.querySelector('.btnSend');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const texteareaForm = document.querySelector('#message');

//Error Message
const errorFirst = document.querySelector('.errorFirst');
const errorLast = document.querySelector('.errorLast');
const errorMail = document.querySelector('.errorMail');
const errorMessage = document.querySelector('.errorMessage');

//Opening modal
function openModal(){
	buttonContact.addEventListener('click', () => {
		modal.style.display = 'block';
		main.setAttribute('aria-hidden', 'true');
		modal.setAttribute('aria-hidden', 'false');

	});
}
openModal();

//Closing modal
function closeModal(){
	buttonClose.addEventListener('click', () => modal.style.display = 'none');
}
closeModal();


//Accessibility
const keyCodes = {
	enter: 13,
	escape: 27,
};
//Accessibility - Opening modal 
buttonContact.addEventListener('keydown', e => {
	if (e.which === keyCodes.enter) {
		e.preventDefault();
		modal.style.display = 'block';
		main.style.display = 'none';
	}  
});

//Accessibility - Closing modal
buttonClose.addEventListener('keydown', e => {
	if (e.which === keyCodes.escape | e.which === keyCodes.enter) {
		e.preventDefault();
		modal.style.display = 'none';
		main.style.display = 'block';
	}      
});


//Regex
const regexName = /^[a-zA-Z-\s]{2,}$/;
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-_]+$/;

//Verification of form fields 
buttonSend.addEventListener('click', e => {
	e.preventDefault();

	validateForm(firstName, errorFirst, regexName);
	validateForm(lastName, errorLast, regexName);
	validateForm(email, errorMail, regexEmail);

	if(texteareaForm.value == ''){
		errorMessage.textContent = 'Veuillez renseigner votre message';
		errorMessage.style.fontStyle = 'italic';
		errorMessage.setAttribute('aria-invalid', 'true');
		texteareaForm.style.animation = 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both';
		texteareaForm.style.transform = 'translate3d(0, 0, 0)';
	}else{
		errorMessage.textContent = '';
		texteareaForm.style.animation = '';
		texteareaForm.style.transform = '';
	}

	if (!firstName.value == '' && !lastName.value == '' && !email.value == '' && regexName.test(firstName.value) == true && regexName.test(lastName.value) == true && regexEmail.test(email.value) == true && !texteareaForm.value == ''){
		console.log(firstName.value, lastName.value, email.value);
		formModal.textContent = 'Votre message a bien été envoyé';
		formModal.style.fontSize = '20px';
		formModal.style.color = 'white';
	}
});

//Form verification function
function validateForm(firstName, errorFirst, regexName){
	if(firstName.value == ''){
		errorFirst.textContent = 'champs obligatoire';
		errorFirst.style.fontStyle = 'italic';
		errorFirst.setAttribute('aria-invalid', 'true');
		firstName.style.animation = 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both';
		firstName.style.transform = 'translate3d(0, 0, 0)';
	}else if (regexName.test(firstName.value) == false){
		errorFirst.textContent = 'syntaxe incorrecte';
		errorFirst.style.fontStyle = 'italic';
		errorFirst.setAttribute('aria-invalid', 'true');
		firstName.style.animation = 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both';
		firstName.style.transform = 'translate3d(0, 0, 0)';
	}else{
		errorFirst.textContent = '';
		firstName.style.animation = '';
		firstName.style.transform = '';
		return true;
	}
}












