export interface SearchFormProps {
  onSubmit: (searchData: SearchDataInterface) => void;
}

export interface SearchDataInterface {
  email: string;
  number: string;
}
