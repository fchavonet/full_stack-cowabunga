import { useEffect } from "react";
import { setRandomFavicon } from "./utils/favicon";
import "./App.css";

function App() {
  useEffect(() => {
    setRandomFavicon([
      "/favicons/leonardo.png",
      "/favicons/michelangelo.png",
      "/favicons/donatello.png",
      "/favicons/raphael.png"
    ]);
  }, []);

  return (
    <>
      <h1>Cowabunga</h1>
    </>
  );
}

export default App;
