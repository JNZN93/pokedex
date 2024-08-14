function getPokemonDataTemplate(pokeData, pokeList, i) {
    return `
      <div class="wrapper-container">

          <div class="card" onclick="playAudio('${pokeData.audio}');openModal(${pokeData.id-1});">
              <div class="card-header">
                  <span class="pokename">${pokeList[i].name}</span>
                  <span>${pokeData.hp} hp</span>
              </div>
              <div class="card-image ${pokeData.bgColor}">
                  <img src="${pokeData.image}">
              </div>
  
              <div class="card-footer">
                  <span>${pokeData.bgColor}</span>
              </div>
          </div>
      </div>`
}


function openModalTemplate(i) {
    return `<div class="big-card">
    <div class="big-card-data" onclick="stopPropagation(event)">
        <h3 id="modal-name">${pokeDatas[i].name}</h3>
        <img id="modal-image" src="${pokeDatas[i].image}" alt="">
        <div class="stats">
            <p>Hp : <span id="modal-hp">
                    <div class="progress" role="progressbar">
                        <div class="progress-bar" style="width: ${pokeDatas[i].hp}%">${pokeDatas[i].hp}</div>
                    </div>
                </span></p>
            <p>Attack: <span id="modal-attack">
                    <div class="progress" role="progressbar">
                        <div class="progress-bar" style="width: ${pokeDatas[i].attack}%">${pokeDatas[i].attack}</div>
                    </div>
                </span></p>
            <p>Defense:<span id="modal-defense">
                    <div class="progress" role="progressbar">
                        <div class="progress-bar" style="width: ${pokeDatas[i].defense}%">${pokeDatas[i].defense}</div>
                    </div>
                </span></p>
            <p>Weight: <span id="modal-weight"><b>${pokeDatas[i].weight} kg</b></span></p>
        </div>
    </div>
    <div class="arrows">
        <img src="./assets/arrow-left.png" onclick="prevPoke(event, ${i})">
        <img src="./assets/arrow-right.png" onclick="nextPoke(event, ${i})">
    </div>
</div>
`
}