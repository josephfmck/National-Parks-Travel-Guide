const $selectTag = document.querySelector("#search-selectTag");
const $selectStateBtn = document.querySelector("#select-state-btn");

const $searchParksSelectTag = document.querySelector("#search-parks-selectTag");
const $selectParkBtn = document.querySelector("#select-park-btn");

const $parkHTMLContent = document.querySelector("#park-html-content");

const all50StatesArr = [
  { state: "Alabama", abrev: "AL" },
  { state: "Alaska", abrev: "AK" },
  { state: "Arizona", abrev: "AZ" },
  { state: "Arkansas", abrev: "AR" },
  { state: "California", abrev: "CA" },
  { state: "Colorado", abrev: "CO" },
  { state: "Connecticut", abrev: "CT" },
  { state: "Delaware", abrev: "DE" },
  { state: "Florida", abrev: "FL" },
  { state: "Georgia", abrev: "GA" },
  { state: "Hawaii", abrev: "HI" },
  { state: "Idaho", abrev: "ID" },
  { state: "Illinois", abrev: "IL" },
  { state: "Indiana", abrev: "IN" },
  { state: "Iowa", abrev: "IA" },
  { state: "Kansas", abrev: "KS" },
  { state: "Kentucky", abrev: "KY" },
  { state: "Louisiana", abrev: "LA" },
  { state: "Maine", abrev: "ME" },
  { state: "Maryland", abrev: "MD" },
  { state: "Massachusetts", abrev: "MA" },
  { state: "Michigan", abrev: "MI" },
  { state: "Minnesota", abrev: "MN" },
  { state: "Mississippi", abrev: "MS" },
  { state: "Missouri", abrev: "MO" },
  { state: "Montana", abrev: "MT" },
  { state: "Nebraska", abrev: "NE" },
  { state: "Nevada", abrev: "NV" },
  { state: "New Hampshire", abrev: "NH" },
  { state: "New Jersey", abrev: "NJ" },
  { state: "New Mexico", abrev: "NM" },
  { state: "New York", abrev: "NY" },
  { state: "North Carolina", abrev: "NC" },
  { state: "North Dakota", abrev: "ND" },
  { state: "Ohio", abrev: "OH" },
  { state: "Oklahoma", abrev: "OK" },
  { state: "Oregon", abrev: "OR" },
  { state: "Pennsylvania", abrev: "PA" },
  { state: "Rhode Island", abrv: "RI" },
  { state: "South Carolina", abrev: "SC" },
  { state: "South Dakota", abrev: "SD" },
  { state: "Tennessee", abrev: "TN" },
  { state: "Texas", abrev: "TX" },
  { state: "Utah", abrev: "UT" },
  { state: "Vermont", abrev: "VT" },
  { state: "Virginia", abrev: "VA" },
  { state: "Washington", abrev: "WA" },
  { state: "West Virginia", abrev: "WV" },
  { state: "Wisconsin", abrev: "WI" },
  { state: "Wyoming", abrev: "WY" },
];

//*NPS API
const NPSKey = "7DWHFCtz7VxwHpMbfw94Y9fYaQnsKuyNAlqc1T4a";

//https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=7DWHFCtz7VxwHpMbfw94Y9fYaQnsKuyNAlqc1T4a

//* Return data from API
const searchAllNPSAPI = async () => {
  const res = await fetch(
    `https://developer.nps.gov/api/v1/parks?limit=467&api_key=${NPSKey}`
  );
  const data = await res.json();

  console.log(data);
  //2nd national park
  console.log(data.data[1]);

  //national park's states
  console.log(data.data[1].states);

  return data;
};

//* Return API data of all parks
const findAllParks = async () => {
  const parksResults = await searchAllNPSAPI();
  const allParks = parksResults.data;

  return allParks;
};

//* Returns arr of parks with specific state's abbreviation
const findAllParksAbrevWithinState = (statesAbrev, allParksData) => {
  //*holds parks that have this state abrev
  const parksWithAbrev = [];

  //* All 467 parks
  allParksData.forEach((park) => {
    //*check if park's state abrev === option's abrev
    let parkStatesStr = park.states;

    //convert str "MA,TX,LA" into [MA, TX, LA];
    let parkStatesArr = parkStatesStr.split(",");

    console.log(parkStatesArr);

    //*if parkStatesArr includes abrev
    //?["CO", "KS", "MO", "NM", "OK"]  includes "CO"
    if (parkStatesArr.includes(statesAbrev) === true) {
      //*push actual current park iterate
      parksWithAbrev.push(park);
    }
  });

  return parksWithAbrev;
};

//* Generate Options of Parks within specific State
const generateParkSelectTagOptions = (parksWithAbrevArr) => {
  $searchParksSelectTag.innerHTML = "";

  parksWithAbrevArr.forEach((parkObj) => {
    let parkOptionTag = document.createElement("option");
    parkOptionTag.setAttribute("value", parkObj.parkCode);
    parkOptionTag.textContent = parkObj.name;

    //Append to select
    $searchParksSelectTag.appendChild(parkOptionTag);
  });
};

const createParkSelectOptions = async (stateChosenAbrev) => {
  //*Returns all parks API objs within state
  const allParksWithinState = await findAllParks(stateChosenAbrev);

  console.log(allParksWithinState);

  //* returns arr of parks with that state's Abrev
  const parksWithAbrevArr = findAllParksAbrevWithinState(
    stateChosenAbrev,
    allParksWithinState
  );

  console.log(parksWithAbrevArr);

  //* Generate Park's Select Options
  generateParkSelectTagOptions(parksWithAbrevArr);
};

//*PARK.html data, request with parkCode
const getParkAPIData = async (parkCode) => {
  const res = await fetch(
    `https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=${NPSKey}`
  );
  const data = await res.json();

  return data;
};

//* Park.html, grab data and add to html
const generateParkHTML = (parkData) => {
  console.log(parkData);

  const actualData = parkData.data[0];

  const name = actualData.name;
  const webURL = actualData.url;
  const description = actualData.description;
  const directionsInfo = actualData.directionsInfo;
  const weatherInfo = actualData.weatherInfo;
  const backgroundIMG = actualData.images[0].url;
  console.log(backgroundIMG);

  console.log({ name, webURL, description, directionsInfo, weatherInfo });

  const $body = document.querySelector("body");
  $body.style.backgroundImage = `url(${backgroundIMG})`;

  //Set Dynamic HTML
  $parkHTMLContent.innerHTML = `<div class="container" id="header">
  <h1 class="text-center">
    <strong>${name}</strong>
  </h1>
  <h3 class="text-center"><a href="${webURL}">Park's Official Website</a></h3>
  <button id="back-home-btn">HOME</button>
</div>

<section id="park-section">
  <div class="container">
      <div class="description-div bg-white">
        <p id="description">
          ${description}
        </p>
      </div>

      <div class="flex-container">
        <div class="directions-div bg-white">
          <h3 class="text-center">Directions</h3>
          <p id="directions-info">
              ${directionsInfo}
          </p>
        </div>

        <div class="weather-div bg-white">
          <h3 class="text-center">Weather</h3>
          <p id="weather-info">
              ${weatherInfo}
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
`;
};

const setupEventListeners = () => {
  const $backHomeBtn = document.querySelector("#back-home-btn");

  //EVENTS
  $backHomeBtn.addEventListener("click", () => {
    window.location.assign("index.html");
  });
};

const generate50StatesOptions = () => {
  //* Loop 50 states, create option with val of abbrev for each
  all50StatesArr.forEach((stateObj) => {
    let $option = document.createElement("option");

    $option.innerText = stateObj.state;
    $option.value = stateObj.abrev;

    $selectTag.appendChild($option);
  });
};

const init = async () => {
  //Check which html page init
  let indexHTMLLocationPath = "/PORT-PROJECTS/National-Parks/index.html";
  let parkHTMLLocationPath = "/PORT-PROJECTS/National-Parks/park.html";

  //* index.html
  if (document.location.pathname === indexHTMLLocationPath) {
    generate50StatesOptions();

    //INDEX.HTML EVENTS
    $selectStateBtn.addEventListener("click", (e) => {
      e.preventDefault();

      $searchParksSelectTag.classList.remove("hidden");
      $selectParkBtn.classList.remove("hidden");

      let stateChosenAbrev = $selectTag.value;

      //*Find and append state options to Park's select
      createParkSelectOptions(stateChosenAbrev);
    });

    $selectParkBtn.addEventListener("click", (e) => {
      e.preventDefault();

      let parkCodeChosen = $searchParksSelectTag.value;

      //* Use LS to pass parkCode to park.html
      localStorage.setItem("parkCode", parkCodeChosen);

      window.location.assign("park.html");
    });
  }

  //*park.html
  if (document.location.pathname === parkHTMLLocationPath) {
    let parkCodeLS = localStorage.getItem("parkCode");
    console.log(parkCodeLS);

    //? await to grab return API data
    const parkAPIData = await getParkAPIData(parkCodeLS);
    generateParkHTML(parkAPIData);

    setupEventListeners();
  }
};

init();
