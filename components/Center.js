import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

function Center() {
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const spotifyApi = useSpotify();
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  console.log(playlistId);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("Something went wrong!", err));
  }, [spotifyApi, playlistId]);

  console.log(playlist);

  // Use the useEffect from our spotify redesign build for our recentlyPlayed playlists so you can fetch the recentlyPlayed and then set it to setRecentlyPlayed inside useRecoilState

  return (
    <div className=" flex-grow h-screen overflow-y-scroll scrollbar-hide ">
      <header className="absolute flex  space-x-[980px] top-5 right-8 justify-evenly">
        <div
          className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white"
          onClick={signOut}
        >
          <img
            className="rounded-full w-10 h-10"
            src={session?.user.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-10 `}
      >
        <img
          className="h-48 w-48 shadow-xl "
          src={playlist?.images?.[0]?.url}
          alt=""
        />
        <div>
          <p className="text-sm  font-bold">PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-extrabold mb-3">
            {playlist?.name}
          </h1>
          <h1 className="pt-1 text-gray-400">{playlist?.description}</h1>
          <div className="flex space-x-1">
            <h2 className="text-white cursor-pointer underline">
              {playlist?.owner.display_name}.
            </h2>
            <p className="text-gray-400"> {playlist?.followers.total} likes</p>
          </div>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
