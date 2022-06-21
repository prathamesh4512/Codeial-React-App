import styles from '../styles/home.module.css';
// import PropTypes from 'prop-types';
import { Comment, Loader, FriendsList } from '../components';
import { useState, useEffect } from 'react';
import { getPosts } from '../api';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';

const Home = () => {
  const auth = useAuth();
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

  if (loading) return <Loader />;

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        {/* {auth.user && (
          <ul>
            {auth.user.friends.map((friend) => {
              return <li key={friend._id}>{friend.to_user.email}</li>;
            })}
          </ul>
        )} */}
        {posts.map((post) => (
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
                <div className={styles.postLike}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/633/633759.png"
                    alt="likes-icon"
                  />
                  <span>5</span>
                </div>

                <div className={styles.postCommentsIcon}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
                    alt="comments-icon"
                  />
                  <span>2</span>
                </div>
              </div>
              <div className={styles.postCommentBox}>
                <input placeholder="Start typing a comment" />
              </div>

              <div className={styles.postCommentsList}>
                {/* <div className={styles.postCommentsItem}>
                      <div className={styles.postCommentHeader}>
                        <span className={styles.postCommentAuthor}>Bill</span>
                        <span className={styles.postCommentTime}>a minute ago</span>
                        <span className={styles.postCommentLikes}>22</span>
                      </div>
        
                      <div className={styles.postCommentContent}>Random comment</div>
                    </div> */}
                {post.comments.map((comment) => (
                  <Comment comment={comment} key={comment._id} />
                ))}
                {/* <Comments/> */}
              </div>
            </div>
          </div>
        ))}
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
};

// Home.propTypes = {
//   posts: PropTypes.array.isRequired,
// };

export default Home;
