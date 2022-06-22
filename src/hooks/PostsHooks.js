import { PostsContext } from '../providers';
import { getPosts, createPost } from '../api';
import { useState, useEffect, useContext } from 'react';

export const usePosts = () => {
  return useContext(PostsContext);
};

export const useProvidePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      if (response.success) {
        setPosts(response.data.posts);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const addPostToState = async (post) => {
    const response = await createPost(post);
    if (response.success) {
      setPosts([response.data.post, ...posts]);
      return { success: true };
    } else {
      return { success: false };
    }
  };

  return {
    posts,
    loading,
    addPostToState,
  };
};
