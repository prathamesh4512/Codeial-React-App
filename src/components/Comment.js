import PropTypes from 'prop-types';
import { toggleLike } from '../api';
// import { useAuth, usePosts } from '../hooks';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import styles from '../styles/home.module.css';

export const Comment = ({ comment, toggleLikeComment }) => {
  // const auth = useAuth();
  // const posts = usePosts();
  const navigate = useNavigate();

  const likeComment = async () => {
    const response = await toggleLike(comment._id, 'Comment');
    if (response.success) {
      toggleLikeComment(response.data.deleted, comment._id);
    } else {
      toast.error('Please login to like comment');
      navigate('/login');
    }
  };

  return (
    <div className={styles.postCommentsItem}>
      <div className={styles.postCommentHeader}>
        <span className={styles.postCommentAuthor}>{comment.user.name}</span>
        <span className={styles.postCommentTime}>a minute ago</span>
        <div className={styles.postActions}>
          <div className={styles.postLike} onClick={likeComment}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/633/633759.png"
              alt="likes-icon"
            />
            <span>{comment.likes.length}</span>
          </div>
        </div>
        {/* <span className={styles.postCommentLikes}>{comment.likes.length}</span> */}
      </div>

      <div className={styles.postCommentContent}>{comment.content}</div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};
