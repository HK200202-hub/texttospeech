//Inti speechSynth API

const synth =window.speechSynthesis;

//DOM elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');    
const rate= document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

//Intialize voice array
let voices = [];
const getVoices = () => {
    voices = synth.getVoices();
    console.log(voices);
  
  //voiceSelect.innerHTML = voices.map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`).join('');
  //Loop through voices and create option elements
  voices.forEach(voice => {
    //create option element
    const option = document.createElement('option');
    option.textContent=voice.name+'('+voice.lang+')'; 
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
};
getVoices();
if(synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;

}
//speak
const speak = () => {
    //add background animation
    
   //check if speaking
   
    if(synth.speaking) {
        console.error('Already speaking...');
        return;
    }
    if(textInput.value !== '') {
        body.style.background = '#141414 url(./img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';

    //get speak test 
 
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        speakText.onend = e =>{
              console.log('Done speaking...');
              body.style.background = '#141414';}
        //set pitch and rate
        speakText.onerror = e => {
            console.error('Something was wrong...');
        }

    //selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

    //Loop through voices
    voices.forEach(voice =>{
        if(voice.name=== selectedVoice) {
            speakText.voice = voice;
        }
    });

    //set pitch and rate
    speakText.rate = rate.value;    
    speakText.pitch = pitch.value;

    //Speak
    synth.speak(speakText);
        
    }
};
//Event listeners
textForm.addEventListener('submit',e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

//Rate value change
rate.addEventListener('change', e =>  rateValue.textContent = rate.value
)

//Pitch value change
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value
)

//Voice select change
voiceSelect.addEventListener('change', e => speak());