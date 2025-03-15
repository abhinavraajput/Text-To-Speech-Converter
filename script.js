// Declare the speech object
let speech = new SpeechSynthesisUtterance();

// Declare the voices array
let voices = [];

// Get the select element
let voiceSelect = document.querySelector("select");

// Wait for voices to be loaded
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices(); // Get available voices
  speech.voice = voices[0]; // Set default voice

  // Clear existing options in the dropdown
  voiceSelect.innerHTML = "";

  // Populate the dropdown with available voices
  voices.forEach((voice, i) => {
    voiceSelect.options[i] = new Option(voice.name, i); // Use "Option" (case-sensitive)
  });
};

// Optional: Call getVoices() immediately in case voices are already loaded
voices = window.speechSynthesis.getVoices();
if (voices.length > 0) {
  speech.voice = voices[0];
  voices.forEach((voice, i) => {
    voiceSelect.options[i] = new Option(voice.name, i);
  });
}

// Add event listener to handle voice selection change
voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

// Add event listener to handle button click for speaking
document.querySelector("button").addEventListener("click", () => {
  speech.text = document.querySelector("textarea").value; // Get text from textarea
  window.speechSynthesis.speak(speech); // Speak the text
});