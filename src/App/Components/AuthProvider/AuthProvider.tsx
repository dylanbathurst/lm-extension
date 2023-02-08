import React, { useEffect } from 'react';
import browser from 'webextension-polyfill';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { AuthContextType } from './types';

let AuthContext = React.createContext<AuthContextType>(null!);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  let [user, setUser] = React.useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  let signin = (callback: VoidFunction) => {
    browser.storage.local.get('profile').then((result) => {
      if (result.profile) {
        setUser(result.profile);
        callback();
      }
    });
  };

  let signout = (callback: VoidFunction) => {
    browser.storage.local.remove('profile').then(() => {
      setUser(null);
      callback();
    });
  };

  useEffect(() => {
    const isLoginPage = location.pathname === '/email-verify';
    if (!user) {
      signin(() => {});
    } else if (user && isLoginPage) {
      navigate('/dashboard');
    }
  }, [user]);

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

// function AuthStatus() {
//   let auth = useAuth();
//   let navigate = useNavigate();

//   if (!auth.user) {
//     return <p>You are not logged in.</p>;
//   }

//   return (
//     <p>
//       Welcome {auth.user}!{' '}
//       <button
//         onClick={() => {
//           auth.signout(() => navigate('/'));
//         }}
//       >
//         Sign out
//       </button>
//     </p>
//   );
// }

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/email-verify" state={{ from: location }} replace />;
  }

  return children;
}
