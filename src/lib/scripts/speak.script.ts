export function textToSpeech(text: string) {
    let speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
}