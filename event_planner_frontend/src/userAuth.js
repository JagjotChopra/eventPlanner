
import {jwtDecode} from 'jwt-decode';

export const UserAuth = (role) => {
    let token=localStorage.getItem('token');
    if(!token){
        return ;
    }
    const decodedToken = jwtDecode(token);
    //console.log(decodedToken);
  return decodedToken.role
}
