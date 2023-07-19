import React, { useState } from 'react';
import { TextField, DefaultButton, Label } from '@fluentui/react';
import styles from './SearchFormStyles.module.css';
// @ts-ignore
import InputMask from 'react-input-mask';
import { handleNumberChange, handleSubmit } from './SearchFormUtils/SearchFormUtils';
import { SearchFormProps } from './SearchFormTypes';

export const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [emailError, setEmailError] = useState<string>('');

  const handleSearch = () => {
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }

    setEmailError(''); // Очищаем ошибку перед выполнением запроса
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

  return (
    <div className={styles.container}>
      <Label required>Email</Label>
      <TextField value={email} onChange={handleEmailInputChange} errorMessage={emailError} className={styles['form-field']} />
      <InputMask mask="99-99-99" value={number} onChange={(e: any) => handleNumberChange(e, setNumber)}>
        {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
          // @ts-ignore
          <TextField label="Number" {...inputProps} className={styles['form-field']} />
        )}
      </InputMask>

      <div className={styles.buttonContainer}>
        <DefaultButton text="Search" onClick={handleSearch} className={styles.button} />
      </div>
    </div>
  );
};
