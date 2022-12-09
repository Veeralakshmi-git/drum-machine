import { useState,useEffect } from 'react'
import './App.css'

const firstSoundsGroup = [
  {
    keyCode: 81,
    key: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    key: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    key: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    key: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    key: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    key: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    key: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    key: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    key: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const secondSoundsGroup = [
  {
    keyCode: 81,
    key: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    key: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    key: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    key: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    key: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    key: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    key: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    key: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    key: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

const soundsName = {
  heaterKit:"Heater Kit",
  smoothPianoKit:"Smooth Piano Kit"
}

const soundsGroup ={
  heaterKit:firstSoundsGroup,
  smoothPianoKit:secondSoundsGroup
}

const KeyboardKey = (({play,sound:{id,key,url,keyCode}}) => {
  const handleKeyDown = (event) => {
      if(event.keyCode ===  keyCode){
        play(key,id)
        console.log(id)
      }
  }
  useEffect(()=> {
    document.addEventListener("keydown",handleKeyDown)
  },[])
  return (
    <button id={keyCode} className="drum-pad" onClick={() => play(key,id)}>
      <audio className="clip" id={key} src={url}></audio>{key}
    </button>
  )
})

const Keyboard = ({play,power,sounds}) => (
  <div className='keyboard'>
    
    {power ? sounds.map((sound) => <KeyboardKey play={play} sound={sound} />) 
      : sounds.map((sound) => <KeyboardKey play={play} sound={{...sound,url:"#"}} />)  
  }
   </div>
)

const DrumControle = ({name,power,stop,changeSoundGroup,volume,handleVolumeChange}) => (
  <div className="controle">
    <button onClick={stop}>Turn the Power {power ? "OFF" : "ON"}</button>
    <h2>Volume:%{Math.round(volume * 100)}</h2>
    <input 
    max="1" 
    min="0" 
    step='0.01' 
    type="range" 
    value={volume} 
    onChange={handleVolumeChange} 
    />
    <h2 id="display">{name}</h2>
    <button onClick={changeSoundGroup}> Change Sound group</button>
  </div>
)

function App() {
  const [power,setPower]=useState(true)
  const [volume,setVolume] = useState(1)
  const [soundName,setSoundName] = useState("")
  const [soundType,setSoundType] = useState("heaterKit")
  const [sounds,setSounds] = useState(soundsGroup[soundType])
  
  const stop =() =>{
    setPower(!power)
  }
  const handleVolumeChange = (event) => {
      setVolume(event.target.value)
  }

  const styleActiveKey = (audio) => {
      audio.parentElement.style.backgroundColor = "#000000"
      audio.parentElement.style.color = "#ffffff"
  }

  const deActivateAudio = (audio) => {
    setTimeout(() => {
      audio.parentElement.style.backgroundColor = "#ffffff"
      audio.parentElement.style.color = "#000000"
    },300)  
  }

  const play = (key,sound) => {
    setSoundName(sound)
    const audio = document.getElementById(key)
    styleActiveKey(audio)
    audio.currentTime = 0
    audio.play()
    deActivateAudio(audio)
  }
  const changeSoundGroup = () => {
   setSoundName("")
      if(soundType === "heaterKit"){
        setSoundType("smoothPianoKit")
        setSounds(soundsGroup.smoothPianoKit)
      }else{
        setSoundType("heaterKit")
        setSounds(soundsGroup.heaterKit)
      }
  } 
  const setkeyVolume =() => {
    const audios = sounds.map(sound => document.getElementById(sound.key))
    audios.forEach(audio => {
      console.log("äudio",audio)
      if(audio){
        audio.volume=volume
        console.log("volume",volume)
      }
    })
  }
 
  return ( 
    <div id="drum-machine" className="App">
      {setkeyVolume()}
      <div className='wrapper'>
        <Keyboard play={play} power={power} sounds={sounds} />
        <DrumControle 
        stop={stop}
        power={power}
        volume={volume}
        handleVolumeChange={handleVolumeChange}
        name={soundName || soundsName[soundType]} 
        changeSoundGroup={changeSoundGroup} 
        />
       </div>
    </div>
  )
}

export default App
