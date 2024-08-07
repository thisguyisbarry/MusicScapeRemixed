import randomColor from "randomcolor";
import lodash from 'lodash';

interface songData{
    danceability: number,
    key: Array<number>,
    loudness: number,
    valence: number,
    tempo: number,
    mode: number,
    energy: number,
    speechiness: number,
    acousticness: number,
    instrumentalness: number,
    liveness: number,
    timeDifference: number
}

interface MusicScapeProps{
    username: string,
    songData: songData
}

function MusicScape({username, songData}: MusicScapeProps) {

    let musicHues: string[] = ['monochrome', 'blue', 'green', 'purple', 'pink', 'red', 'orange', 'yellow'];
    let musicKHues: string[] = ['yellow', 'yellow', 'orange', 'red', 'red', 'pink', 'pink', 'purple', 'blue', 'blue', 'green', 'green'];
    let musicLums: string[] = ['light', 'bright', 'bright', 'bright', 'light', 'bright', 'light', 'bright', 'bright', 'light', 'bright', 'light'];
    let keyNames: string[] = ["C", "C♯/D♭", "D", "D♯/E♭", "E", "F", "F♯/G♭", "G", "G♯/A♭", "A", "A♯/B♭", "B"];

    let backgoundColour1: string;
    let backgroundColour2: string;

    let sunColours: string[] = [];
    let sunSize: number;
    let sunRange: number;
    let sunPosition;

    let landColours = randomColor({
      hue: musicHues[songData.key[0]],
      luminosity: musicLums[songData.key[0]] as "bright" | "light",  // Guaranteeing the type to TypeScipt
      count: 5,
      format: 'rgba',
      alpha: 0.5
    });;

    // This is a number to determine how active a listener someone is
    // Based on time difference between songs
    let landNumber: number;

    if(songData.timeDifference < 10){
      landNumber = 0;
    } else if (songData.timeDifference > 10 && songData.timeDifference < 18) {
      landNumber = 1;
    } else {
      landNumber = 2;
    }




    let valenceColour: string = musicHues[Math.round(map(songData.valence, 0.0, 1.0, 0, 7))]
    

    // Mode Major = day, Minor = Night
    if(songData.mode == 1){
      backgoundColour1 = randomColor({
        hue: valenceColour,
        luminosity: 'light'
      })
      backgroundColour2 = randomColor({
        luminosity: 'light'
      })

      sunColours = randomColor({
        hue: 'yellow',
        count: 2
      })
      sunSize = lodash.random(200,300);
      sunRange = lodash.random(20,50)

    } else{
      backgoundColour1 = randomColor({
        hue: valenceColour,
        luminosity: 'dark'
      })
      backgroundColour2 = randomColor({
        luminosity: 'dark'
      })

      sunColours = randomColor({
        luminosity: 'light',
        hue: 'monochrome',
        count: 2
      })
      sunSize = lodash.random(75,150);
      sunRange = lodash.random(5,10)

    }

    return (
      // <div>
      //   <div id="canvasDiv"></div>
      //   <div className="t1">
      //     <a id="username">{username}</a>
      //     <a>'s musicScape</a>
      //     <span className="tooltiptext">
      //       <p>
      //         The <b>backgound</b> of your musicScape is{" "}
      //         <a id="valenceColor">{valenceColor}</a> because you've recently
      //         listened to music that relates to <b id="valenceString">{songData.valenceString}</b>{" "}
      //         emotions.
      //       </p>
      //       <p>
      //         It's <b id="daynighttime">{daynighttime}</b> in your musicScape
      //         because your recent music is mostly in <b id="mode">{props.mode}</b>{" "}
      //         mode.
      //       </p>
      //       <p>
      //         The mountains are <a id="energy">{props.energy}</a> jagged because
      //         you've listened to <b><a id="energy1">{props.energy1}</a> energetic</b>{" "}
      //         songs.
      //       </p>
      //       <p>
      //         You've been <b><a id="listener">{props.listener}</a> listener</b>{" "}
      //         during the past 24 hours, so your musicScape has{" "}
      //         <a id="pairsMountains">{props.pairsMountains}</a> of mountains.
      //       </p>
      //       <p>
      //         The <b>mountains</b> are tones of{" "}
      //         <a id="keyColor">{props.keyColor}</a> because your songs are mostly
      //         in the <b>key</b> <a id="keyName">{props.keyName}</a>.
      //       </p>
      //     </span>
      //   </div>
      // </div>
    );
  }
  
  // Export the component
  export default MusicScape;

// Changes one value range to map to another range (i.e 0.0 - 1.0 becomes 1-100)
// Like the map function in jQuery (at least for this use case!)
function map(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}