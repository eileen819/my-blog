import { BrowserRouter } from "react-router-dom";
import Footer from "components/Footer";
import Header from "components/Header";
import Router from "components/Router";
import { useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "firebaseApp";
import { ToastContainer } from "react-toastify";
import Loader from "components/Loader";
import ThemeContext from "context/\bThemeContext";

function App() {
  const themeContext = useContext(ThemeContext);
  // auth를 가져오기 전에 loader를 띄워주는 용도
  const [isLoading, setIsLoading] = useState(true);
  // auth의 currentUser가 있으면 isAuthenticated의 변경이 이루어지도록 함
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // 로그인 여부에 따라 라우팅 화면이 변경될 수 있도록 함
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={themeContext.theme === "light" ? "white" : "dark"}>
      <ToastContainer />
      <BrowserRouter>
        <Header />
        <main>
          {isLoading ? (
            <Loader />
          ) : (
            <Router isAuthenticated={isAuthenticated} />
          )}
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

// Link 컴포넌트는 BrowserRouter로 감싸야만 동작 가능
