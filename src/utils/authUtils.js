import {auth} from '../firebase';

onGoogleLogin = () => {
  auth
    .getRedirectResult()
    .then((result) => {
      const credentials = result.credential;
      console.log(credentials.toJSON);
    })
    .catch((e) => {
      console.error(e);
    });
};


export default onGoogleLogin;