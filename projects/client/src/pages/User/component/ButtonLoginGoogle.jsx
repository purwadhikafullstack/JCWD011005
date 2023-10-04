import { useDispatch } from "react-redux"
import { Button, Center, Text, useToast } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../config/firebase";
import axios from "axios";
import React from "react";
import { userGoogleLogin } from "../../../redux/reducers/UserAuthReducer";
const URL_API = process.env.REACT_APP_API_BASE_URL;


export default function ButtonLoginGoogle() {
  
  const [isDisabled, setIsDisabled] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch()

  const handleLogin = async () => {
    try {
      setIsDisabled(true);
      const result = await signInWithPopup(auth, provider);
      console.log(result);

      dispatch(userGoogleLogin(result._tokenResponse.idToken, toast, result))
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
      setIsDisabled(false);
    }
  };

  return (
    <Button
      w={"full"}
      maxW={"md"}
      variant={"outline"}
      leftIcon={<FcGoogle />}
      onClick={handleLogin}
      disabled={isDisabled}
    >
      <Center>
        <Text>Continue with Google</Text>
      </Center>
    </Button>
  );
}
