// get favourites heros id from local storage and store in an array
// stores the charcter id
// var list = JSON.parse(localStorage.getItem("favourites"));

// console.log(arr,"array");
let list = [];
list = JSON.parse(localStorage.getItem('favourites'));
var favouritebarList = document.getElementById("inner-container");

if(list.length == 0 ){
    favouritebarList.innerHTML = `<h1 style ="color :white; font-size:1.5rem ">No Supers Hero Added Yet!</h1>`;
}


// function for remove hero from favourites, update localstorage and reload page
function removeHero(id) {
    var index=list.indexOf(id);
    // console.log(index);
    list.splice(index,1);
    // console.log(list);
    localStorage.setItem("favourites",JSON.stringify(list));
    alert("your hero remove successfulled");
    fetching(list);
}





// to fetch the  updated list 
function fetching(list) {

    for (var i = 0; i <= list.length; i++) {
        loadhero(list[i]);
    }
}


// loading data of  hero function
async function loadhero(heroid) {

    const URL = "https://www.superheroapi.com/api.php/1385721125518961/" + heroid;
    // console.log(URL);
    const res = await fetch(`${URL}`);
    const data = await res.json();
    if (data){
        herolistdis(data);
    } 
}

// to display the data of the movie
function herolistdis(hero) {

    let herolistitem = document.createElement('div');
    herolistitem.innerHTML = "";
    herolistitem.innerHTML = `
        <div class="superhero-container">
            <div class="image-container">
                <img src = "${hero.image.url}">
            </div> 
            <div class="sh-name">
                <span>${hero.name}</span> <span id="minus"  onclick="removeHero(this.value)" value=${hero.id}>&#8722;</span> 
            </div>            
        </div>
       
        `;
    favouritebarList.appendChild(herolistitem);
}




fetching(list);