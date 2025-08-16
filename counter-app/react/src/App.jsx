import { useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <>
      <h1>カウンター</h1>
      <div>{counter}</div>
      <button onClick={increment}>+1</button>
    </>
  );
}

export default App;
