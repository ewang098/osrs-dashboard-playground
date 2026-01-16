const button = document.getElementById("loadBtn");
const itemDivMap = {
    "rune_bar": document.getElementById("resultRuneBar"),
    "rune_ore": document.getElementById("resultRuneOre"),
};
/*
    APIs Used:
        https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices

    Local Development through:
        Live Server Extension
*/

/*
    TODOs:
        styling
        validate styling for desktop + iphone
*/

const BASE_ROUTE =  "https://prices.runescape.wiki/api/v1/osrs/";

const ITEM_MAP = new Map([
    // bars
    ["addy_bar", 2361],
    ["rune_bar", 2363],
    // ores
    ["addy_ore", 449],
    ["rune_ore", 451],
    // equipables
    ["addy_platebody", 1123],
    ["rune_2h_sword", 1319],
]);

function getRoute(itemId) {
    return `${BASE_ROUTE}latest?id=${itemId}`;
}

function processPriceData(priceData) {
    var [highPriceTime, lowPriceTime] = [
        new Date(priceData.highTime * 1000).toLocaleTimeString(),
        new Date(priceData.lowTime * 1000).toLocaleTimeString(),
    ];

    return `${priceData.high} at ${highPriceTime}, ${priceData.low} at ${lowPriceTime}`;
}

async function fetchAndDisplayPrice(itemId, displayDiv) {
    try {
        const route = getRoute(itemId);
        console.log("Fetching:", route);

        // Optionally show a loading message for each item
        displayDiv.innerText = "Loading...";

        const response = await fetch(route);
        const responseJSON = await response.json();
        const priceData = responseJSON.data[itemId];

        if (!priceData) throw new Error("No data returned");

        const result = processPriceData(priceData);
        displayDiv.innerText = result;
    } catch (error) {
        displayDiv.innerText = "Error fetching data!";
        console.error(`Error fetching item ${itemId}:`, error);
    }
}

button.addEventListener("click", async () => {
    const promises = Object.entries(itemDivMap).map(([itemKey, div]) => {
        const itemId = ITEM_MAP.get(itemKey);
        return fetchAndDisplayPrice(itemId, div);
    });

    await Promise.all(promises);
});
