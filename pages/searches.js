import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Player from "../components/Player";
import Body from "../components/Body";

import useSpotify from "../hooks/useSpotify";

function Searches() {
  const spotifyapi = useSpotify();
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex">
          <Sidebar />
          {/* Create another component here for the search page since this is going to be the only diff thing on the search page */}
          <Body spotifyAPI={spotifyapi} />
        </div>

        <div className="sticky bottom-0">
          <Player />
        </div>
      </main>
    </div>
  );
}

export default Searches;
