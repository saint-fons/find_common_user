import React, { useState } from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react';

import styles from './SearchPageStyles.module.css';
import SearchForm from '../SearchForm/SearchForm';
import { handleSearchSubmit } from './SearchPageUtils/SearchPageUtils';

export interface UserData {
  email: string;
  number: string;
}

const SearchPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (searchData: UserData) => {
    handleSearchSubmit(searchData, setSearchResults, setIsLoading);
  };

  return (
    <div className={styles.container}>
      <h1>Search Page</h1>
      <SearchForm onSubmit={handleSubmit} />

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
