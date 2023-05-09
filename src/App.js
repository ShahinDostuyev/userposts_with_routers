import { Routes,Route } from "react-router-dom";
import { Users } from "./pages/Users";
import { Home } from "./pages/Home";
import { UserPosts } from "./pages/UserPosts";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/userPosts/:id" element={<UserPosts />} />
    </Routes>
  );
}

export default App;
