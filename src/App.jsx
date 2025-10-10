import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { setNextFavicon } from "./utils/favicon";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const { user } = useAuth();

  useEffect(() => {
    if (!window.__faviconSet) {
      window.__faviconSet = true;
      setNextFavicon([
        "/favicons/leonardo.png",
        "/favicons/michelangelo.png",
        "/favicons/donatello.png",
        "/favicons/raphael.png"
      ]);
    }
  }, []);

  let content;
  let mainClass = "pb-12 flex flex-col flex-grow overflow-y-auto";

  if (!user) {
    content = <HomePage />;
  } else {
    content = <CollectionPage />;

    mainClass += " bg-gray-900/50 backdrop-blur-xs";
  }

  return (
    <div className="h-screen flex flex-col text-gray-100 bg-[url(./assets/images/background.webp)] bg-cover bg-center bg-no-repeat">
      <Header fixed />

      <main className={mainClass}>
        {content}
      </main>

      <Footer fixed />
    </div>
  );
}

export default App;
