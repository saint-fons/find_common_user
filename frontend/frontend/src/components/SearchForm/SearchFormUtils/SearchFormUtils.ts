import { SearchData } from "../SearchForm";

export const handleEmailChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, setEmail: React.Dispatch<React.SetStateAction<string>>) => {
    setEmail(event.currentTarget.value);
  };
  
  export const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>, setNumber: React.Dispatch<React.SetStateAction<string>>) => {
    setNumber(event.currentTarget.value);
  };
  
  export const handleSubmit = (email: string, number: string, onSubmit: (searchData: SearchData) => void) => {
    const searchData: SearchData = {
      email,
      number,
    };
    onSubmit(searchData);
  };