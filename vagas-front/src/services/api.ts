import axios from "axios";
import { Platform } from 'react-native';

const getBaseURL = () => {
  switch (Platform.OS) {
    case 'android':
      return 'http://192.168.0.247:3000';
    case 'ios':
      return 'http://10.0.2.2:3000';
    default:
      return 'http://localhost:3000';
  }
  
};

const api = axios.create({
  baseURL: getBaseURL()
});

export default api;