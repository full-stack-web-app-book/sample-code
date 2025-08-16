import { useState } from "react";

function Counter({ color }) {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <>
      <div style={{ color: color }}>{counter}</div>
      <button onClick={increment}>+1</button>
    </>
  );
}

function App() {
  return (
    <>
      <h1>カウンター</h1>
      <Counter color="red" />
    </>
  );
}

export default App;
