import { useState } from 'react';
import { useAuth } from '../hooks';
import styles from '../styles/settings.module.css';
import toast from 'react-hot-toast';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getUser } from '../api';
import { Loader } from '../components';
// import { useLocation } from 'react-router-dom';

const UserProfile = () => {
  const auth = useAuth();
  const [user, setUser] = useState({});
  // const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const { userId } = useParams();

  // const location = useLocation();
  // const user = location.state?.user;
  const navigate = useNavigate();

  function checkFriendship() {
    const friendIds = auth.user.friends?.map((friend) => friend.to_user._id);
    return friendIds?.includes(userId);
  }

  useEffect(() => {
    // setLoading(true);
    const fetchUser = async () => {
      const response = await getUser(userId);
      if (response.success) {
        setUser(response.data.user);
      } else {
        toast.error('User is not available');
        return navigate(-1);
      }
      setLoading(false);
    };
    fetchUser();
  }, [userId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user?.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkFriendship() ? (
          <button className={`button ${styles.saveBtn}`}>Remove Friend</button>
        ) : (
          <button className={`button ${styles.saveBtn}`}>Add Friend</button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
