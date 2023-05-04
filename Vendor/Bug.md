# Bug:1

{
After logging in with a new token into vendor app, it redirects back to login page after throwing an error, works only after logging in second time
the error occurs when the page is loaded with token in url and the toekn does not exists in local localStorage
and there will be no error when the token is already present in the localStorage

## Solution:

just redirecting the page back to this app (everytime when the url has token) but without any token when the token has been saved in localStorage.

- src/components/URLToken:9
  > window.location.href = "http://localhost:3002";

OR
Could have used fetch for UserInfo and then axios later on wherver required
}

## Final solution:

make the axios wait until the token is available in local storage

- ./src/api/axios

  ```const setAuthHeaderInterceptor = (config) => {
   const token = localStorage.getItem("token");
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
  };
  userInfoInstance.interceptors.request.use(setAuthHeaderInterceptor);
  vendorInstance.interceptors.request.use(setAuthHeaderInterceptor);
  ```
