import React, { useState } from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react';
import styles from './SearchPageStyles.module.css';
import { handleSearchSubmit } from './SearchPageUtils/SearchPageUtils';
import ErrorBar from '../ErrorBar/ErrorBar';
import { UserData, ErrorsInterface } from './SearchPageTypes';
import { SearchForm } from '../SearchForm/SearchForm';

export const SearchPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<UserData[]>([]);
  const [errors, setErrors] = useState<ErrorsInterface[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (searchData: UserData) => {
    handleSearchSubmit(searchData, setSearchResults, setIsLoading, setErrors);
  };

  return (
    <div className={styles.container}>
      <h1>Search Page</h1>
      <SearchForm onSubmit={handleSubmit} />
      {errors ? errors.map((error) => <ErrorBar message={error.message} messageType={error.messageType} />) : <></>}

      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <Spinner size={SpinnerSize.medium} />
        </div>
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


