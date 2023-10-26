import React, { useState } from "react";
import { Box, Button, Center, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, InputGroup, InputRightElement, Stack, Text, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth, provider } from "../../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { userKeepLogin } from "../../redux/reducers/UserAuthReducer";
import { useNavigate } from "react-router-dom";
import ButtonRegisterGoogle from "./component/ButtonRegisterGoogle";
import ButtonLoginGoogle from "./component/ButtonLoginGoogle";

export const UserLogin = () => {  
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast()
  const login = useSelector((state) => state.UserAuthReducer.login)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    identifier: Yup.string()
    .required("Email address or Phone Number is required")
    .matches(
      /^(?:\d{9,14}|[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+)$/,
      "Invalid format. Must be a valid email or a phone number"
    ),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.identifier);
      const isPhoneNumber = /^\d{9,14}$/.test(values.identifier);
    
      if (isEmail) {
        values.email = values.identifier;
      } else if (isPhoneNumber) {
        values.phone = values.identifier;
      }
      setIsLoading(true)
      dispatch(userKeepLogin(values, setIsLoading, toast));
    },
  })

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Pro-Rent</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
          Sign in to your account </Text>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <form onSubmit={formik.handleSubmit}>
              <FormControl id="identifier" isInvalid={formik.touched.identifier && formik.errors.identifier}>
                <FormLabel>Email address or Phone Number</FormLabel>
                <Input type="text" id="identifier" name="identifier" value={formik.values.identifier} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                <FormErrorMessage textAlign="start">
                  {formik.errors.identifier}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="password" isInvalid={formik.touched.password && formik.errors.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? "text" : "password"} name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                  <InputRightElement h={"full"}>
                    <Button
                    variant={"ghost"} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Stack direction={{ base: "column", sm: "row" }} align={"start"} justify={"space-between"}>
                  <Button onClick={() => navigate("/forgot-password-user")} variant="link" color={"blue.400"}>Forgot password?</Button>
                </Stack>
                <Stack>
                  <Button isLoading={isLoading} loadingText="Signing in" bg={"blue.400"} color={"white"} _hover={{ bg: "blue.500" }} type="submit">
                    Sign in
                  </Button>
                  <HStack>
                    <Divider />
                    <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                      or
                    </Text>
                    <Divider />
                  </HStack>
                  <VStack>
                    {/* <Button w={"full"} maxW={"md"} variant={"outline"} leftIcon={<FcGoogle />}>
                      <Center>
                        <Text>Sign in with Google</Text>
                      </Center>
                    </Button> */}
                    <ButtonRegisterGoogle/>
                    <ButtonLoginGoogle/>
                  </VStack>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
