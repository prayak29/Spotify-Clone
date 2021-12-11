import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

function Login({ providers }) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  return (
    <div className="flex  flex-col items-center bg-black min-h-screen w-full justify-center">
      <img
        className="w-52 mb-5 animate-pulse"
        src="https://links.papareact.com/9xl"
        alt=""
      />{" "}
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#18D860] text-white p-5 rounded-full "
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            LOG IN with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
