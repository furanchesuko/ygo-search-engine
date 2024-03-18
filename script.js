const searchBtn = document.querySelector("#fetch-btn");
const inputSearch = document.querySelector("#input-search");
const clearBtn = document.querySelector("#clear-btn");
const newCardContainer = document.getElementById('new-card-container');

async function fetchData() {
    try {
        //remove input value's blank and converts into lower case
        const searchedWord = inputSearch.value.trim().toLowerCase();
        //fetch data
        const response = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php");
        const responseJson = await response.json();
        const dataJson = await responseJson.data
        // clear previous cards
        newCardContainer.innerHTML = '';
        //iterate every index
        dataJson.forEach(card => {
            const cardImage = card.card_images[0].image_url;
            const cardName = card.name.toLowerCase();
            const cardDesc = card.desc.toLowerCase();
            const cardArch = card.archetype ? card.archetype.toLowerCase() : '';
            const cardLink = card.ygoprodeck_url;
            //replace space with underscore
            const formattedFileName = cardName.replace(/\s|"/g, ' ')
            //condition
            if (searchedWord === "" || cardName.includes(searchedWord) || cardDesc.includes(searchedWord) || cardArch.includes(searchedWord)) {
                //create element
                const newCard = document.createElement('div');
                newCard.classList.add("new-card");
                newCard.innerHTML =
                    `
                <img class="new-card-image" 
                src="${cardImage}" 
                alt="${formattedFileName}" 
                title="${formattedFileName}">
                `;
                //append element
                newCardContainer.appendChild(newCard);
                //open links at image click
                newCard.addEventListener('click', () => {
                    window.open(cardLink);
                });
            }
        });
    } catch (error) {
        console.error(error);
    }
}
//fetch at button "fetch" click
searchBtn.addEventListener('click', fetchData);
//fetch at enter keydown
inputSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        fetchData();
    }
});
// clear all cards at "clear" click
clearBtn.addEventListener('click', () => {
    newCardContainer.innerHTML = '';
});

// Show button go-top and blocks bar on scroll
window.addEventListener("scroll", function () {
    const searchBar = document.querySelector(".search-box");
    if (window.pageYOffset > 20) {
        searchBar.classList.add("fixed");
        document.getElementById("scrollToTopBtn").style.display = "block";
    } else {
        searchBar.classList.remove("fixed");
        document.getElementById("scrollToTopBtn").style.display = "none";
    }
});

//button to scroll on top page
document.getElementById("scrollToTopBtn").addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});