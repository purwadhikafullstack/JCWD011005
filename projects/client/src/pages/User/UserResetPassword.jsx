"use client"
import {useState} from "react"
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputRightElement,
  Stack,
  useColorModeValue,
  useToast,
  FormErrorMessage,
  InputGroup
} from "@chakra-ui/react"
import {useFormik} from "formik"
import * as Yup from "yup"
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons'
import { useDispatch } from "react-redux"
import { userResetPassword } from "../../redux/reducers/UserAuthReducer"

export const UserResetPassword = () => {
  
  const [show1, setShow1] = useState(false)
  const handleClick1 = () => setShow1(!show1)
  
  const [show2, setShow2] = useState(false)
  const handleClick2 = () => setShow2(!show2)
  
  const toast = useToast()
  const dispatch = useDispatch()
  
  const url = window.location.href.split("/");
  const token = url[url.length - 1];
  const [isLoading, setIsLoading] = useState(false)
  
  const formik = useFormik({
        initialValues: {
            password: '',
            confirm_password: '',
        },
        
        validationSchema: 
        Yup.object({
          password: Yup.string()
          .required('Password is a required field')
          .min(6, 'Should be more than 6 characters')
          .matches(/[a-z]/g, 'Should contain at least 1 lowercase')
          .matches(/[A-Z]/g, 'Should contain at least 1 uppercase')
          .matches(/[0-9]/g, 'Should contain at least 1 number')
          .matches(/^\S*$/, 'Should not contain spaces')
          .matches(/[^\w]/, 'Password requires a symbol'),

          confirm_password: 
          Yup.string()
          .required('Confirm Password is a required field')
          .oneOf([Yup.ref('password')], 'Password must match')
        }),
        onSubmit: (values) => {
            setIsLoading(true)
            dispatch(userResetPassword(values, setIsLoading, toast, token))
        }
    });

  return(
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}>
        
        <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Reset Your Password
          </Heading>
          <br/>
          <form onSubmit={formik.handleSubmit} >
          <FormControl isInvalid={formik.touched.password && formik.errors.password} id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
          <Input type={show1 ? 'text' : 'password'} name="password"
                              {...formik.getFieldProps('password')}
                              onChange={formik.handleChange}/>
                      <InputRightElement width='4.5rem'>
               <Button variant={'link'} h='1.75rem' size='sm' onClick={handleClick1}>
              {show1 ? <ViewOffIcon color={'gray.500'}/> : <ViewIcon color={'gray.500'}/>}
                 </Button>
                      </InputRightElement>
          </InputGroup>
          {formik.touched.password && formik.errors.password && <FormErrorMessage>{formik.errors.password}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={formik.touched.confirm_password && formik.errors.confirm_password} id="confirm_password" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
          <Input type={show2 ? 'text' : 'password'} name="confirm_password"
                            {...formik.getFieldProps('confirm_password')}
                            onChange={formik.handleChange}/>
                            <InputRightElement width='4.5rem'>
                                <Button variant={'link'} h='1.75rem' size='sm' onClick={handleClick2}>
                                {show2 ? <ViewOffIcon color={'gray.500'}/> : <ViewIcon color={'gray.500'}/>}
                                </Button>
                        </InputRightElement>
          </InputGroup>
          {formik.touched.confirm_password && formik.errors.confirm_password && <FormErrorMessage>{formik.errors.confirm_password}</FormErrorMessage>}
          </FormControl>
          <Stack spacing={6}>
          <Button
            type="submit"
            fontFamily={"heading"}
            mt={8}
            w={"full"}
            bgGradient="linear(to-r, blue.400,teal.400)"
            color={"white"}
            _hover={{
                bgGradient: "linear(to-r, blue.400,teal.400)",
                boxShadow: "xl",
            }}
            isLoading={isLoading}
            loadingText="Submitting"
          >
            Submit
          </Button>
        </Stack>
          </form>
        </Stack>
      </Flex>
  )
  
}
