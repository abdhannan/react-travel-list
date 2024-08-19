import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

// Initial state for reducer
const initialState = {
  user: null,
  isAuthenticated: false,
};

// Recuer function
function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'logout':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
      throw new Error('Unknown action type');
  }
}

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

function AuthProvider({ children }) {
  // Recuducer
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Login function
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: 'login', payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: 'logout' });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function UseAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('Can not use AuthContext outside AuthProvider');
  return context;
}

export { AuthProvider, UseAuth };
