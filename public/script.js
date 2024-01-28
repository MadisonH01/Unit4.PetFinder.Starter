const API_URL = `http://localhost:8080`;

const state = {
  pets: [],
};

/**
 * Fetches all pets from the API.
 * @returns {Object[]} the array of pet objects
 */
const fetchAllPets = async () => {
  try {
    const response = await fetch(`${API_URL}/api/v1/pets`);
    const json = await response.json();
    renderAllPets(json);
  } catch (err) {
    console.error("Uh oh, trouble fetching pets!", err);
  }
};

//DOM elements
const $main = document.querySelector("main");

const createCard = ({
  petName,
  breed,
  age,
  owner,
  telephone,
  appointments,
}) => {
  //create elements
  const card = document.createElement("section");
  const div = document.createElement("div");
  const petNameHeader = document.createElement("h2");
  const breedInfo = document.createElement("p");
  const ageInfo = document.createElement("p");
  const ownerInfo = document.createElement("p");
  const telephoneInfo = document.createElement("p");
  const appointmentsInfo = document.createElement("ul");

  card.className = "card";

  const elements = [
    { element: petNameHeader, info: petName },
    { element: breedInfo, info: `${breed}` },
    { element: ageInfo, info: `${age}` },
    { element: ownerInfo, info: `${owner}` },
    { element: telephoneInfo, info: `${telephone}` },
    { element: appointmentsInfo, info: `${appointments}` },
  ];

  elements.forEach(({ element, info }) => {
    if (element !== appointmentsInfo) {
        element.textContent = info;
    }
    div.appendChild(element);
  })
  card.appendChild(div);

  return card;
};

const renderAllPets = (petList) => {
    $main.replaceChildren();

    if (petList.length < 1) {
        const message = document.createElement("h2");
        message.textContent = "No current pets";
        $main.appendChild(message);
        return;
    }

    petList.forEach((pet) => {
        const card = createCard(pet);
        $main.appendChild(card);
    });
};

const render = async () => {
    await fetchAllPets();
};

render();