import { useState } from 'react';
import toast from 'react-hot-toast';
import styles from '../styles/login.module.css';
import { useAuth } from '../hooks';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const auth = useAuth();
  console.log(auth);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setLoggingIn(true);
    const response = await auth.login(email, password);
    if (response.success) {
      navigate('/');
      toast.success('Successfully Logged In');
    } else {
      toast.error('Invalid Password or Email');
    }
    setLoggingIn(false);
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>
      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? 'Logging In...' : 'Log In'}
        </button>
      </div>
    </form>
  );
};

export default Login;
