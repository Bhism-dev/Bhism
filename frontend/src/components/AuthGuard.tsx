import { Redirect, Route } from 'react-router-dom';

// A function to check if the user is authenticated
const isAuthenticated = () => {
  // Here you should check for user authentication, e.g., from localStorage, sessionStorage, or a token
  return !!localStorage.getItem('token'); // Example using a token in localStorage
};

const AuthGuard = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default AuthGuard;