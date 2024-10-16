let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text);
    
    // Adjusting rate and pitch to sound like a child
    text_speak.rate = 1.2;  // Slightly faster for a younger sound
    text_speak.pitch = 1.8; // Higher pitch to mimic a girl's voice
    text_speak.volume = 1;
    text_speak.lang = "hi-IN"; // You can change to "hi-IN" or other languages if needed

    // Get available voices
    let voices = window.speechSynthesis.getVoices();

    // Find a voice that sounds like a young girl (fallback to first available voice if not found)
    let femaleVoice = voices.find(voice => voice.name.includes("Google UK English Female") || voice.name.includes("Zira") || voice.name.includes("Female"));
    
    text_speak.voice = femaleVoice || voices[0];

    // Speak the text
    window.speechSynthesis.speak(text_speak);
}

function wishMe(){
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir, I am your little assistant");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir, I am here to help");
    } else {
        speak("Good Evening Sir, how can I assist you?");
    }
}

window.addEventListener('load', () => {
    // Ensure voices are loaded before running wishMe
    window.speechSynthesis.onvoiceschanged = () => {
        wishMe();
    };
});

let speechRecognition = window.speechRecognisation || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello! How can I help you today?");
    } else if (message.includes("who are you")) {
        speak("I am Mistu, your virtual assistant!");
    } else if (message.includes("i love you")) {
        speak("I love you too, My Aditya Ji");
    } else if (message.includes("how are you")) {
        speak("I am Fine, And you sir"); 
    } else if (message.includes("marry me")) {
        speak("Yes!, i am wife of Aditya Devraj");   
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.co.in", "_blank");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The time is " + time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak("Today is " + date);
    } else {
        let finalText = "Here is what I found on the internet about " + message.replace("Mistu", "");
        speak(finalText);
        window.open("https://www.google.com/search?q=" + message);
    }
}
