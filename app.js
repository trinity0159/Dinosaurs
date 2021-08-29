//Dino Data
function DinoData() {
  const dinos = [
    {
      species: "Triceratops",
      weight: 13000,
      height: 114,
      diet: "herbivore",
      where: "North America",
      when: "Late Cretaceous",
      fact: "First discovered in 1889 by Othniel Charles Marsh",
    },
    {
      species: "Tyrannosaurus Rex",
      weight: 11905,
      height: 144,
      diet: "carnivore",
      where: "North America",
      when: "Late Cretaceous",
      fact: "The largest known skull measures in at 5 feet long.",
    },
    {
      species: "Anklyosaurus",
      weight: 10500,
      height: 55,
      diet: "herbivore",
      where: "North America",
      when: "Late Cretaceous",
      fact: "Anklyosaurus survived for approximately 135 million years.",
    },
    {
      species: "Brachiosaurus",
      weight: 70000,
      height: "372",
      diet: "herbivore",
      where: "North America",
      when: "Late Jurassic",
      fact: "An asteroid was named 9954 Brachiosaurus in 1991.",
    },
    {
      species: "Stegosaurus",
      weight: 11600,
      height: 79,
      diet: "herbivore",
      where: "North America, Europe, Asia",
      when: "Late Jurassic to Early Cretaceous",
      fact: "The Stegosaurus had between 17 and 22 seperate plates and flat spines.",
    },
    {
      species: "Elasmosaurus",
      weight: 16000,
      height: 59,
      diet: "carnivore",
      where: "North America",
      when: "Late Cretaceous",
      fact: "Elasmosaurus was a marine reptile first discovered in Kansas.",
    },
    {
      species: "Pteranodon",
      weight: 44,
      height: 20,
      diet: "carnivore",
      where: "North America",
      when: "Late Cretaceous",
      fact: "Actually a flying reptile, the Pteranodon is not a dinosaur.",
    },
    {
      species: "Pigeon",
      weight: 0.5,
      height: 9,
      diet: "herbivore",
      where: "Worldwide",
      when: "Holocene",
      fact: "All birds are living dinosaurs.",
    },
  ];

  return dinos;
}

// Create Dino Constructor
function Dinosaurs(dinoProperties) {
  this.species = dinoProperties.species;
  this.weight = dinoProperties.weight;
  this.height = dinoProperties.height;
  this.diet = dinoProperties.diet;
  this.where = dinoProperties.where;
  this.when = dinoProperties.when;
  this.fact = dinoProperties.fact;
}

// Create Dino Objects
const dinoArray = DinoData();
const dinos = dinoArray.map((x) => new Dinosaurs(x));

// Create Human Object
function Human(name, height, weight, diet) {
  this.name = name;
  this.height = height;
  this.weight = weight;
  this.diet = diet;
}

let user = new Human();

// Use IIFE to get human data from form
const userData = (function () {
  function getHumanData() {
    user.name = document.getElementById("name").value;
    user.height =
      parseInt(document.getElementById("feet").value) * 12 +
      parseInt(document.getElementById("inches").value);
    user.weight = parseInt(document.getElementById("weight").value);
    user.diet = document.getElementById("diet").value.toLowerCase();
  }

  return {
    user: getHumanData,
  };
})();

// Create Dino Compare Method 1 - Compare Name/Species
// NOTE: Weight in JSON file is in lbs, height in inches.
Dinosaurs.prototype.compareWeight = function (dino, user) {
  let factWeight;

  if (dino.weight > user.weight) {
    factWeight = `The ${dino.species} weighs more than you.`;
  } else if (dino.weight < user.weight) {
    factWeight = `You weight more than ${dino.species}.`;
  } else factWeight = `You and the ${dino.species} are the same weight.`;
  return factWeight;
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

Dinosaurs.prototype.compareHeight = function (dino, user) {
  let factHeight;

  if (dino.height > user.height) {
    factHeight = `The ${dino.species} is taller than you.`;
  } else if (dino.height < user.height) {
    factHeight = `You are taller than the ${dino.species}.`;
  } else factHeight = `You and the ${dino.species} are the same height.`;

  return factHeight;
};

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

Dinosaurs.prototype.compareDiet = function (dino, user) {
  let factDiet;

  if (dino.diet === user.diet) {
    factDiet = `You and  the ${dino.species} do not have the same diet`;
  } else factDiet = `You and  the ${dino.species} have the same diet`;
  return factDiet;
};

// Generate Tiles for each Dino in Array

function createDinoTile(dino) {
  let newFact;
  let randNum = Math.floor(Math.random() * 5);
  switch (randNum) {
    case 0:
      newFact = dino.compareWeight(dino, user);
      break;
    case 1:
      newFact = dino.compareHeight(dino, user);
      break;
    case 2:
      newFact = dino.compareDiet(dino, user);
      break;
    case 3:
      newFact = `${dino.species} lived in ${dino.where}`;
      break;
    case 4:
      newFact = `${dino.species} lived during ${dino.when}`;
      break;
    case 5:
      newFact = $dino.fact;
  }
  if (dino.species == "Pigeon") {
    newFact = dino.fact;
  }

  const dinoGrid = document.createElement("div");
  dinoGrid.className = "grid-item";
  dinoGrid.innerHTML = `<h3>${
    dino.species
  }</h3><img src="images/${dino.species.toLowerCase()}.png"/><p>${newFact}</p>`;
  return dinoGrid;
}

function createHumanTile(user) {
  const userGrid = document.createElement("div");
  userGrid.className = "grid-item";
  userGrid.innerHTML = `<h3>${user.name}</h3><img src="images/human.png"/><p>`;
  return userGrid;
}

// Add tiles to DOM
function createGrid() {
  userData.user();
  let mainGrid = document.getElementById("grid");
  let i = 0;
  for (let i = 0; i < dinos.length; i++) {
    if (i == 4) {
      mainGrid.appendChild(createHumanTile(user));
    }
    mainGrid.appendChild(createDinoTile(dinos[i]));
  }
  return mainGrid;
}

// On button click, prepare and display infographic
document.getElementById("btn").addEventListener("click", function () {
  document.getElementById("dino-compare").style.display = "none";
  createGrid();
});
