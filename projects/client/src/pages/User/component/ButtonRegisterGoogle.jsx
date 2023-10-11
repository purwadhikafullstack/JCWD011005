import { Button, Center, Text, useToast } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../config/firebase";
import axios from "axios"
import React from 'react'
const URL_API = process.env.REACT_APP_API_BASE_URL;


export default function ButtonRegisterGoogle() {
    const [isDisabled, setIsDisabled] = useState(false)
    const toast = useToast()

  const handleRegister = async () => {
    try {
        setIsDisabled(true)
      const result = await signInWithPopup(auth, provider)
      console.log(result)
      const response = await axios.post(
        `${URL_API}/auth/user-google`,
        {
          idToken: result._tokenResponse.idToken
        }
      )
      console.log(response)
      setIsDisabled(false)
      toast({
        title: 'Success',
        description: "You're successfully registered!",
        status: 'success',
        duration: 3000,
        isClosable: true,
    });
    setTimeout(() => {
      document.location.href = "/";
  }, 500);
    } catch (err) {
      console.log(err)
      toast({
        title: 'Error',
        description: err.response.data.error || err.response.data.errors[0].msg,
        status: 'error',
        duration: 3000,
        isClosable: true,
    });
      setIsDisabled(false)
    }
  }

  return (
                    <Button
                      w={"full"}
                      maxW={"md"}
                      variant={"outline"}
                      leftIcon={<FcGoogle />}
                      onClick={handleRegister}
                      disabled={isDisabled}
                    >
                      <Center>
                        <Text>Register with Google</Text>
                      </Center>
                    </Button>
                    

  )
}
