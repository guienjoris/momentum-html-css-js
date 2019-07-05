
const monTitre = document.getElementById('Heure');
const monIcone = document.getElementById('icone');
const maTemperature = document.getElementById('temperature');
const monLieu = document.getElementById('lieu');
const monNom = document.getElementById('nom');
const monInput = document.getElementById('inputToDo');
const mesToDo = document.getElementById('maToDoList');
const monContenu = document.getElementById('contenu');
let monStorage = localStorage.getItem('monNom');
let quote = document.getElementById('quote');
let citation= ["Il y a 10 types de personnes dans le monde : celles qui comprennent le binaire, et celles qui ne le comprennent pas.",
"Microsoft : « Vous avez des questions ? Nous avons des trombones qui dansent. »",
"Si vous ne réussissez pas du premier coup, appelez ça « version 1.0 ».",
"La programmation aujourd’hui est une course entre les développeurs tâchant de concevoir des programmes <br> de plus en plus nombreux et efficaces, convenant même aux imbéciles, et l’univers essayant de produire <br>des idiots de plus en plus nombreux et efficaces.<br> Jusqu’à présent, c’est l’univers qui gagne.",
"J’adorerais changer le monde, mais ils ne veulent pas me fournir le code source."];

let maDate = new Date;
let monHeure = maDate.getHours() + "<span> : </span>" + maDate.getMinutes() +"<span> : </span>" + maDate.getSeconds();
if (maDate.getMinutes() <10) {
    monHeure = maDate.getHours() + "<span> : 0 </span>" + maDate.getMinutes() +"<span> : </span>" + maDate.getSeconds();
}
if (maDate.getSeconds() <10) {
    monHeure = maDate.getHours() + "<span> : </span>" + maDate.getMinutes() +"<span> : 0 </span>" + maDate.getSeconds();
}
monContenu.style.backgroundImage = `url(./images/${maDate.getHours()}.jpg)`;

//Fonction temps réel
setInterval(() => {
    let maDate = new Date;

    let monHeure = maDate.getHours() + "<span> : </span>" + maDate.getMinutes() +"<span> : </span>" + maDate.getSeconds();
    if (maDate.getMinutes() <10) {
        monHeure = maDate.getHours() + "<span> : 0 </span>" + maDate.getMinutes() +"<span> : </span>" + maDate.getSeconds();
    }
    if (maDate.getSeconds() <10) {
        monHeure = maDate.getHours() + "<span> : </span>" + maDate.getMinutes() +"<span> : 0 </span>" + maDate.getSeconds();
    }

    // Affichage de l'heure
    monTitre.innerHTML = monHeure;

    //Image en fonction de l'heure
    console.log(maDate.getHours());
    console.log(monContenu);

}, 1000);


// récupération du nom
window.onload = () => { 
    monContenu.style.backgroundImage = `url(./images/${maDate.getHours()}.jpg)`;
    monTitre.innerHTML = monHeure;
    let number= Math.random();
    if (number < 0.20){
        quote.innerHTML = citation[0];
    }
    else if (number < 0.40 && number > 0.20){
        quote.innerHTML = citation[1];
    }
    else if (number < 0.60 && number > 0.40){
        quote.innerHTML = citation[2];
    }
    else if (number < 0.80 && number > 0.60){
        quote.innerHTML = citation[3];
    }
    else{
        quote.innerHTML = citation[4];
    }
    console.log(citation[0]);

    if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(maPosition);
    console.log(maPosition);
} 

// local storage
monNom.addEventListener('change', () => {
    localStorage.setItem('monNom', monNom.value);
    monStorage = localStorage.getItem('monNom');
    console.log(monStorage);
})

//récupération de l'api météo
fetch(`https://api.apixu.com/v1/current.json?key=25aff8fbdd17436eb17103421192305&q=Paris&lang=fr`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        maTemperature.textContent = data.current.temp_c + "°C";
        monLieu.textContent = "Localisation: " + data.location.name;
        monIcone.setAttribute('src', data.current.condition.icon);
    })

// 
    
const todoStock =[];

//TaskList
    monInput.addEventListener('change', () => {
    let newTask = document.createElement('li');
    let innerTask = document.createElement('label');
    let btnTask = document.createElement('input');
    let deleteBtn = document.createElement('button');
    
        
    mesToDo.appendChild(newTask); //Nouvelle Li
    newTask.appendChild(btnTask); //Ajout du label
    newTask.appendChild(innerTask); //Ajout de la checkbox
    newTask.appendChild(deleteBtn); //Ajout du X
    deleteBtn.innerHTML = "X";

    //attribut de la checkbox
    btnTask.setAttribute('type', 'checkbox');
    btnTask.setAttribute('name', 'maValeur');

    //attributs du label
    innerTask.setAttribute('for', 'maValeur');
    innerTask.innerHTML = monInput.value;

    todoStock.push( monInput.value);
    localStorage.setItem('todo', JSON.stringify(todoStock));
    monInput.value="";   
    
    //strike checkbox
    btnTask.addEventListener('click', () => {
        if (!btnTask.checked) {
            innerTask.style.textDecoration = 'none';
        }else{
            innerTask.style.textDecoration = 'line-through';
        }

    })
    //suppression task
    deleteBtn.addEventListener('click', () => {
        mesToDo.removeChild(newTask);
    })

    
})


