import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Sidebar />
        {/* <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/blog/:id" element={<Post />}></Route>
          <Route exact path="/blog/:id/edit" element={<EditPost />}></Route>
          <Route exact path="/create" element={<BlogCreate />}></Route>
          <Route exact path="/contact" element={<Contact />}></Route>
        </Routes> */}
      </div>
    </BrowserRouter>
  );
}

export default App;