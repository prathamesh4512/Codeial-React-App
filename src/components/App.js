import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import { Home, Login } from '../pages';
import { Loader, Navbar } from './';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const About = () => {
  return <h1>About</h1>;
};

const Page404 = () => {
  return <h1>Page Not Found</h1>;
};

export function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  //In useEffect we cant directly call async fn
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      // console.log("response",response);
      if (response.success) {
        setPosts(response.data.posts);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Page404 />} />
          {/* <Route exact path = "/about">
              <About/>
          </Route> */}
        </Routes>
      </Router>
    </div>
  );
}

// export default App;
