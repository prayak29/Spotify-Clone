import Head from "next/head";
import Sidebar from "../components/Sidebar";
<<<<<<< HEAD
import Player from "../components/Player";
import Body from "../components/Body";

import useSpotify from "../hooks/useSpotify";

function Searches() {
  const spotifyapi = useSpotify();
=======
import { getSession } from "next-auth/react";
import Player from "../components/Player";

function Searches() {
>>>>>>> bada27d570e11c9a7ca5c8d1f69389acf9b3bf9b
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
<<<<<<< HEAD
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
=======
      <main className="flex">
        <Sidebar />
        {/* Create another component here for the search page since this is going to be the only diff thing on the search page */}
      </main>

      <div className="sticky bottom-0 ">
        <Player />
      </div>
>>>>>>> bada27d570e11c9a7ca5c8d1f69389acf9b3bf9b
    </div>
  );
}

export default Searches;
<<<<<<< HEAD
=======

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
>>>>>>> bada27d570e11c9a7ca5c8d1f69389acf9b3bf9b
