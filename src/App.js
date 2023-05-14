import "./App.css";
import Login from "./components/login/login.js";
import LoadingScreen from "./components/loading/loading.js";
import Question from "./components/question/question.js";
import Ranking from "./components/ranking/ranking.js";
import { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { AppBar, Toolbar } from "@mui/material";
import logo from "./components/title.png";
import data from "./components/questions/Barcelona.json";

function App() {
  const [loadingGame, setLoadingGame] = useState(false);
  const [waitingAnswers, setWaitingAnswers] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isQuestion, setIsQuestion] = useState(false);
  const [isRanking, setIsRanking] = useState(false);
  const [rankings, setRankings] = useState({});
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);

  const [correctAnswer, setCorrectAnswer] = useState(answers[0]);
  const [playerSeat, setPlayerSeat] = useState("11A");
  const [waitingTime, setWaitingTime] = useState(Date.now());
  const [waitingProp, setWaitingProp] = useState("");

  var sock = new SockJS("http://192.168.253.20:8080/ws");

  let stompClient = Stomp.over(sock);

  useEffect(() => {
    stompClient.connect({}, function (frame) {
      console.log("Connected: " + frame);
      stompClient.subscribe("/topic/broadcast", function (message) {
        if (message.body === "FIRE") {
          return;
        }
        const obj = JSON.parse(message.body);
        console.log(obj.type);

        if (obj.type === "q") {
          if (obj.questionNumber >= 16) {
            setIsQuestion(false);
            setIsRanking(true);
            setWaitingAnswers(false);
            return;
          }
          console.log("question");
          setWaitingAnswers(false);
          setGameStarted(true);
          setIsRanking(false);
          setIsQuestion(true);
          setCorrectAnswer(data[`question${obj.questionNumber}`]["a"][0]);
          setQuestion(data[`question${obj.questionNumber}`]["q"]);
          setAnswers(data[`question${obj.questionNumber}`]["a"]);
          setWaitingTime(Date.now());
        } else if (obj.type === "r") {
          console.log("ranking");
          setIsQuestion(false);
          setIsRanking(true);
          setRankings(obj.r);
          setWaitingAnswers(false);
        }
      });
    });
  }, []);

  function onLogin(name, seat) {
    console.log(name, seat);
    //sock.send(name, seat);
    stompClient.send(
      "/app/register",
      {},
      JSON.stringify({ name: name, seat: seat })
    );
    setPlayerSeat(seat);
    setLoadingGame(true);
  }

  function onAnswer(answer) {
    console.log(answer);
    console.log(correctAnswer);
    console.log(answer === answers[0]);
    console.log(Date.now() - waitingTime);
    setWaitingProp(
      answer === null ? "Oops, too slow!" : "WOW! You were quick. Wait..."
    );
    stompClient.send(
      "/app/submit-answer",
      {},
      JSON.stringify({
        seat: playerSeat,
        isCorrect: answer === correctAnswer,
        time: Date.now() - waitingTime,
      })
    );
    setIsQuestion(false);
    setWaitingAnswers(true);
  }

  return (
    <div className="App">
      <AppBar position="fixed" sx={{ height: 64 }}>
        <Toolbar sx={{ justifyContent: "center", backgroundColor: "#ffcc00" }}>
          <img src={logo} alt="Logo" style={{ height: "100%" }} />
        </Toolbar>
      </AppBar>
      <div className="App-body" style={{ paddingTop: "64px" }}>
        {!loadingGame && !gameStarted && <Login onLogin={onLogin} />}
        {loadingGame && !gameStarted && (
          <LoadingScreen prop="Waiting for game to start" />
        )}
        {waitingAnswers && gameStarted && <LoadingScreen prop={waitingProp} />}
        {isRanking && gameStarted && <Ranking players={rankings}></Ranking>}
        {isQuestion && gameStarted && (
          <Question
            question={question}
            answers={answers}
            onAnswer={onAnswer}
          ></Question>
        )}
      </div>
    </div>
  );
}

export default App;
