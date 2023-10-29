import React, { useState } from "react";
import { Box, Button, Card, CardBody, CardHeader, Center, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Image, Input, InputGroup, InputRightElement, Stack, Text, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
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
import InputWithError from "../../components/input/InputWithError";
import InputPassword from "../../components/input/InputPassword";

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
      <Card border="1px" borderColor="gray.300" boxShadow="md" minHeight="30%" width="30%">
        <CardHeader display="flex" flexDirection="column" alignItems="center" gap="5">
          <Image src='/images/logo/proRentLogo.svg' alt='Pro-Rent Logo'/>
          <Heading fontSize={"3xl"}>Login User</Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={formik.handleSubmit}>
            <InputWithError margin="0" padding="1" errors={formik.errors.identifier} touched={formik.touched.identifier}>
              <Input type="text" id="identifier" name="identifier" placeholder="Alamat email atau nomor telepon" bgColor="white" borderColor="grey" color="black" value={formik.values.identifier} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
              <FormErrorMessage textAlign="start">
                {formik.errors.identifier}
              </FormErrorMessage>
            </InputWithError>
            <InputWithError margin="0" padding="1" errors={formik.errors.password} touched={formik.touched.password}>
              <InputPassword name="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} handleClick={() => setShowPassword(!showPassword)} show={showPassword}/>
            </InputWithError>
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
        </CardBody>
      </Card>
    </Flex>
  );
};
