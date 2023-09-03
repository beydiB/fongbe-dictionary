// Load the JSON data (assuming 'fongbe.json' is in the same directory)
fetch("fongbe.json")
  .then((response) => response.json())
  .then((data) => {
    const result = document.getElementById("result");
    const sound = document.getElementById("sound");
    const btn = document.getElementById("search-btn");
    const input = document.getElementById("inp-word")

    // Function to handle the search
    const handleSearch = () => {
      const word = input.value.trim().toLowerCase();

      // Find the word entry in the data array
      const wordEntry = data.find((entry) => entry.word === word);

      if (wordEntry) {
        // If the word is found, display its definitions
        const definitions = wordEntry.definition[0];
        document.querySelector('h3').textContent = definitions;
      } else {
        // If the word is not found, display a message
        document.querySelector('h3').textContent = "Word not found in the dictionary.";
      }
      document.getElementById("result").style.display = "flex"
    };

    // Event listener for the "Search" button click
    btn.addEventListener("click", handleSearch);

    // Event listener for the "Enter" key press in the input field
    input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    });
  });
