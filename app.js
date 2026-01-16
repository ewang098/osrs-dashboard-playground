const button = document.getElementById("loadBtn");
const resultDiv = document.getElementById("result");

button.addEventListener("click", async () => {
    try {
        // Fetch a public API
        const response = await fetch("https://api.chucknorris.io/jokes/random");
        const data = await response.json();

        // Display the result
        resultDiv.innerText = data.value;
    } catch (error) {
        resultDiv.innerText = "Error fetching data!";
        console.error(error);
    }
});
