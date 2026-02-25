import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Account from "./pages/Account";

function App() {
  const [posts, setPosts] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home posts={posts} />} />
        <Route path="/create" element={<CreatePost posts={posts} setPosts={setPosts} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;