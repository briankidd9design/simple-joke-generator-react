import { useEffect, useState } from "react";

function JokesAsync({ displayPunchlineAsync, loadJoke, joke }) {
  const [jokes, setJokes] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setIsError(undefined);
    const controller = new AbortController();
    async function fetchData() {
      try {
        const response = await fetch(
          "https://official-joke-api.appspot.com/random_joke",
          { signal: controller.signal }
        );
        if (response.status === 200) {
          const data = await response.json();
          setJokes(data);
        } else {
          Promise.reject(response);
        }
      } catch (e) {
        if (e.name === "AbortError") return;
        {
          setIsError(true);
        }
        if (controller.signal.aborted) {
          return;
        }
      } finally {
        // below is an unsafe return
        // if (controller.signal.aborted) return;
        setIsLoading(false);
      }
    }
    fetchData();
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
      <h1>Async/Await</h1>
      {jsx}
      {/* joke setup */}
      <div>{jokes && <p>{jokes.setup}</p>}</div>
      <button onClick={() => displayPunchlineAsync(jokes)}>
        Display Punchline{" "}
      </button>
      {/* create a toggle to toggle the joke */}
      <button onClick={() => loadJoke()}>New Joke </button>
    </>
  );
}

export default JokesAsync;
