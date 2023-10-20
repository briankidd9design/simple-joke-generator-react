import { useState } from "react";
import Jokes from "./Jokes";
import JokesAsync from "./JokesAsync";
import JokesAxios from "./JokesAxios";
function App() {
  // then/catch
  const [data, setData] = useState("");
  // async/await
  const [jokeData, setJokeData] = useState("");
  // axios
  const [jokeDataAxios, setJokeDataAxios] = useState("");
  const [joke, setNewJoke] = useState(false);

  // loads new joke to the UI
  function loadJoke() {
    setNewJoke((joke) => !joke);
    data.punchline = "";
  }
  // then/catch
  function displayPunchline(childData) {
    setData(childData);
  }
  // async/await
  function displayPunchlineAsync(childData) {
    setJokeData(childData);
  }
  // axios
  function displayPunchlineAxios(childData) {
    setJokeDataAxios(childData);
  }
  return (
    <>
      <h1>Tell Me a random Joke</h1>
      <div className="joke"></div>
      <Jokes
        loadJoke={loadJoke}
        joke={joke}
        displayPunchline={displayPunchline}
      />
      <br />
      {/* then/catch */}
      {data.punchline}
      <JokesAsync
        loadJoke={loadJoke}
        joke={joke}
        displayPunchlineAsync={displayPunchlineAsync}
      />
      <br />
      {/* async/await */}
      {jokeData.punchline}
      <JokesAxios
        loadJoke={loadJoke}
        joke={joke}
        displayPunchlineAxios={displayPunchlineAxios}
      />
      <br />
      {/* axios */}
      {jokeDataAxios.punchline}
    </>
  );
}

export default App;
