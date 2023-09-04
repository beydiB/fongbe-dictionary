// Define audioElement here at the top
const audioElement = document.getElementById("sound");

// Load the JSON data (assuming 'fongbe.json' is in the same directory)
fetch("fongbeA.json")
  .then((response) => response.json())
  .then((data) => {
    const result = document.getElementById("result");
    const sound = document.getElementById("play");
    const btn = document.getElementById("search-btn");
    const input = document.getElementById("inp-word");

    const playSound = () => {
      console.log('clicked');
      audioElement.load(); // Reload the audio element
      audioElement.play(); // Play the audio
    };

    // Function to handle the search
    const handleSearch = () => {
      const word = input.value.trim().toLowerCase();

      // Find the word entry in the data array
      const wordEntry = data[word];
      console.log(wordEntry);

      if (wordEntry) {
        // If the word is found, display its definitions
        const definitions = wordEntry.definitions[0].definition;
        document.querySelector('h3').textContent = definitions;

        const audioSource = wordEntry.definitions[0].audio;
        if (audioSource) {
          audioElement.src = 'assets/'+ audioSource;
          document.querySelector('#play').style.display = 'inline'

        } else{
          document.querySelector('#play').style.display = 'none'
        }
      } else {
        // If the word is not found, display a message
        document.querySelector('h3').textContent = "Word not found in the dictionary.";
      }

      if (wordEntry.definitions[0].examples[0]) {
        document.querySelector('.fongbe-sentence').textContent = wordEntry.definitions[0].examples[0];
        document.querySelector('.french-sentence').textContent = wordEntry.definitions[0].examplesFR[0];
        document.querySelector('.word-example').style.display = 'block'
      }
      else {
        document.querySelector('.word-example').style.display = 'none'
      }

      document.getElementById("result").style.display = "block";
    };

    // Event listener for the "Search" button click
    btn.addEventListener("click", handleSearch);

    sound.addEventListener("click", playSound);

    // Event listener for the "Enter" key press in the input field
    input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    });
  });

document.addEventListener(''); // You might want to specify an event here
