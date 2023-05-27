export async function getRecentlyPlayedSongs(token: string){
    const url = "https://api.spotify.com/v1/me/player/recently-played?limit=50";
    const res = await fetch(url, {
        headers: {
            'Authorization' : 'Bearer ' + token
        }
    });

    const data = await res.json()

    if (res.ok){
        console.log(data.items);
    } else {
        throw new Error("Failed to fetch recently played songs");
    }
    return token;
}