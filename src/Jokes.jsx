import { useEffect, useState } from "react";

function Jokes({ displayPunchline, loadJoke, joke }) {
  const [jokes, setJokes] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setIsError(undefined);

    fetch("https://official-joke-api.appspot.com/random_joke", {
      signal: controller.signal,
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return Promise.reject(res);
        }
      })
      .then((data) => {
        setJokes(data);
      })
      .catch((e) => {
        if (e.name === "AbortError") return;
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
      <h1>Then/Catch</h1>
      {jsx}
      {/* joke setup */}
      <div>{jokes && <p>{jokes.setup}</p>}</div>
      <button onClick={() => displayPunchline(jokes)}>
        Display Punchline{" "}
      </button>
      {/* create a toggle to toggle the joke */}
      <button onClick={() => loadJoke()}>New Joke </button>
    </>
  );
}

export default Jokes;
