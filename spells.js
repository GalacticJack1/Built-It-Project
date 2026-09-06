// * "https://www.dnd5eapi.co" * /

let spells = [];

const loading = document.querySelector(".spells__loading");


async function getSpells() {

    if (loading) {
        loading.style.display = "flex";
    }

    const response = await fetch(
        "https://www.dnd5eapi.co/api/2014/spells"
    );

    const data = await response.json();

    spells = data.results;

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (loading) {
        loading.style.display = "none";
    }

    displaySpells(spells);
}


async function displaySpells(spellArray) {

    const spellList = document.getElementById("spell-list");

    spellList.innerHTML = "";


    for (const spell of spellArray) {

        const spellElement = document.createElement("button");

        spellElement.classList.add("spell-button");

        spellElement.innerHTML =
            `${spell.name}<br>- Level ${spell.level} -`;


        const response = await fetch(
            `https://www.dnd5eapi.co${spell.url}`
        );

        const spellData = await response.json();


        setBookColor(spellElement, spellData);


        spellElement.addEventListener("click", () => {

       const spellDetails =
    document.getElementById("spell-details");

const spellDetailsContent =
    document.getElementById("spell-details-content");


spellDetailsContent.innerHTML = `
    <h2>${spellData.name}</h2>

    <p>Level: ${spellData.level}</p>

    <p>School: ${spellData.school.name}</p>

    <p>
        Classes:
        ${spellData.classes
            .map((classItem) => classItem.name)
            .join(", ")}
    </p>

    <p>Range: ${spellData.range}</p>

    <p>${spellData.desc[0]}</p>
`;
spellDetails.showModal();

        });


        spellList.appendChild(spellElement);
    }
}


function setBookColor(spellElement, spellData) {

    const mainClass = spellData.classes[0]?.name;


    if (mainClass === "Wizard") {
        spellElement.classList.add("wizard-book");
    }


    if (mainClass === "Sorcerer") {
        spellElement.classList.add("sorcerer-book");
    }


    if (mainClass === "Warlock") {
        spellElement.classList.add("warlock-book");
    }


    if (mainClass === "Cleric") {
        spellElement.classList.add("cleric-book");
    }


    if (mainClass === "Druid") {
        spellElement.classList.add("druid-book");
    }


    if (mainClass === "Bard") {
        spellElement.classList.add("bard-book");
    }


    if (mainClass === "Paladin") {
        spellElement.classList.add("paladin-book");
    }


    if (mainClass === "Ranger") {
        spellElement.classList.add("ranger-book");
    }
}


async function filterSpells(event) {

    const selectedValue = event.target.value;

    let filteredSpells = [...spells];


    if (selectedValue === "A_TO_Z") {

        filteredSpells.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });

    }


    if (selectedValue === "Z_TO_A") {

        filteredSpells.sort((a, b) => {
            return b.name.localeCompare(a.name);
        });

    }


    if (selectedValue === "LEVEL") {

        filteredSpells.sort((a, b) => {
            return a.level - b.level;
        });

    }


    if (selectedValue === "CLASSWIZARD") {

        filteredSpells = await getClassSpells("wizard");

    }


    if (selectedValue === "CLASSSORCEROR") {

        filteredSpells = await getClassSpells("sorcerer");

    }


    if (selectedValue === "CLASSWARLOCK") {

        filteredSpells = await getClassSpells("warlock");

    }


    if (selectedValue === "CLASSCLERIC") {

        filteredSpells = await getClassSpells("cleric");

    }


    if (selectedValue === "CLASSDRUID") {

        filteredSpells = await getClassSpells("druid");

    }


    if (selectedValue === "CLASSBARD") {

        filteredSpells = await getClassSpells("bard");

    }


    if (selectedValue === "CLASSPALADIN") {

        filteredSpells = await getClassSpells("paladin");

    }


    if (selectedValue === "CLASSRANGER") {

        filteredSpells = await getClassSpells("ranger");

    }


    displaySpells(filteredSpells);
}


async function getClassSpells(className) {

    if (loading) {
        loading.style.display = "flex";
    }

    const response = await fetch(
        `https://www.dnd5eapi.co/api/2014/classes/${className}/spells`
    );

    const data = await response.json();

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (loading) {
        loading.style.display = "none";
    }

    return data.results;
}

const searchInput =
    document.querySelector(".search__bar--area");

const searchButton =
    document.querySelector(".search__bar--button");


function searchSpells() {

    const searchText =
        searchInput.value.toLowerCase().trim();


    const searchedSpells = spells.filter((spell) => {

        return spell.name
            .toLowerCase()
            .includes(searchText);

    });


    displaySpells(searchedSpells);
}


searchButton.addEventListener("click", searchSpells);


searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        searchSpells();

    }

});

const closeBook =
    document.querySelector(".close-book");

const spellDetails =
    document.getElementById("spell-details");


closeBook.addEventListener("click", () => {

    spellDetails.close();

});

getSpells();
