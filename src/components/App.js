import { useEffect } from "react";
import {getPosts} from "../api";
import {Home} from '../pages';

function App(){

  //In useEffect we cant directly call async fn 
  useEffect(()=>{
    const fetchPosts = async()=>{
      const response=await getPosts();
      console.log("response",response);
    }

    fetchPosts();
  },[])
  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
