// import { useEffect, useState } from 'react';
// import { getPosts } from '../api';
import { Home, Login, Signup } from '../pages';
import { Loader, Navbar } from './';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from '../hooks';

// const About = () => {
//   return <h1>About</h1>;
// };

const Page404 = () => {
  return <h1>Page Not Found</h1>;
};

export function App() {
  // const [loading,setLoading]= useState(true);
  // const [posts, setPosts] = useState([]);
  const auth = useAuth();

  //In useEffect we cant directly call async fn
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await getPosts();
  //     // console.log("response",response);
  //     if (response.success) {
  //       setPosts(response.data.posts);
  //     }
  //     setLoading(false);
  //   };

  //   fetchPosts();
  // }, []);

  if (auth.loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

// export default App;
