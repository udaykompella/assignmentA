// import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateUser from "./pages/CreateUser";
import LoginUser from "./pages/LoginUser";
import UrlShortener from "./pages/UrlShortener";
import Navbar from "./pages/Navbar";
import Container from "@mui/material/Container";
// import { CreateUser } from "./pages/CreateUser";

const myStyle = {
  marginTop: "2rem",
};
function App() {
  return (
    //
    <div className="App">
      <Navbar />
      <div style={myStyle}>
        <Container maxWidth="xs">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginUser />} />
              <Route path="CreateUser" element={<CreateUser />} />
              <Route path="urlshortener" element={<UrlShortener />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </div>
    </div>
  );
}

export default App;
