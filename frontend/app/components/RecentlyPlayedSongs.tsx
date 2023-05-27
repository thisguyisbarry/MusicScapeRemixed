import { getRecentlyPlayedSongs } from "~/requests/getRecentlyPlayedSongs";

interface RecentlyPlayedSongsProps {
    token: string;
}

function RecentlyPlayedSongs({ token }: RecentlyPlayedSongsProps){
    const songs = getRecentlyPlayedSongs(token);
    return(
        <div>

        </div>
    )
}

export default RecentlyPlayedSongs;