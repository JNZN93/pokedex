let pokeDatas = [];

function init() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
  getAllPokemons(url);
}


async function getAllPokemons(url) {
  try {
    openLoader();
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    let pokeList = result.results;
    let loadMorePokemonUrl = result.next;
    let content = document.getElementById("content");
    let loadMoreButton = document.getElementById("loadmorebutton");
    for (let i = 0; i < pokeList.length; i++) {
      let pokeData = await getPokemonData(pokeList[i].url);
      pokeDatas.push({name:pokeList[i].name, image: pokeData.image, hp: pokeData.hp, url:pokeList[i].url, audio: pokeData.audio, attack: pokeData.attack, defense: pokeData.defense, weight: pokeData.weight })
      content.innerHTML += getPokemonDataTemplate(pokeData, pokeList, i);
  }
  closeLoader();

    loadMoreButton.onclick = () => {
      getAllPokemons(loadMorePokemonUrl);
    };

  } catch (error) {
    console.error(error.message);
  }
}


async function getPokemonData(dataUrl) {
  try {
    const response = await fetch(dataUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    let pokeImgSrc = result.sprites.other.home.front_default;
    let hpSrc = result.stats[0].base_stat;
    let attackSrc = result.stats[1].base_stat;
    let denfenseSrc = result.stats[2].base_stat;
    let weightSrc = result.weight
    let bgColor = result.types[0].type.name;
    let audioUrl = result.cries.latest;
    let pokemonId = result.id;

    return {image: pokeImgSrc, hp: hpSrc, bgColor: bgColor, audio: audioUrl, id: pokemonId, attack : attackSrc, defense : denfenseSrc, weight: weightSrc};

  } catch (error) {
    console.error(error.message);
  }
}


async function playAudio(audioUrl) {
  let audio = new Audio(audioUrl);
  audio.volume = 0.2;
  try {
    await audio.play();
  } catch (err) {
    console.log("Failed to play..." + err);
  }
}


function closeModal() {
  let modal = document.getElementById('modal');
  modal.innerHTML = '';
  modal.classList.add('d-none')
}


function openModal(i) {
  let modal = document.getElementById('modal');
  modal.classList.remove('d-none')
  modal.innerHTML += openModalTemplate(i);
}


function nextPoke(event,i,) {
      event.stopPropagation();
      document.getElementById('modal').innerHTML="";
      if (i == pokeDatas.length - 1) {
        openModal(0);
        playAudio(pokeDatas[0].audio)
       } else {
           openModal(i + 1);
           playAudio(pokeDatas[i+1].audio)
       }  
   }


function prevPoke(event,i,) {
      event.stopPropagation();
      document.getElementById('modal').innerHTML="";

      if (i == 0) {
        openModal(pokeDatas.length -1);
        playAudio(pokeDatas[pokeDatas.length -1].audio)
   
       } else {
           openModal(i - 1);
           playAudio(pokeDatas[i - 1].audio)
       }
   }
  

   function filterPokemon() {
    let input, filter, pokenames, i, wrapperContainer;
    
    input = document.getElementById("pokesearch");
    filter = input.value.toUpperCase();
    wrapperContainer = document.getElementsByClassName('wrapper-container')

    pokenames = document.getElementsByClassName("pokename");
    for (i = 0; i < pokenames.length; i++) {
        let pokeContent = pokenames[i].innerHTML
        let loadMoreButton = document.getElementById('loadmorebutton')

        if (pokeContent.toUpperCase().indexOf(filter) > -1 || filter.length < 3) {
            wrapperContainer[i].style.display = "";
            loadMoreButton.classList.remove('d-none')
            // pokemon nicht gefunden indexOf(111) = -1 => -1 heißt nicht gefunden
        } else {
            wrapperContainer[i].style.display = "none";
            loadMoreButton.classList.add('d-none')
        }
  }
}


function openLoader() {
  let loader  = document.getElementById('loader');

  loader.classList.remove('d-none');
}


function closeLoader() {
  let loader  = document.getElementById('loader');

  loader.classList.add('d-none');
}


function stopPropagation(event) {
  event.stopPropagation();
}