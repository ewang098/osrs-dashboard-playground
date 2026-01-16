const button = document.getElementById("loadBtn");
const resultDiv = document.getElementById("result");

// TODO: move https://runescape.wiki/w/Application_programming_interface to readme

const BASE_ROUTE =  "https://secure.runescape.com/m=itemdb_oldschool/api/";

const ITEM_MAP = new Map(
    // bars
    ["addy_bar", 2361]
    ["rune_bar", 2363],
    // ores
    ["addy_ore", 449],
    ["rune_ore", 451],
    // equipables
    ["addy_platebody", 1123],
    ["rune_2h_sword", 1319],
);

const ROUTE_MAP = new Map(
    ["item_details", "catalogue/detail.json?item="],
)

button.addEventListener("click", async () => {
    try {
        // make route
        const addyBarRoute = BASE_ROUTE + ROUTE_MAP.get("item_details") + ITEM_MAP.get("addy_bar");
        
        // Fetch
        const response = await fetch(addyBarRoute);
        const data = await response.json();

        // Display the result
        resultDiv.innerText = data.value;
    } catch (error) {
        resultDiv.innerText = "Error fetching data!";
        console.error(error);
    }
});
