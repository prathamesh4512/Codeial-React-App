import { Comment } from './';
import styles from '../styles/home.module.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useAuth, usePosts } from '../hooks';
import toast from 'react-hot-toast';
import { toggleLike } from '../api';
import { useNavigate } from 'react-router-dom';

export const Post = ({ post }) => {
  const posts = usePosts();
  const auth = useAuth();
  const [comment, setComment] = useState('');
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();

  const addComment = async (e) => {
    if (e.key === 'Enter') {
      if (!comment) return toast.error('Cant add empty comment');
      setAdding(true);
      const response = await posts.addComment(comment, post._id);
      if (response.success) {
        setComment('');
        toast.success('Comment added Successfully');
      } else {
        toast.error('Cant add comment, please try again');
      }
      setAdding(false);
    }
  };

  const likePost = async () => {
    const response = await toggleLike(post._id, 'Post');
    if (response.success) {
      posts.toggleLikePost(response.data.deleted, post._id);
    } else {
      toast.error('Please login to like post');
      navigate('/login');
    }
  };

  const toggleLikeComment = (deleted, id) => {
    let newComments = [];
    if (deleted) {
      newComments = post.comments.map((comment) => {
        if (comment._id === id) {
          comment.likes.pop();
          return comment;
        }
        return comment;
      });
    } else {
      newComments = post.comments.map((comment) => {
        if (comment._id === id) {
          comment.likes.push({});
          return comment;
        }
        return comment;
      });
    }
    posts.toggleLikeComment(newComments, post._id);
  };

  return (
    <div className={styles.postWrapper} key={`post-${post._id}`}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="user-pic"
          />
          <div>
            <Link
              to={`/users/${post.user._id}`}
              state={{ user: post.user }}
              className={styles.postAuthor}
            >
              {post.user.name}
            </Link>
            <span className={styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike} onClick={likePost}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/633/633759.png"
              alt="likes-icon"
            />
            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        {auth.user && (
          <div className={styles.postCommentBox}>
            <input
              placeholder="Start typing a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={addComment}
              disabled={adding}
            />
          </div>
        )}

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment
              comment={comment}
              toggleLikeComment={toggleLikeComment}
              key={comment._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object,
};
