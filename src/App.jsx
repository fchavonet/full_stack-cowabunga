import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { setRandomFavicon } from "./utils/favicon";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const { user } = useAuth();

  useEffect(() => {
    setRandomFavicon([
      "/favicons/leonardo.png",
      "/favicons/michelangelo.png",
      "/favicons/donatello.png",
      "/favicons/raphael.png"
    ]);
  }, []);

  let content;

  if (!user) {
    content = <HomePage />;
  } else {
    content = <CollectionPage />;
  }

  return (
    <div className="h-screen flex flex-col">
      <Header fixed />

      <main className="pb-12 flex-grow overflow-y-auto">
        {content}
      </main>

      <Footer fixed />
    </div>
  );
}

export default App;
