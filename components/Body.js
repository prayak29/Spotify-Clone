import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Search from "./Search";
import useSpotify from "../hooks/useSpotify";
import Poster from "./Poster";
import Track from "./Track";

function Body({ chooseTrack }) {
  const { data: session } = useSession();
  const spotifyapi = useSpotify();
  const accessToken = session?.accessToken;
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  console.log(accessToken);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  //searching...
  useEffect(() => {
    if (!search) return setSearchResults([]);
    //if (!accessToken) return;

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

  //console.log(searchResults);

  //New Release
  useEffect(() => {
    if (!search) return setSearchResults([]);

    spotifyapi.getNewReleases().then((res) => {
      setNewReleases(
        res.body.albums.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.images[0].url,
          };
        })
      );
    });
  }, [search, accessToken]);

  //console.log(searchResults);

  return (
    <section className="bg-black ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5 h-screen">
      <Search search={search} setSearch={setSearch} />
      <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4">
        {searchResults.length === 0
          ? newReleases
              .slice(0, 4)
              .map((track) => (
                <Poster
                  key={track.id}
                  track={track}
                  chooseTrack={chooseTrack}
                />
              ))
          : searchResults
              .slice(0, 4)
              .map((track) => (
                <Poster
                  key={track.id}
                  track={track}
                  chooseTrack={chooseTrack}
                />
              ))}
        <div className="=w-full pr-11">
          <h2 className="text-white font-bold mb-3">
            {searchResults.length === 0 ? "New Releases" : "Tracks"}
          </h2>

          <div className="space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll h-[1000px] md:h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 w-[830px]">
            {searchResults.length === 0
              ? newReleases
                  .slice(4, newReleases.length)
                  .map((track) => (
                    <Track
                      key={track.id}
                      track={track}
                      chooseTrack={chooseTrack}
                    />
                  ))
              : searchResults
                  .slice(4, searchResults.length)
                  .map((track) => (
                    <Track
                      key={track.id}
                      track={track}
                      chooseTrack={chooseTrack}
                    />
                  ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Body;
