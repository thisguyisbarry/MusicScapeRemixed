export async function getRecentlyPlayedSongs(token: string){
    const url: string = "https://api.spotify.com/v1/me/player/recently-played?limit=50";
    const res = await fetch(url, {
        headers: {
            'Authorization' : 'Bearer ' + token
        }
    });

    const data = await res.json()

    if (res.ok){
        const songs: Array<{ track: { id: string } }>  = data.items;
        getSongData(songs, token);
    } else {
        throw new Error("Failed to fetch recently played songs");
    }
    return token;
}

async function getSongData(songs: Array<{ track: { id: string } }>, token: string){
    const url: string = "https://api.spotify.com/v1/audio-features/"

    //console.log(songs);

    songs.forEach(async song  =>{
        let songID: string = song.track.id;
        // console.log(songID)

        let res = await fetch(url + songID, {
            headers:{
                'Authorization' : 'Bearer ' + token
            }
        });
    })
}
     
