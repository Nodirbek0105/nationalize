let apiCountries = "https://restcountries.com/v3.1/alpha/";
let apiName = "https://api.nationalize.io?name";
let aboutUl = document.querySelector("[data-ul-about-countries]");
let elTemplate = document.querySelector("[data-countries-template]");
let input = document.querySelector("[data-name]");
let form = document.querySelector("[data-form]");

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  aboutName(input.value);
});

loadingFirst();
async function loadingFirst() {
  aboutUl.innerHTML = `<div class="inner" style="width: 200px; height: 200px;"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgb(22, 29, 37); display: block;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
  <g transform="rotate(0 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#aaaaaa">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(30 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#aaaaaa">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(60 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#aaaaaa">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(90 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#aaaaaa">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(120 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#aaaaaa">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(150 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#aaaaaa">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(180 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#aaaaaa">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(210 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#aaaaaa">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(240 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#aaaaaa">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(270 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#aaaaaa">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(300 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#aaaaaa">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
    </rect>
  </g><g transform="rotate(330 50 50)">
    <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#aaaaaa">
      <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
    </rect>
  </g>
  </svg></div>`;
  aboutName("nodirbek");
}

async function aboutName(name) {
  try {
    let response = await fetch(`${apiName}=${name}`);
    let result = await response.json();
    console.log(result);
    aboutCountries(result);
  } catch (error) {
    console.log(error);
  }
}

let renderedArray = [];
async function aboutCountries(arrayFirst) {
  try {
    let array = arrayFirst.country;
    document.querySelector("h1").textContent = arrayFirst.name;
    renderedArray =[]
    array.forEach((value) => {
      pushCountrie(value.country_id);
    });
  } catch (error) {
    console.log(error);
  }
}



async function pushCountrie(code) {
  let response = await fetch(`${apiCountries}${code}`);
  let result = await response.json();
  renderedArray.push(result[0]);
  console.log(renderedArray);
  renderCountries(renderedArray);
}

function renderCountries(arrayFirst) {
  aboutUl.innerHTML = "";
  console.log(arrayFirst);
  if (arrayFirst !== "" || arrayFirst !== null) {
    arrayFirst.forEach((countries) => {
      aboutUl.appendChild(createLi(countries));
    });
  }
}

function createLi(countries) {
  const card = elTemplate.content.cloneNode(true);
  card.querySelector("li").dataset.countrie = countries.cca2;
  card.querySelector("img").src =
    countries.flags.svg === "N/A" ? "./img/no-poster.gif" : countries.flags.svg;
  card.querySelector("img").alt = countries.name.official;
  card.querySelector("[data-countries-title]").textContent =
    countries.name.official;
  card.querySelector(
    "[data-countries-population]"
  ).textContent = `population: ${countries.population}`;
  card.querySelector(
    "[data-countries-region]"
  ).textContent = `region: ${countries.region}`;
  card.querySelector(
    "[data-countries-capital]"
  ).textContent = `capital: ${countries.capital}`;
  card.querySelector(
    "[data-countries-area]"
  ).textContent = `area: ${countries.area} sq km`;
  return card;
}
