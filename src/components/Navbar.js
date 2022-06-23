import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import { getusersByName as fetchUsers } from '../api';

import styles from '../styles/navbar.module.css';
import { useEffect } from 'react';

import debounce from 'lodash.debounce';

export const Navbar = () => {
  const [searchText, setSearchText] = useState('');

  const [results, setResults] = useState([]);

  // const getusersByName = async (e) => {
  //   if (e.key === 'Enter') {
  //     const response = await fetchUsers(searchText);
  //     if (response.success) {
  //       // setSearchText('');
  //       setResults(response.data.users);
  //     }
  //   }
  // };

  useEffect(() => {
    const getusersByName = debounce(async () => {
      if (searchText.length > 2) {
        const response = await fetchUsers(searchText);
        if (response.success) {
          setResults(response.data.users);
        }
      } else {
        setResults([]);
      }
    }, 500);

    getusersByName();
  }, [searchText]);

  const auth = useAuth();
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>

      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
          alt=""
        />
        <input
          type="text"
          placeholder="Search User"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          // onKeyDown={getusersByName}
        />

        {results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                >
                  <Link to={`/users/${user._id}`}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      alt=""
                    />
                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/Settings">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt=""
                className={styles.userDp}
              />
            </Link>
            <span>{auth.user.name}</span>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <li>
                <button onClick={auth.logout}>Log out</button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login">Log in</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
