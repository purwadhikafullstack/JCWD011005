import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
const URL_API = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  user: {
    user_id: null,
    first_name: "",
    email: "",
    phone: "",
    is_verified: "",
    image_profile: "",
  },
  login: false,
};

const UserAuthReducer = createSlice({
    name: "UserAuthReducer",
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log("action", action.payload);
            const {user_id, first_name, email, phone, is_verified, image_profile} = action.payload
            state.user = {
              user_id,
              first_name,
              email,
              phone,
              is_verified,
              image_profile,
            };
        },
        userLogin: (state, action) => {
          state.login = true;
          setTimeout(() => {
            document.location.href = "/";
          }, 500)
        },
        userLogout: (state, action) => {
            state.login = false;
            localStorage.removeItem("token");
            setTimeout(() => {
              document.location.href = "/";
            }, 1000);
          },
    }
})

export const userKeepLogin = (values, setIsLoading, toast) => {
  return async (dispatch) => {
      const token = localStorage.getItem("token");
      
      try {
          setIsLoading(true);
            const login = await axios.post(
                `${URL_API}/auth/user-login`,
                {
                  email: values.email,
                  phone: values.phone,
                  password: values.password,
                }
            );
          setIsLoading(false)
          toast({
              title: 'Success',
              description: "Welcome to Pro-Rent!",
              status: 'success',
              duration: 3000,
              isClosable: true,
          });
          const token = login.data.token;
            dispatch(userLogin())
            dispatch(setUser(login.data.user));
            localStorage.setItem("token", token);
          
      } catch (err) {
          console.log(err);
          setIsLoading(false)
          toast({
              title: 'Error',
              description: err.response.data.error || err.response.data.errors[0].msg,
              status: 'error',
              duration: 3000,
              isClosable: true,
          });
      } finally {
          setIsLoading(false);
      }
  };
};

export const userGoogleLogin = (idToken, toast) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL_API}/auth/user-login-google`, {
        idToken: idToken,
      });

      toast({
        title: 'Success',
        description: "Welcome to Pro-Rent! Now you can find your best stay.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      const token = response.data.token;
      console.log(response.data)

      dispatch(userLogin());
      dispatch(setUser(response.data.payload));
      localStorage.setItem("token", token);

    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description:
          err.response.data.error || err.response.data.errors[0].msg,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
};

export const userForgotPassword = (values, setIsLoading, toast) => {
  return async (dispatch) => {
    try{
      setIsLoading(true)
      const forgot = await axios.put(
        `${URL_API}/auth/user-password`,
                {
                  email: values.email,
                }
      )
      setIsLoading(false)
          toast({
              title: 'Success',
              description: "Please check your email to reset your password!",
              status: 'success',
              duration: 3000,
              isClosable: true,
          });
          setTimeout(() => {
            document.location.href = "/";
        }, 500);

    }
    catch(err){
      console.log(err);
          setIsLoading(false)
          toast({
              title: 'Error',
              description: err.response.data.error || err.response.data.errors[0].msg,
              status: 'error',
              duration: 3000,
              isClosable: true,
          });
      } finally {
          setIsLoading(false);
      }

    }
}

export const userResetPassword = (values, setIsLoading, toast, token) => {
  return async (dispatch) => {
    try{
      setIsLoading(true)
      const reset = await axios.patch(`${URL_API}/auth/user-password`, {
        password: values.password,
        confirm_password: values.confirm_password
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      
      toast({
        title: 'Reset Password Success.',
        description: "You can now login with your new password.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      setTimeout(() => {
        document.location.href = "/";
    }, 500);

} catch(err){
  console.log(err);
          setIsLoading(false)
          toast({
              title: 'Error',
              description: err.response.data.error || err.response.data.errors[0].msg,
              status: 'error',
              duration: 3000,
              isClosable: true,
          });
      } finally {
          setIsLoading(false);
      }
    }
  }

export const {
    userLogin,
    userLoginFailed,
    userLogout,
    setUser,
    keepLoginSuccess,
  } = UserAuthReducer.actions;
  export default UserAuthReducer.reducer;