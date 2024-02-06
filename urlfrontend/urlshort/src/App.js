// import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateUser from "./pages/CreateUser";
import LoginUser from "./pages/LoginUser";
import UrlShortener from "./pages/UrlShortener";

// import { CreateUser } from "./pages/CreateUser";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateUser />} />
          <Route path="LoginUser" element={<LoginUser />} />
          <Route path="urlshortener" element={<UrlShortener />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
