import { SearchDataInterface } from "../SearchFormTypes";

  
  export const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>, setNumber: React.Dispatch<React.SetStateAction<string>>) => {
    setNumber(event.currentTarget.value);
  };
  
  export const handleSubmit = (email: string, number: string, onSubmit: (searchData: SearchDataInterface) => void) => {
    const searchData: SearchDataInterface = {
      email,
      number,
    };
    onSubmit(searchData);
  };