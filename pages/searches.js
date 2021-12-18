import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Player from "../components/Player";
import Body from "../components/Body";
import { useRecoilState } from "recoil";
import { playingTrackState } from "../atoms/playAtom";

import useSpotify from "../hooks/useSpotify";

function Searches() {
  const spotifyapi = useSpotify();
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  return (
    <div>
      <main className="flex min-h-screen min-w-max">
        <Sidebar />
        {/* Create another component here for the search page since this is going to be the only diff thing on the search page */}
        <Body spotifyAPI={spotifyapi} chooseTrack={chooseTrack} />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
}

export default Searches;
