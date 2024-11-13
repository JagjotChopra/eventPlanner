
import {jwtDecode} from 'jwt-decode';

export const UserAuth = (role) => {
  let token = localStorage.getItem('token');
  if (!token) {
    return;
  }
  const decodedToken = jwtDecode(token);
  // Get the current time in seconds
  const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
  // Check if the token is expired
  if (decodedToken.exp < currentTime) {
    console.log('Token has expired');
    localStorage.removeItem('token');
    return ;
    // Perform any actions needed when the token is expired, like redirecting to login
  } else {
    console.log('Token is valid');
    // Proceed with your authenticated requests or actions
  }
  //console.log(decodedToken);
  return decodedToken.role
}
