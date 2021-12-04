import Head from "next/head";
import Sidebar from "../components/Sidebar";
import { getSession } from "next-auth/react";
import Player from "../components/Player";

function Searches() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex">
        <Sidebar />
        {/* Create another component here for the search page since this is going to be the only diff thing on the search page */}
      </main>

      <div className="sticky bottom-0 ">
        <Player />
      </div>
    </div>
  );
}

export default Searches;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
