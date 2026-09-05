// * "https://www.dnd5eapi.co" * /


    async function getSpells() {

        const response = await fetch(
            "https://www.dnd5eapi.co/api/2014/spells"
        );

        const data = await response.json();

        const spellList = document.getElementById("spell-list");

        data.results.forEach((spell) => {

            const spellElement = document.createElement("p");

            spellElement.textContent =
                `${spell.name} - Level ${spell.level}`;

            spellList.appendChild(spellElement);

        });
    }

    getSpells();

    const spellList = document.getElementById("spell-list");

data.results.forEach((spell) => {

    const spellElement = document.createElement("p");

    spellElement.textContent = spell.name;

    spellElement.addEventListener("click", async () => {

        const response = await fetch(
            `https://www.dnd5eapi.co${spell.url}`
        );

        const spellData = await response.json();

        console.log(spellData);
    });

    spellList.appendChild(spellElement);
});