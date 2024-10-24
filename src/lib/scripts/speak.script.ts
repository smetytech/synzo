export function speak(message: string) {
    let speech = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(speech);
}