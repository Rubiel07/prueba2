const pokedex  = document.getElementById('pokedex');
const pokeCache = {};

  const fetchpokemon = async () => { 
    const url = `https://pokeapi.co/api/v2/pokemon?limit=905`;
    const res = await fetch(url);
    const data = await res.json();
    const pokemon = data.results.map((result, index) =>
    ({
      name: result.name,
      ApiURL: result.url,
      id: index  + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
      
    }))
    displaypokemon(pokemon)
  };

const displaypokemon = (pokemon) =>{
  
    const pokemonHTMLString = pokemon.map (poke => `
    <li class="card" onclick="selectPokemon(${
      poke.id})">
    <div class= "box-img">
      <img class="card-img" src ="${poke.img}"/>
      </div>
      <h2 class="card-tittle">${poke.id}. ${poke.name}</h2>
      </li>
    `)
    
    .join('');
    pokedex.innerHTML = pokemonHTMLString;
};
const selectPokemon = async (id) => {
  if(!pokeCache[id]){

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const poke = await res.json();
  pokeCache[id] = poke;
  displayPopup(poke);
  }
  displayPopup(pokeCache[id]);

};

const displayPopup = (poke) => {
  const type = poke.types.map((type)=>
  type.type.name).join(',');
  const img = poke.sprites['front_default'];
  const htmlString = `
  <div class="popup">
    <div class ="card" "api">
      <button id="CloseBtn" onclick="closePopup()">Close</button>
     <div class="card" id="api">
       <img class"card-img" src="${
       img}"/>
        <h2 class="card-tittle">${poke.id}</h2>
       <h3><small>Height: </small>${
        poke.height}| <small>Weight: </small>${
        poke.weight}| <small>Type: </small>
        |${type}|
     </div>
   </div>
 </div>

  `;
  pokedex.innerHTML = htmlString + pokedex.innerHTML;
  console.log(htmlString);
};
const closePopup = () => {
  const popup = document.querySelector('.popup');
  popup.parentElement.removeChild(popup);
}


fetchpokemon();

 

