const boxContent = document.querySelector(".box .row");
const search = document.querySelector(".search");
const btn = document.querySelector(".select-sort");

getData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a`);

async function getData(url) {
    try {
        let data = await axios.get(url);
        drinkData = data.data.drinks || [];
        displayData(drinkData);
    } catch (error) {
        console.log(error);
    }
}

function displayData(drinks) {
    boxContent.innerHTML = "";
    drinks.forEach((drink) => {
        const card = createCard(drink);
        boxContent.innerHTML += card;
    });
}
const createCard = (drink) => {
    console.log(drink);
    const {
        strCategory,
        strInstructions,
        strAlcoholic,
        strDrinkThumb,
        strDrink
    } = drink;
    return `
  <div class="card">
    <img src="${strDrinkThumb}"alt="${strCategory} image">
      <h3 class="card-title">${strCategory}</h3>
      <h4 class="card-title">${strAlcoholic}</h4>
      <h4 class="card-title">${strDrink}</h4>
      <p class="card-text">${strInstructions.substring(50, 1)}</p>
  </div>
`;
};
btn.addEventListener("click", sortDrinksByAlcoholic);

function sortDrinksByAlcoholic() {
    const sortedDrinks = [...drinkData].sort((a, b) => {
        if (a.strAlcoholic < b.strAlcoholic) return -1;
        if (a.strAlcoholic > b.strAlcoholic) return 1;
        if (a.strDrink < b.strDrink) return -1;
        if (a.strDrink > b.strDrink) return 1;
        return 0;

    });
    displayData(sortedDrinks);
}
search.addEventListener("input", (event) => {
    getData(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${event.target.value}`
    );
});