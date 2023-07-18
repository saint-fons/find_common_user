import { UserData } from "../SearchPage";
import axios from 'axios';

export const handleSearchSubmit = async (
  searchData: UserData,
  setSearchResults: (data: UserData[]) => void,
  setIsLoading: (isLoading: boolean) => void
) => {
  setIsLoading(true);

  console.log('searchData', searchData);

  searchData = {
    email: searchData.email,
    number: searchData.number.replace(/-/g, ''),
  };

  try {
    const response = await axios.post('http://localhost:3000/search', searchData);
    const foundUsers = response.data;
    setSearchResults(foundUsers);
  } catch (error) {
    console.error('Error executing the request:', error);
  }

  setIsLoading(false);
};
