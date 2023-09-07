// Define audioElement and sound here at the top
const audioElement = document.getElementById("sound");

// Function to play audio
const playSound = (audioSource) => {
  audioElement.src = 'assets/' + audioSource;
  audioElement.load(); // Reload the audio element
  audioElement.play(); // Play the audio
};

// Function to display word definitions and examples
const displayWordInfo = (wordEntry) => {
  let html = "";

  wordEntry.definitions.forEach((element) => {
    html += `<div class="word-meaning">`;

    // Display the definition and audio button if available
    html += `<h3>${element.definition}</h3>`;
    if (element.audio) {
      html += `<button><i id="play" data-audio=${element.audio} class="fa-solid fa-volume-low"></i></button>`;
    }

    html += `</div>`;

    // Display examples if available
    if (element.examples) {
      element.examples.forEach((example, i) => {
        html += `<div class="word-example">
          <p class="fongbe-sentence">${example}</p>
          <p class="french-sentence">${element.examplesFR[i]}</p>
        </div>`;
      });
    }
  });

  document.querySelector(".result").innerHTML = html;
  console.log(html);
};

// Function to handle the search
const handleSearch = () => {
  const input = document.getElementById("inp-word");
  const word = input.value.trim().toLowerCase();

  // Load the JSON data (assuming 'fongbe.json' is in the same directory)
  fetch("fongbeA.json")
    .then((response) => response.json())
    .then((data) => {
      const wordEntry = data[word];
      console.log(wordEntry);

      if (wordEntry) {
        displayWordInfo(wordEntry);
      } else {
        document.querySelector("h3").textContent =
          "Word not found in the dictionary.";
      }

      document.getElementById("result").style.display = "block";
    });
};

// Event listener for the "Search" button click
const btn = document.getElementById("search-btn");
btn.addEventListener("click", handleSearch);

// Event listener for the "Enter" key press in the input field
const input = document.getElementById("inp-word");
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

// Event listener for the "Play Sound" button click

document.body.addEventListener("click", (event) =>{
  if(event.target.id === 'play') {
    let audioSource = event.target.dataset.audio
    playSound(audioSource)
  }
})