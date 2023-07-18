import React, { useState } from 'react';
import { TextField, DefaultButton } from '@fluentui/react';
import styles from './SearchFormStyles.module.css';
// @ts-ignore
import InputMask from 'react-input-mask';
import { handleEmailChange, handleNumberChange, handleSubmit } from './SearchFormUtils/SearchFormUtils';

interface SearchFormProps {
  onSubmit: (searchData: SearchData) => void;
}

export interface SearchData {
  email: string;
  number: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');

  return (
    <div className={styles.container}>
      <TextField label="Email" value={email} onChange={(e) => handleEmailChange(e, setEmail)} className={styles['form-field']} />
      <InputMask mask="99-99-99" value={number} onChange={(e: any) => handleNumberChange(e, setNumber)}>
        {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
          // @ts-ignore
          <TextField label="Number" {...inputProps} className={styles['form-field']} />
        )}
      </InputMask>

      <DefaultButton text="Search" onClick={() => handleSubmit(email, number, onSubmit)} className={styles.button} />
    </div>
  );
};

export default SearchForm;
