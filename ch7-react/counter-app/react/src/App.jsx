import { useState } from "react";

// カウントの表示とカウントボタンを担うコンポーネント
// カウントの状態も管理する
// colorプロパティを受け取りカウントの色を変更できる
function Counter({ color }) {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <>
      {/* 受け取ったcolorプロパティをstyleに指定する */}
      <div style={{ color: color }}>{count}</div>
      <button onClick={increment}>+1</button>
    </>
  );
}

function App() {
  return (
    <>
      <h1>カウンター</h1>
      {/* colorプロパティにカウントで表示したい色を指定する */}
      <Counter color="red" />
    </>
  );
}

export default App;
