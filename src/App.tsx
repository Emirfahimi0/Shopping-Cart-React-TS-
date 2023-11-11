import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { NavBarComponents } from "./components";
import { About, Home, Store } from "./pages";

const App = () => {
  return (
    <>
      <NavBarComponents />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
