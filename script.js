const searchBtn = document.querySelector("#fetch-btn")
const inputSearch = document.querySelector("#input-search-two")
const clearBtn = document.querySelector("#clear-btn")

async function fetchData() {
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
                const cardLink = card.ygoprodeck_url

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

                    setTimeout(() => {
                        newCardContainer.appendChild(newCard)
                    }, 1000)

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

searchBtn.addEventListener('click', (fetchData));
inputSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        fetchData()
    }
});