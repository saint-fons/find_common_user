import React, { useState } from 'react';
import { TextField, DefaultButton, Spinner, SpinnerSize } from '@fluentui/react';
import axios from 'axios';
import styles from './SearchPageStyles.module.css';
import SearchForm from '../SearchForm/SearchForm';

interface UserData {
  email: string;
  number: string;
}

const SearchPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchSubmit = async (searchData: { email: string; number: string }) => {
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/search', searchData);
      const foundUsers = response.data;
      setSearchResults(foundUsers);
    } catch (error) {
      console.error('Error executing the request:', error);
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1>Search Page</h1>
      <SearchForm onSubmit={handleSearchSubmit} />

      {isLoading ? (
        <Spinner size={SpinnerSize.medium} />
      ) : searchResults.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Number</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((result, index) => (
              <tr key={index}>
                <td>{result.email}</td>
                <td>{result.number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={styles['no-results']}>No results found.</div>
      )}

      <div className={styles.initials}>Zhuravlev Ivan</div>
    </div>
  );
};

export default SearchPage;
