import { useState, useEffect } from 'react'

import { getRecentlyPlayedSongs } from "~/requests/getRecentlyPlayedSongs";
import MusicScape from './MusicScape';

interface RecentlyPlayedSongsProps {
    token: string;
}

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


function RecentlyPlayedSongs({ token }: RecentlyPlayedSongsProps){
    const [songData, setSongData] = useState<songData | null>(null);

    async function getSongData() {
        try {
          // use await to get the value of the promise
          const data: songData = await getRecentlyPlayedSongs(token);
          // set the state with the data
          setSongData(data);
        } catch (error) {
          console.error(error);
        }
      }

    useEffect(() => {
        getSongData();
    }, []);
    


    return (
        <div>
          {songData ? (
            <MusicScape 
              username=""
              songData = {songData} />
          ) : (
            <div>Loading...</div>
          )}
        </div>
      );
}

export default RecentlyPlayedSongs;