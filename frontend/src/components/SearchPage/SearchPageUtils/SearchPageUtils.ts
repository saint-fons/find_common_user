import axios from 'axios';
import { ErrorResponseInterface, ErrorsInterface, ServerResponse, UserData } from '../SearchPageTypes';

export const handleSearchSubmit = async (
  searchData: UserData,
  setSearchResults: (data: ServerResponse[]) => void,
  setIsLoading: (isLoading: boolean) => void,
  setErrors: (errors: ErrorsInterface[] | undefined) => void,
  errorMessage: string
) => {
  setIsLoading(true);


  searchData = {
    email: searchData.email,
    number: searchData.number.replace(/-/g, ''),
  };

  try {
    const response = await axios.post<ServerResponse[]>('http://localhost:3000/search', searchData);
    const foundUsers = response.data;
    setErrors(undefined);
    setSearchResults(foundUsers);
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { errors } = error.response.data as ErrorResponseInterface;
      const newErrors: ErrorsInterface[] = errors.map((errorItem) => ({
        message: errorItem.msg,
        messageType: 'error',
      }));
      setErrors(newErrors);
    } else {
      setErrors([
        {
          message: errorMessage,
          messageType: 'error',
        },
      ]);
    }
  }

  setIsLoading(false);
};
