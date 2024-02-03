import { createContext } from 'react';

export default createContext({
  sessionId: Number(),
  setSessionId: () => {},
  username: String(),
  setUsername: () => {},
  isAdmin: Boolean(),
  setIsAdmin: () => {},
  currentStorageUser: Number(),
  setCurrentStorageUser: () => {},
});
