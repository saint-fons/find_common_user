import React, { useState } from 'react';
import { TextField, DefaultButton, Label } from '@fluentui/react';
import styles from './SearchFormStyles.module.css';
// @ts-ignore
import InputMask from 'react-input-mask';
import { handleNumberChange, handleSubmit } from './SearchFormUtils/SearchFormUtils';
import { SearchFormProps } from './SearchFormTypes';
import { useTranslation } from 'react-i18next';

export const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [emailError, setEmailError] = useState<string>('');
  const [emailTouched, setEmailTouched] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleSearch = () => {
    if (!email.trim()) {
      setEmailError(t('searchPage.emailRequired'));
      return;
    }

    setEmailError('');
    handleSubmit(email, number, onSubmit);
  };

  const handleEmailInputChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.value.length > 50) {
      return;
    }
    setEmail(target.value);
    setEmailError('');
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    if (!email.trim()) {
      setEmailError(t('searchPage.emailRequired'));
    }
  };

  return (
    <div className={styles.container}>
      <Label required>{t('searchPage.emailLabel')}</Label>
      <TextField
        placeholder={t('searchPage.emailPlaceholder')}
        value={email}
        onChange={handleEmailInputChange}
        onBlur={handleEmailBlur}
        errorMessage={emailTouched && emailError ? emailError : undefined}
        className={styles['form-field']}
      />
      <InputMask
        placeholder={t('searchPage.numberPlaceholder')}
        mask="99-99-99"
        value={number}
        onChange={(e: any) => handleNumberChange(e, setNumber)}
      >
        {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
          // @ts-ignore
          <TextField label={t('searchPage.numberLabel')} {...inputProps} className={styles['form-field']} />
        )}
      </InputMask>

      <div className={styles.buttonContainer}>
        <DefaultButton text={t('searchPage.search')} onClick={handleSearch} className={styles.button} />
      </div>
    </div>
  );
};
