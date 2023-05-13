import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login/login.js";
import LoadingScreen from "./components/loading/loading.js";
import Question from "./components/question/question.js";
import Ranking from "./components/ranking/ranking.js";

function App() {
  return (
    <div className="App">
      {/* <LoadingScreen prompt="Waiting for game to start" /> */}
      {/* <Login></Login> */}
      {/* <Ranking
        players={[
          { id: 123242, name: "Row 1", score: 200 },
          { id: 987654, name: "Row 2", score: 500 },
          { id: 456321, name: "Row 3", score: 1000 },
          { id: 789654, name: "Row 4", score: 750 },
          { id: 234567, name: "Row 5", score: 1500 },
        ]}
      ></Ranking> */}
      <Question
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
      ></Question>
    </div>
  );
}

export default App;
