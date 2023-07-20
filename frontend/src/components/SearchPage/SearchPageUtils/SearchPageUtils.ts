import axios from 'axios';
import { ErrorResponseInterface, ErrorsInterface, UserData } from '../SearchPageTypes';

export const handleSearchSubmit = async (
  searchData: UserData,
  setSearchResults: (data: UserData[]) => void,
  setIsLoading: (isLoading: boolean) => void,
  setErrors: (errors: ErrorsInterface[] | undefined) => void
) => {
  setIsLoading(true);

  console.log('searchData', searchData);

  searchData = {
    email: searchData.email,
    number: searchData.number.replace(/-/g, ''),
  };

  try {
    const response = await axios.post('http://localhost:3000/search', searchData);
    console.log('response', response);
    const foundUsers = response.data;
    setErrors(undefined);
    setSearchResults(foundUsers);
  } catch (error: any) {
    console.log('error', error);
    if (error.response && error.response.data) {
      const { errors } = error.response.data as ErrorResponseInterface;
      const newErrors: ErrorsInterface[] = errors.map((errorItem) => ({
        message: errorItem.msg,
        messageType: 'error',
      }));
      setErrors(newErrors);
    }
    if (error.message === 'Network Error') {
      setErrors([
        {
          message: 'Ошибка соединения с сервером. Пожалуйста, попробуйте позже.',
          messageType: 'info',
        },
      ]);
    }
  }

  setIsLoading(false);
};
