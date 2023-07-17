import React, { useState } from 'react';
import { TextField, DefaultButton } from '@fluentui/react';
import styles from './SearchFormStyles.module.css';
// @ts-ignore
import InputMask from 'react-input-mask';

interface SearchFormProps {
  onSubmit: (searchData: SearchData) => void;
}

interface SearchData {
  email: string;
  number: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');

  const handleEmailChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setEmail(newValue || '');
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
  };

  const handleSubmit = () => {
    const searchData: SearchData = {
      email,
      number,
    };
    onSubmit(searchData);
  };

  return (
    <div className={styles.container}>
      <TextField label="Email" value={email} onChange={handleEmailChange} className={styles['form-field']} />
      <InputMask mask="99-99-99" value={number} onChange={handleNumberChange}>
        {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
          // @ts-ignore
          <TextField label="Number" {...inputProps} className={styles['form-field']} />
        )}
      </InputMask>

      <DefaultButton text="Search" onClick={handleSubmit} className={styles.button} />
    </div>
  );
};

export default SearchForm;
