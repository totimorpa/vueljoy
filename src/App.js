import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login/login.js";
import LoadingScreen from "./components/loading/loading";
import Question from "./components/question/question.js";
import Ranking from "./components/ranking/ranking.js";
import { useState } from "react";
import SockJS from "sockjs-client";

function App() {
  const [loadingGame, setLoadingGame] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  var sock = new SockJS("http://192.168.253.20:8080/gs-guide-websocket");

  sock.onopen = function () {
    console.log("open");
    sock.send("test");
  };

  sock.onmessage = function (e) {
    console.log("message", e.data);
    sock.close();
  };

  sock.onclose = function () {
    console.log("close");
  };

  function onLogin(name, seat) {
    console.log("onLogin");
    console.log(name, seat);
  }

  return (
    <div className="App">
      {/* <Login onLogin={onLogin}></Login> */}
      <LoadingScreen prompt="Waiting for game to start" />
      {/* <LoadingScreen prompt="Wainting for everyone to answer" /> */}
      {/* <Ranking
        players={[
          { id: 123242, name: "Row 1", score: 200 },
          { id: 987654, name: "Row 2", score: 500 },
          { id: 456321, name: "Row 3", score: 1000 },
          { id: 789654, name: "Row 4", score: 750 },
          { id: 234567, name: "Row 5", score: 1500 },
        ]}
      ></Ranking> */}
      {/* <Question
        question={
          "What is the name of the art museum located in Trafalgar Square?"
        }
        answers={[
          "National Gallery",
          "Tate Modern",
          "Victoria and Albert Museum",
          "British Museum",
        ]}
        onAnswer={(answer) => console.log(answer)}
      ></Question> */}
    </div>
  );
}

export default App;
