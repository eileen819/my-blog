import { BrowserRouter } from "react-router-dom";
import Footer from "components/Footer";
import Header from "components/Header";
import Router from "components/Router";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import app from "firebaseApp";
import { ToastContainer } from "react-toastify";

function App() {
  const auth = getAuth(app);
  console.log(auth);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );
  // firebase Auth가 인증되었으면 true로 변경해주는 로직 추가

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Header />
        <main>
          <Router isAuthenticated={isAuthenticated} />
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

// Link 컴포넌트는 BrowserRouter로 감싸야만 동작 가능
