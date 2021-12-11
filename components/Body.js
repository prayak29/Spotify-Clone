import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Search from "./Search";

function Body({ spotifyapi }) {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyapi.setAccessToken(accessToken);
  }, [accessToken]);

  //searching...
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    spotifyapi.searchTracks(search).then((res) => {
      setSearchResults(res);
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
