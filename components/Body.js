import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Search from "./Search";
import useSpotify from "../hooks/useSpotify";

function Body() {
  const { data: session } = useSession();
  const spotifyapi = useSpotify();
  const accessToken = session?.accessToken;
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  //searching...
  useEffect(() => {
    if (!search) return setSearchResults([]);

    spotifyapi.searchTracks(search).then((res) => {
      setSearchResults(
        res.body.tracks.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
            popularity: track.popularity,
          };
        })
      );
    });
  }, [search, accessToken]);

  console.log(searchResults);

  return (
    <section className="bg-black ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5 h-screen">
      <Search search={search} setSearch={setSearch} />
      <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4"></div>
    </section>
  );
}

export default Body;
