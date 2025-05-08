function onLanguagesClick(event) {
    modal.classList.remove('hidden');
    modal.classList.add('modal');
}

function onCloseLanguagesClick(event) {
    modal.classList.remove('modal');
    modal.classList.add('hidden');
}

function onNegClick(event) {
    modal2.classList.toggle('hidden');
}

function exitClick(event) {
    if (!modal2.contains(event.target) && !negbutton.contains(event.target)) {
        modal2.classList.add('hidden');
    }
}

function onHomeClick(event){
    const shop = document.querySelector('#shop-view');
    shop.classList.add('hidden');
    const shop2 = document.querySelector('#shop-view2');
    shop2.classList.remove('hidden');
}

function onJson(json) {
    console.log('JSON ricevuto');
    // Svuotiamo la libreria
    const shop = document.querySelector('#shop-view');
    shop.classList.remove('hidden');
    const shop2 = document.querySelector('#shop-view2');
    shop2.classList.add('hidden');
    shop.innerHTML = '';
    for(i=0; i < json.length; i++) {
      // Leggi il documento
      const doc = json[i];
      // Leggiamo info
      if(doc.title.toLowerCase().includes(inputtext.toLowerCase()) || doc.description.toLowerCase().includes(inputtext.toLowerCase())
         || doc.category.toLowerCase().includes(inputtext.toLowerCase())) {
      // Costruiamo l'URL della copertina
      console.log(doc.title);
      const cover_url = doc.image;
      // Creiamo il div che conterrà immagine e didascalia
      const prod = document.createElement('section');
      prod.classList.add('prod');
      // Creiamo l'immagine
      const img = document.createElement('img');
      img.src = cover_url;
      // Creiamo la didascalia
      const caption = document.createElement('span');
      caption.textContent = doc.title;
      const boxfoto = document.createElement('div');
      // Aggiungiamo immagine e didascalia al div
      boxfoto.appendChild(img);
      prod.appendChild(boxfoto);
      prod.appendChild(caption);
      // Aggiungiamo il div alla libreria
      shop.appendChild(prod);
      }
    }
  }
  
  function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }
  
  function search(event)
  {
    console.log('Eseguo ricerca');
    // Impedisci il submit del form

    event.preventDefault();
    // Leggi valore del campo di testo
    const prod_input = document.querySelector('#casella');
    const prod_value = encodeURIComponent(prod_input.value);
    console.log('Eseguo ricerca: ' + prod_value);
    inputtext = prod_value;
    // Prepara la richiesta
    rest_url = 'https://api.allorigins.win/raw?url=http://fakestoreapi.com/products/';
    console.log('URL: ' + rest_url);
    // Esegui fetch
    fetch(rest_url).then(onResponse).then(onJson);
  }


const modal = document.querySelector("#lang-modal-view");
const langbutton = document.querySelector("#lingua");
langbutton.addEventListener("click", onLanguagesClick);
const exitLangButton = document.querySelector("#close-lang");
exitLangButton.addEventListener("click", onCloseLanguagesClick);

const modal2 = document.querySelector("#neg-modal-view");
const negbutton = document.querySelector("#negozio");
negbutton.addEventListener("click", onNegClick);

document.addEventListener('click', exitClick);

const form = document.querySelector('form');
form.addEventListener('submit', search);
let inputtext = "";

const home = document.querySelector('.logo');
home.addEventListener('click', onHomeClick);

window.addEventListener("DOMContentLoaded", async () => {
    const auth0Client = await auth0.createAuth0Client({
      domain: "",
      clientId: "",
      authorizationParams: {
        redirect_uri: "http://127.0.0.1:5500/mhw3.html"
      }
    });
  
    // Se siamo tornati dal redirect di Auth0
    if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
      await auth0Client.handleRedirectCallback();
      window.history.replaceState({}, document.title, "/mhw2.html");
    }
  
    const isAuthenticated = await auth0Client.isAuthenticated();
    if(isAuthenticated){    
        const loginBtn = document.getElementById("login");
        loginBtn.classList.add("hidden");

        const profileBox = document.createElement("div");
        profileBox.classList.add("profile-box");

        const userProfile = await auth0Client.getUser();
        const profileName = document.createElement("span");
        profileName.textContent = `Welcome, ${userProfile.name}`;
        profileBox.appendChild(profileName);

        const logoutButton = document.createElement("button");
        logoutButton.textContent = "Logout";
        logoutButton.addEventListener("click", async () => {
            await auth0Client.logout({
            returnTo: "http://127.0.0.1:5500/mhw3.html"
            });
        });
        profileBox.appendChild(logoutButton);

        const header = document.querySelector("header");
        header.appendChild(profileBox);
    }
    const loginBtn = document.getElementById("login");
  
    loginBtn.addEventListener("click", () => {
      auth0Client.loginWithRedirect();
    });
  
   
  });
  