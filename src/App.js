import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login/login.js";
import LoadingScreen from "./components/loading/loading.js";
import Question from "./components/question/question.js";
import Ranking from "./components/ranking/ranking.js";
import { useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { AppBar } from "@mui/material";

function App() {
  const [loadingGame, setLoadingGame] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  var sock = new SockJS("http://192.168.253.20:8080/ws");

  let stompClient = Stomp.over(sock); //-----------------------

  sock.onopen = function () {
    console.log("open");
    //sock.send("test");

    stompClient.subscribe("/topic/greetings", function (greeting) {
      console.log(greeting);
      //you can execute any function here
    });
  };

  //   stompClient.connect({}, function (frame) {
  //     console.log('Connected: ' + frame);
  //     stompClient.subscribe('/topic/greetings', function (greeting) {
  //       console.log(greeting);
  //       //you can execute any function here
  //     });
  //  });

  // sock.onmessage = function (e) {
  //   console.log("message", e.data);
  //   sock.close();
  // };

  // sock.onclose = function () {
  //   console.log("close");
  // };

  function onLogin(name, seat) {
    console.log("onLogin");
    console.log(name, seat);
    //sock.send(name, seat);
    stompClient.send(
      "/app/register",
      {},
      JSON.stringify({ name: name, seat: seat })
    );
    setLoadingGame(true);
  }

  return (
    <div className="App">
      {/* {!loadingGame && !gameStarted && <Login onLogin={onLogin} />}
      {loadingGame && !gameStarted && (
        <LoadingScreen prompt="Waiting for game to start" />
      )} */}
      {/* <LoadingScreen prompt="Waiting for game to start" /> */}
      {/* <LoadingScreen prompt="Wainting for everyone to answer" /> */}
      <Ranking
        players={[
          { id: 123242, name: "Row 1", score: 200 },
          { id: 987654, name: "Row 2", score: 500 },
          { id: 456321, name: "Row 3", score: 1000 },
          { id: 789654, name: "Row 4", score: 750 },
          { id: 234567, name: "Row 5", score: 1500 },
        ]}
      ></Ranking>
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
