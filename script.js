const searchImg = document.querySelector(".img-card")
const inputSearch = document.querySelector("#input-search")

async function fetchData() {
    /* clearPage() */
    const searchedWord = inputSearch.value.toLowerCase();
    if (searchedWord == "") {
        try {
            const response = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
            const responseJson = await response.json()
            const dataJson = await responseJson.data
            dataJson.forEach(card => {
                const cardImage = card.card_images[0].image_url
                const cardName = card.name.toLowerCase()

                const formattedFileName = cardName.replace(/\s|"/g, '_')

                const newCard = document.createElement('div');
                newCard.classList.add("new-card")
                newCard.innerHTML =
                    `
                <img class="new-card-image" src=${cardImage} alt=${formattedFileName} title=${formattedFileName}}>
                `
                const newCardContainer = document.getElementById('new-card-container');

                console.log(cardName)

                setTimeout(() => {
                    newCardContainer.appendChild(newCard)
                }, 1000)
            })
        } catch (error) {
            console.error(error)
        }
    } else {
        try {
            const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php/${searchedWord}`)
            const responseJson = await response.json()
            const dataJson = await responseJson.data
            console.log(dataJson)
            const filteredArr = []
            dataJson.filter(card => {

                const cardImage = card.card_images[0].image_url
                const cardName = card.name.toLowerCase()
                const cardDesc = card.desc.toLowerCase()
                const cardArch = card.archetype ? card.archetype.toLowerCase() : '';

                const formattedFileName = cardName.replace(/\s|"/g, '_')

                if (cardName.includes(searchedWord) || cardDesc.includes(searchedWord) || cardArch.includes(searchedWord)) {
                    filteredArr.push(cardImage)
                    const newCard = document.createElement('div');
                    newCard.classList.add("new-card")
                    newCard.innerHTML =
                        `
                <img class="new-card-image" src=${cardImage} alt=${formattedFileName} title=${formattedFileName}}>
                `
                    const newCardContainer = document.getElementById('new-card-container');

                    console.log(cardName)

                    setTimeout(() => {
                        newCardContainer.appendChild(newCard)
                    }, 1000)
                }
            })
            console.log(filteredArr)
            console.log(dataJson)
        } catch (error) {
            console.error(error)
        }
    }
}

searchImg.addEventListener('click', (fetchData));
inputSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        fetchData()
    }
});
   


/* function clearPage() {
    const elementsToClear = document.querySelectorAll('#new-card-container');
    elementsToClear.forEach(element => {
        element.remove();
    });
} */