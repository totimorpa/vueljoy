import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login/login.js";
import LoadingScreen from "./components/loading/loading.js";

function App() {
  return (
    <div className="App">
      <LoadingScreen prompt={"Waiting for all answers"}></LoadingScreen>
    </div>
  );
}

export default App;
