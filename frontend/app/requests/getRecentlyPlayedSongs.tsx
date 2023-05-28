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


export async function getRecentlyPlayedSongs(token: string){
    const url: string = "https://api.spotify.com/v1/me/player/recently-played?limit=50";
    
    const res = await fetch(url, {
        headers: {
            'Authorization' : 'Bearer ' + token
        }
    });

    const data = await res.json();

    if (res.ok){
        const songs: Array<{ track: { id: string } }>  = data.items;

        // Calculating the time difference between when first and last song were played
        const startTime: number = Date.parse(data.items[data.items.length-1].played_at);
        const endTime: number = Date.parse(data.items[0].played_at);
        let timeDifference: number = (endTime - startTime) / (1000*60*60); //hours between last and most recent

        if (timeDifference < 10) {
            timeDifference = 0;
            console.log('timeDifference' + 0)
        } else if (timeDifference > 10 && timeDifference < 18) {
            timeDifference = 1;
            console.log('timeDifference' + 1)
        } else {
            timeDifference = 2;
            console.log('timeDifference' + 2)
        }

        let songData: songData = await getSongData(songs, token);

        songData.timeDifference = timeDifference;

        console.log(songData);
        return songData;

    } else {
        throw new Error("Failed to fetch recently played songs");
    }
    
}

async function getSongData(songs: Array<{ track: { id: string } }>, token: string): Promise<songData>{
    const url: string = "https://api.spotify.com/v1/audio-features/"

    let songDataObect: songData = {
        danceability: 0,
        key: [],
        loudness: 0,
        valence: 0,
        tempo: 0,
        mode: 0,
        energy: 0,
        speechiness: 0,
        acousticness: 0,
        instrumentalness: 0,
        liveness: 0,
        timeDifference: 0
    };

    songs.forEach(async song  =>{
        let songID: string = song.track.id;

        let res = await fetch(url + songID, {
            headers:{
                'Authorization' : 'Bearer ' + token
            }
        });

        const data = await res.json();

        if(res.ok){
            songDataObect.danceability      += data.danceability;
            songDataObect.key.push(data.key);
            songDataObect.loudness          += data.loudness;
            songDataObect.valence           += data.valence;
            songDataObect.tempo             += data.tempo;
            songDataObect.mode              += data.mode;
            songDataObect.energy            += data.energy;
            songDataObect.speechiness       += data.speechiness;
            songDataObect.acousticness      += data.acousticness;
            songDataObect.instrumentalness  += data.instrumentalness;
            songDataObect.liveness          += data.liveness;
            songDataObect.timeDifference    += data.timeDifference;
        } else if(res.status === 429){
            throw new Error("Rate limited, probably duplicate song, skipping anyway. Song:" + songID);
        } else{
            throw new Error("Failed to fetch song meta data. Song:" + songID);
        }
    })
    console.log("Key " + songDataObect.key);
    songDataObect.danceability      = songDataObect.danceability / songs.length;
    songDataObect.key               = [mostCommonNumber(songDataObect.key)];
    songDataObect.loudness          = songDataObect.loudness / songs.length;
    songDataObect.valence           = songDataObect.valence / songs.length;
    songDataObect.tempo             = songDataObect.tempo / songs.length;
    songDataObect.mode              = songDataObect.mode / songs.length;
    songDataObect.energy            = songDataObect.energy / songs.length;
    songDataObect.speechiness       = songDataObect.speechiness / songs.length;
    songDataObect.acousticness      = songDataObect.acousticness / songs.length;
    songDataObect.instrumentalness  = songDataObect.instrumentalness / songs.length;
    songDataObect.liveness          = songDataObect.liveness / songs.length;
    songDataObect.timeDifference    = songDataObect.timeDifference / songs.length;
    console.log(songDataObect);
    return songDataObect;
}


function mostCommonNumber(array: number[]): number {
    if (array.length === 0){ 
        return -1
    } 
    let modeMap: Record<number, number> = {}; // create an object to store the frequency of each number
    let maxEl = array[0]; // initialize the most common number as the first element
    let maxCount = 1; // initialize the maximum frequency as 1
    for (let el of array) { 
      modeMap[el] = (modeMap[el] || 0) + 1; 
      if (modeMap[el] > maxCount) { 
        maxEl = el; 
        maxCount = modeMap[el]; 
      }
    }
    return maxEl; // return the most common number
  }
