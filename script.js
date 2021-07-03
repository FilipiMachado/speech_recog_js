const button = document.querySelector("button");
const text = document.querySelector(".border");

let listening = false;

const createRecognition = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition =
    SpeechRecognition !== undefined ? new SpeechRecognition() : null;

  if (!recognition) {
    text.innerHTML = "Speech Recognition is not found!";
    return null;
  }

  recognition.lang = "pt_BR";

  recognition.onstart = () => (listening = true);
  recognition.onend = () => (listening = false);
  recognition.onerror = (e) => console.log("error", e);
  recognition.onresult = (e) => (text.innerHTML = e.results[0][0].transcript);

  return recognition;
};

const recognition = createRecognition();

button.addEventListener("click", (e) => {
  if (!recognition) return;

  listening ? recognition.stop() : recognition.start();

  button.innerHTML = listening ? "Push to Talk again" : "Parar de escutar";

  button.classList.toggle("background");
});
