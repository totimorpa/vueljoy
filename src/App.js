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
  const [isQuestion, setIsQuestion] = useState(false);
  const [isRanking, setIsRanking] = useState(false);
  const [rankings, setRankings] = useState([]);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [playerName, setPlayerName] = useState("");

  var sock = new SockJS("http://192.168.253.20:8080/ws");

  let stompClient = Stomp.over(sock);

  stompClient.connect({}, function (frame) {
    console.log("Connected: " + frame);
    stompClient.subscribe("/topic/greetings", function (message) {
      console.log(message);
    });
  });

  function onLogin(name, seat) {
    console.log(name, seat);
    //sock.send(name, seat);
    stompClient.send(
      "/app/register",
      {},
      JSON.stringify({ name: name, seat: seat })
    );
    setPlayerName(name);
    setLoadingGame(true);
  }

  return (
    <div className="App">
      {!loadingGame && !gameStarted && <Login onLogin={onLogin} />}
      {loadingGame && !gameStarted && (
        <LoadingScreen prompt="Waiting for game to start" />
      )}
      {/* <LoadingScreen prompt="Wainting for everyone to answer" /> */}
      {/* <Ranking
        players={[
          { id: 123242, name: "21A", score: 200 },
          { id: 987654, name: "34F", score: 500 },
          { id: 456321, name: "21C", score: 1000 },
          { id: 789654, name: "21D", score: 750 },
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
