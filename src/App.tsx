import { BrowserRouter } from "react-router-dom";
import Footer from "components/Footer";
import Header from "components/Header";
import Router from "components/Router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Router />
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

// Link 컴포넌트는 BrowserRouter로 감싸야만 동작 가능
