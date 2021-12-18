import Head from "next/head";
import Center from "../components/Center";
import Sidebar from "../components/Sidebar";
import { getSession, useSession } from "next-auth/react";
import Player from "../components/Player";
import { useRouter } from "next/dist/client/router";
import Body from "../components/Body";

export default function Home() {
  const router = useRouter();
  const { status, data: session } = useSession({
    onUnauthenticated() {
      router.push("auth/login");
    },
  });

  //if (status === "loading") {
  //return <Loader />;
  //

  // console.log(session);

  return (
    <div className="bg-black h-screen overflow-hidden">
      {/*<Head>
        <title>Spotify 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>*/}
      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      <div className="sticky bottom-0 ">
        <Player />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
