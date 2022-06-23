import { PostsContext } from '../providers';
import { getPosts, createPost, createComment } from '../api';
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

  const addComment = async (comment, post_id) => {
    const response = await createComment(comment, post_id);
    if (response.success) {
      let newPosts = posts.map((post) => {
        if (post._id === post_id) {
          return {
            ...post,
            comments: [...post.comments, response.data.comment],
          };
        }
        return post;
      });
      setPosts(newPosts);
      return { success: true };
    } else {
      return { success: false };
    }
  };

  const toggleLikePost = (deleted, id) => {
    let newPosts = [];
    if (deleted) {
      newPosts = posts.map((post) => {
        if (post._id === id) {
          post.likes.pop();
          return post;
        }
        return post;
      });
    } else {
      newPosts = posts.map((post) => {
        if (post._id === id) {
          post.likes.push({});
          return post;
        }
        return post;
      });
    }
    setPosts(newPosts);
  };

  const toggleLikeComment = (newComments, id) => {
    const newPosts = posts.map((post) => {
      if (post._id === id) {
        return {
          ...post,
          comments: newComments,
        };
      }
      return post;
    });
    setPosts(newPosts);
  };

  return {
    posts,
    loading,
    addPostToState,
    addComment,
    toggleLikePost,
    toggleLikeComment,
  };
};
