import { useEffect } from "react";
import { setRandomFavicon } from "./utils/favicon";
import Header from "./components/Header";
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
      <Header />
    </>
  );
}

export default App;
