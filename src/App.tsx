import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Register from "./components/Register";
import { StateProvider } from "./context/StateProvider";
import { initialState, reducer } from "./context/reducer";

function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </StateProvider>
  );
}

export default App;
