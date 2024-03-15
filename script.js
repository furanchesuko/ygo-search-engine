const searchBtn = document.querySelector("#fetch-btn")
const inputSearch = document.querySelector("#input-search-two")
const clearBtn = document.querySelector("#clear-btn")

async function fetchData() {
    /* remove blank at start/end and convert to lowerCase before fetch */
    const searchedWord = inputSearch.value.trim().toLowerCase();
    /* if input is empty */
    if (searchedWord == "") {
        try {
            /* fetch data */
            const response = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
            const responseJson = await response.json()
            const dataJson = await responseJson.data
            /* cicle every json data index */
            dataJson.forEach(card => {
                const cardImage = card.card_images[0].image_url
                const cardName = card.name.toLowerCase()
                const cardLink = card.ygoprodeck_url
                /* replace space with "_" */
                const formattedFileName = cardName.replace(/\s|"/g, '_')
                /* create new element */
                const newCard = document.createElement('div');
                newCard.classList.add("new-card")
                newCard.innerHTML =
                    `
                <img class="new-card-image" src=${cardImage} alt=${formattedFileName} title=${formattedFileName}}>
                `
                const newCardContainer = document.getElementById('new-card-container');

                newCardContainer.appendChild(newCard)

                console.log(cardName)

                newCard.addEventListener('click', () => {
                    window.open(cardLink)
                })

                clearBtn.addEventListener('click', () => {
                    newCard.remove()
                })
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
            /* empty array for filtered cards */
            const filteredArr = []
            dataJson.filter(card => {

                const cardImage = card.card_images[0].image_url
                const cardName = card.name.toLowerCase()
                const cardDesc = card.desc.toLowerCase()
                const cardArch = card.archetype ? card.archetype.toLowerCase() : '';
                const cardLink = card.ygoprodeck_url

                const formattedFileName = cardName.replace(/\s|"/g, '_')
                /* if card contains (condition) push it in filtered array */
                if (cardName.includes(searchedWord) || cardDesc.includes(searchedWord) || cardArch.includes(searchedWord)) {
                    filteredArr.push(cardImage)
                    const newCard = document.createElement('div');
                    newCard.classList.add("new-card")
                    newCard.innerHTML =
                        `
                <img class="new-card-image" src=${cardImage} alt=${formattedFileName} title=${formattedFileName}}>
                `
                    const newCardContainer = document.getElementById('new-card-container');

                    newCardContainer.appendChild(newCard)

                    console.log(cardName)

                    newCard.addEventListener('click', () => {
                        window.open(cardLink)
                    })

                    clearBtn.addEventListener('click', () => {
                        newCard.remove()
                    })
                }
            })
            console.log(filteredArr)
        } catch (error) {
            console.error(error)
        }
    }
}

/* event listener for click fetch button and input keydown */
searchBtn.addEventListener('click', (fetchData));

inputSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        fetchData()
    }
});