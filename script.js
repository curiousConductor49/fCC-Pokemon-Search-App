// DOM Variables
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
// Identity Data variables
const pokeName = document.getElementById("pokemon-name");
const pokeId = document.getElementById("pokemon-id");
// Trait Data variables
const pokeWeight = document.getElementById("weight");
const pokeHeight = document.getElementById("height");
const pokeHp = document.getElementById("hp");
const pokeTypes = document.getElementById("types");
// Appearance Data variable
const pokeAppearance = document.getElementById("appearance");
// Combat Data variables
const pokeAttack = document.getElementById("attack");
const pokeDefense = document.getElementById("defense");
const pokeSpecialAttack = document.getElementById("special-attack");
const pokeSpecialDefense = document.getElementById("special-defense");
const pokeSpeed = document.getElementById("speed");

// Global variables for functions
const pokeProxyUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
let pokeIds = [];
let pokeNames = [];

// Async function
const pokeFetch = async (searchInput) => {
  try {
    const res1 = await fetch(pokeProxyUrl);
    const data1 = await res1.json();
    const { results } = data1;

    for (let i = 0; i < results.length; i++) {
      const { id, name } = results[i];
      pokeIds.push(id);
      pokeNames.push(name);
    }

    const uniquePokeUrlEnd = searchInput.value.toLowerCase();
    const userPokemonQuery = verifyUserInput(pokeIds, pokeNames, uniquePokeUrlEnd);

    if (!userPokemonQuery) {
      alert("Pokémon not found");
    } else {
      const res2 = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${uniquePokeUrlEnd}/`);
      const data2 = await res2.json();
      pokemonPopulate(data2);
    }
  } catch (err) {
    console.error(err);
  }
};

const verifyUserInput = (ids, names, input) => {
  // Compares input with destructured ids and names to verify user's pokemon input
  let validity = false;
  ids.forEach((id) => {
    if (id == input) {
      validity = true;
    }
  });
  names.forEach((name) => {
    if (name === input) {
      validity = true;
    }
  });
  return validity;
};

const pokemonPopulate = (pokeDataObject) => {
  // Destructures and displays the data object
  const { id, name, weight, height } = pokeDataObject;
  const { sprites: { front_default } } = pokeDataObject;
  const { stats } = pokeDataObject;
  const [ { base_stat: hp }, { base_stat: attack }, { base_stat: defense }, { base_stat: special_attack }, { base_stat: special_defense }, { base_stat: speed } ] = stats;
  const { types } = pokeDataObject; 
  const pokemonTypes = types.map((obj) => {
    const { type: { name: typeName } } = obj;
    return typeName;
  })
  
  // Identity traits
  pokeName.innerHTML = `${name.toUpperCase()}`;
  pokeId.innerHTML = `#${id}`;
  // Stats traits
  pokeWeight.innerHTML = `${weight}`;
  pokeHeight.innerHTML = `${height}`;
  pokeHp.innerHTML = `${hp}`;
  pokeTypes.innerHTML = "";
  pokemonTypes.forEach((type) => {
    pokeTypes.innerHTML += `<p>${type.toUpperCase()}</p>`;
  })
  // Appearance
  pokeAppearance.innerHTML = `<img id="sprite" src=${front_default} width="150px">`;
  // Combat traits
  pokeAttack.innerHTML = `${attack}`;
  pokeDefense.innerHTML = `${defense}`;
  pokeSpecialAttack.innerHTML = `${special_attack}`;
  pokeSpecialDefense.innerHTML = `${special_defense}`;
  pokeSpeed.innerHTML = `${speed}`;
}

searchBtn.addEventListener("click", () => { pokeFetch(searchInput) });