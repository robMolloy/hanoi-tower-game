import "./App.css";
import { Towers } from "./components";

function App() {
  return (
    <div className="App">
      <Towers initData={[[1, 2, 3, 4, 5], [], []]} />
      <Towers />
    </div>
  );
}

export default App;
