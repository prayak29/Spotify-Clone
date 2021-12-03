import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

function Sidebar() {
  const spotifyApi = useSpotify();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  console.log("You picked playlist..........", playlistId);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="text-gray-500  p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm-max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36 ">
      <div className="space-y-4">
        <div className="flex space-x-1">
          <img
            className="w-25 items-center -ml-1 mb-2 cursor-pointer md:w-[110px]"
            src="https://rb.gy/y9mwtb"
            alt=""
          />
        </div>
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p> Home </p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <router href="/Body">
            <Link href="/searches">
              <p> Search </p>
            </Link>
          </router>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p> Your Library </p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900"></hr>
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p> Create PlayList </p>{" "}
        </button>{" "}
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p> Liked Songs </p>{" "}
        </button>{" "}
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p> Your episodes </p>{" "}
        </button>{" "}
        <hr className="border-t-[0.1px] border-gray-900" />
        {/*PLayList songs */}
        <div className="h-60 space-y-3 overflow-y-scroll scrollbar-hide">
          {playlists.map((playlist) => (
            <p
              className="cursor-pointer hover:text-white"
              key={playlist.id}
              onClick={() => setPlaylistId(playlist.id)}
            >
              {playlist.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
