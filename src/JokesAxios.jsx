import { useEffect, useState } from "react";
import axios from "axios";

function JokesAxios({ displayPunchlineAxios, loadJoke, joke }) {
  const [jokes, setJokes] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setIsError(undefined);

    axios("https://official-joke-api.appspot.com/random_joke", {
      signal: controller.signal,
    })
      .then((res) => setJokes(res.data))
      .catch((e) => {
        if (e?.name === "CancelledError") return;
        setIsError(true);
      })
      .finally(() => {
        if (controller.signal.aborted) return;
        setIsLoading(false);
      });
    return () => {
      controller.abort();
    };
  }, [joke]);
  // you could also do ternary conditional rendering
  let jsx;
  if (isLoading) {
    jsx = <h1>Loading...</h1>;
  } else if (isError != null) {
    jsx = <h2>Error!</h2>;
  }

  return (
    <>
      <h1>Axios</h1>
      {jsx}
      {/* joke setup */}
      <div>{jokes && <p>{jokes.setup}</p>}</div>
      <button onClick={() => displayPunchlineAxios(jokes)}>
        Display Punchline{" "}
      </button>
      {/* create a toggle to toggle the joke */}
      <button onClick={() => loadJoke()}>New Joke </button>
    </>
  );
}

export default JokesAxios;
