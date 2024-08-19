import { useNavigate } from 'react-router';
import { UseAuth } from '../Contexts/AuthContext';
import { useEffect } from 'react';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = UseAuth();

  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate('/');
    },
    [isAuthenticated, navigate]
  );

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
