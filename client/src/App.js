// import './App.css';
import KanbanBoard from "./components/KanbanBoard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="App">
      <KanbanBoard />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Catch-all route for unknown routes */}
          {/* <Route path="*" element={<HomePage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


// https://frontendshape.com/post/react-mui-5-login-page-example
