let page = 1

// DOM Elements
const monsterBox = document.getElementById('monster-container')
const monsterForm = document.getElementById('create-monster-form')
const buttonForward = document.getElementById('forward')
const buttonBack = document.getElementById('back')

// Fetches
function getFiftyMonsters (page) {
    return fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(resp => resp.json())
}

function createMonster(monsterObj) {
    return fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
        },
        body: JSON.stringify(monsterObj)
        
    })
        .then(resp => resp.json())
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
    getFiftyMonsters(1)
        .then(monsterArray => {
            renderAllMonsters(monsterArray)
            page = 1;
        })
})

monsterForm.addEventListener("submit", handleCreateMonster)

buttonForward.addEventListener("click", handlePageForward)
buttonBack.addEventListener("click", handlePageBack)

// Event Handlers
function handleCreateMonster(event){
    event.preventDefault()
    
    const newMonster = {
        name: event.target.name.value,
        age: event.target.age.value,
        description: event.target.description.value
    }

    createMonster(newMonster)
        .then(monsterObj => {
            renderOneMonster(monsterObj)
        })

    event.target.reset()
}

function handlePageForward(event) {
    event.preventDefault()
    page++
    getFiftyMonsters(page)
        .then(monsterArray => {
            let monsters = document.getElementsByClassName("monster-section-div")
            for (let i = 0; i < monsters.length; i++) {
                monsters[i].remove()
            }
            renderAllMonsters(monsterArray)
        })
}
function handlePageBack(event) {
    if (page > 1) {
        event.preventDefault()
        page--
        getFiftyMonsters(page)
            .then(monsterArray => {
                let monsters = document.getElementsByClassName("monster-section-div")
                for (let i = 0; i < monsters.length; i++) {
                    monsters[i].remove()
                }
                renderAllMonsters(monsterArray)})
    } else {
        alert("No More Monsters")
    }
}
// Render Functions

function renderOneMonster(monsterObj) {
    const monsterSection = document.createElement("div");
    monsterSection.className = 'monster-section-div'
    monsterSection.dataset.id = monsterObj.id
    monsterSection.innerHTML = `
        <h2>${monsterObj.name}</h2>
        <h4>${monsterObj.age}</h4>
        <p>${monsterObj.description}</p>
    `
    monsterBox.appendChild(monsterSection)
}

function renderAllMonsters(monsterArray) {
    monsterArray.forEach(renderOneMonster)
}