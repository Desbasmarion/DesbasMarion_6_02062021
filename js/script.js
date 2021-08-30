let containerFilesPhotograhers = document.getElementById('allFilesPhotographers');

let allFilesPhotographer = document.querySelectorAll(".file_photographer");
let arrayFilePhotographer = Array.from(allFilesPhotographer);


//Recovery JSON data
let tabsJson = fetch("../js/script.json")
.then((response) => response.json())
.then(data => { 
    let dataPhotographers = data.photographers;

    //Dynamics creation of photographers files
    let listOfPhotographers = "";
    const alltags = document.querySelectorAll(".hashtag");
    let arrayTagsFilter = [];
    let resultFilter = [];

    const keyCodes = {
        enter: 13,
        escape: 27,
    };
    
    class Photographers{
        //Creation global div for each photographer file with his data
        createPhotographer(dataPhotographers){
            dataPhotographers.forEach(file =>{
                listOfPhotographers = document.createElement('article');
                listOfPhotographers.classList.add('file_photographer');
                listOfPhotographers.innerHTML += `
                        <a href ="page_photographe.html?id=${file.id}" class="link" aria-label="${file.name} page">
                            <img src = "../Sample_Photos/Photographers_ID_Photos/${file.portrait}" alt =${file.name} id =${file.name}>
                            <h2>${file.name}</h2>
                        </a>
                        <p class = "localisation">${file.city}, ${file.country}</p>
                        <p>${file.tagline}</p>
                        <p class = "rate">${file.price}€</p>
                `

                //Creation span for each tag
                let ulTags = document.createElement('ul');
                file.tags.forEach( tag => {
                    let spanTag = document.createElement('span');
                    spanTag.classList.add('hashtag');
                    spanTag.innerHTML += `#${tag}`;
                    ulTags.append(spanTag);
                    listOfPhotographers.append(ulTags);
                })
                containerFilesPhotograhers.append(listOfPhotographers);
            })
        }

        //Filter new table of photographers when a tag was selected
        filterTags(){
            alltags.forEach(tag => {
                tag.addEventListener('click', e =>{
                    
                    //Layout tag selected 
                    tag.style. backgroundColor = "#901C1C";
                    tag.style.color = "white";

                    //Stock tag selected in an array + Processing case of deselect
                    if(arrayTagsFilter.indexOf(tag.dataset.tag) === -1){
                        arrayTagsFilter.push(tag.dataset.tag)
                    }else{
                        tag.style. backgroundColor = "white";
                        tag.style.color = "#901C1C";
                        arrayTagsFilter.pop();
                    }
                
                    //Filter photographers according to tags selected
                    resultFilter = dataPhotographers.filter(photographer =>
                        arrayTagsFilter.every(tag => photographer.tags.includes(tag))
                    );
                    
                    //Show result of filter
                    containerFilesPhotograhers.innerHTML = "";
                    this.createPhotographer(resultFilter);

                    //If no results found, tell the user
                    if(resultFilter.length == 0){
                        containerFilesPhotograhers.innerHTML = "Aucun résultat trouvé";
                    }
                })

                //Accessibility
                tag.addEventListener('keydown', e => {
                    if(e.which === keyCodes.enter){
                       //Layout tag selected 
                        tag.style. backgroundColor = "#901C1C";
                        tag.style.color = "white";

                        //Stock tag selected in an array + Processing case of deselect
                        if(arrayTagsFilter.indexOf(tag.dataset.tag) === -1){
                            arrayTagsFilter.push(tag.dataset.tag)
                        }else{
                            tag.style. backgroundColor = "white";
                            tag.style.color = "#901C1C";
                            arrayTagsFilter.pop();
                        }
                    
                        //Filter photographers according to tags selected
                        resultFilter = dataPhotographers.filter(photographer =>
                            arrayTagsFilter.every(tag => photographer.tags.includes(tag))
                        );
                        
                        //Show result of filter
                        containerFilesPhotograhers.innerHTML = "";
                        this.createPhotographer(resultFilter);
 
                        //If no results found, tell the user
                        if(resultFilter.length == 0){
                            containerFilesPhotograhers.innerHTML = "Aucun résultat trouvé";
                        }
                    }
                })
                
            });
        }

        //All methods of Photographers object
        methodsPhotographers(){
            this.createPhotographer(dataPhotographers);
            this.filterTags();
        }
    }

    const newPhotographers = new Photographers();
    newPhotographers.methodsPhotographers();
})






