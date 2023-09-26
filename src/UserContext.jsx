// UserContext.js
import { createContext } from 'react';

const UserContext = createContext({
  user: null,
  setUser: () => {}, // Add a default setUser function
});

export default UserContext;
