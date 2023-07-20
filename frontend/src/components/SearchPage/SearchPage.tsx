import React, { useState, useEffect } from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react';
import styles from './SearchPageStyles.module.css';
import { handleSearchSubmit } from './SearchPageUtils/SearchPageUtils';
import ErrorBar from '../ErrorBar/ErrorBar';
import { UserData, ErrorsInterface } from './SearchPageTypes';
import { useTranslation } from 'react-i18next';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import { SearchForm } from '../SearchForm/SearchForm';

export const SearchPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<UserData[]>([]);
  const [errors, setErrors] = useState<ErrorsInterface[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [firstRequestMade, setFirstRequestMade] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = (searchData: UserData) => {
    handleSearchSubmit(searchData, setSearchResults, setIsLoading, setErrors, t('searchPage.netWorkError'));
    setFirstRequestMade(true);
  };

  useEffect(() => {
    i18n.changeLanguage();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <div className={styles.container}>
        <h1>{t('searchPage.title')}</h1>
        <SearchForm onSubmit={handleSubmit} />
        {errors ? errors.map((error) => <ErrorBar message={t(error.message)} messageType={error.messageType} />) : <></>}

        {isLoading ? (
          <Spinner size={SpinnerSize.medium} />
        ) : searchResults.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t('searchPage.emailLabel')}</th>
                <th>{t('searchPage.numberLabel')}</th>
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
        ) : firstRequestMade ? (
          <div className={styles['no-results']}>{t('searchPage.noResults')}</div>
        ) : (
          <></>
        )}

        <div className={styles.initials}>{t('searchPage.author')}</div>
      </div>
    </I18nextProvider>
  );
};
