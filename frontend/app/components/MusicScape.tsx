

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

function MusicScape(username : string,songData : songData) {
    return (
      <div>
        <div id="canvasDiv"></div>
        <div className="t1">
          <a id="username">{username}</a>
          <a>'s musicScape</a>
          <span className="tooltiptext">
            <p>
              The <b>backgound</b> of your musicScape is{" "}
              <a id="valenceColor">{valenceColor}</a> because you've recently
              listened to music that relates to <b id="valenceString">{props.valenceString}</b>{" "}
              emotions.
            </p>
            <p>
              It's <b id="daynighttime">{daynighttime}</b> in your musicScape
              because your recent music is mostly in <b id="mode">{props.mode}</b>{" "}
              mode.
            </p>
            <p>
              The mountains are <a id="energy">{props.energy}</a> jagged because
              you've listened to <b><a id="energy1">{props.energy1}</a> energetic</b>{" "}
              songs.
            </p>
            <p>
              You've been <b><a id="listener">{props.listener}</a> listener</b>{" "}
              during the past 24 hours, so your musicScape has{" "}
              <a id="pairsMountains">{props.pairsMountains}</a> of mountains.
            </p>
            <p>
              The <b>mountains</b> are tones of{" "}
              <a id="keyColor">{props.keyColor}</a> because your songs are mostly
              in the <b>key</b> <a id="keyName">{props.keyName}</a>.
            </p>
          </span>
        </div>
      </div>
    );
  }
  
  // Export the component
  export default MusicScape;