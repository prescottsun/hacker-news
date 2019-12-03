import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TopPosts from "./components/topPosts";
import Comments from "./components/comments";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={TopPosts} />
        <Route path="/comments/:postId" component={Comments} />
      </Router>
    </div>
  );
}

export default App;
