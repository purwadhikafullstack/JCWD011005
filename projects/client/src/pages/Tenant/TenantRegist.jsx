import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    InputLeftAddon,
    useToast,
    FormErrorMessage, 
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
  import { useFormik } from "formik";
  import * as Yup from "yup"; 
  import { useDispatch } from "react-redux";
  import { tenantRegist } from "../../redux/reducers/TenantAuthReducer"; 

  export const TenantRegist = () => {
    const dispatch = useDispatch();
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required("First Name is required").min(3, "First Name must be at least 3 characters"),
        last_name: Yup.string().required("Last Name is required"),
        email: Yup.string().required("Email is required").email("Invalid email format"),
        phone: Yup.string().required("Phone Number is required")
        .matches(/^[1-9][0-9]*$/, "Invalid phone number format (should not start with 0)"),
        password: Yup.string().required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*\d])(?=.*\d)(?=.*[.]).{6,}$/, "Password must contain at least one uppercase letter, one number, and one symbol"),
        confirm_password: Yup.string()
        .required("Confirm Password is required").oneOf([Yup.ref("password"), null], "Passwords must match"),
        id_card: Yup.mixed().required("ID Card Picture is required")
        .test("fileSize", "File size must be less than 1MB", (value) => {
          return value ? value.size <= 1024000 : true;
        })
        .test("fileType", "Invalid file format", (value) => {
          return value ? ["image/jpeg", "image/jpg", "image/png"].includes(value.type) : true;
        }),
    });
    
    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            password: "",
            confirm_password: "",
            id_card: null,
        },
        validationSchema,
        onSubmit: (values) => {
            setIsLoading(true);
            dispatch(tenantRegist(values, setIsLoading, toast));
        },
    });
    
    return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}
    bg={useColorModeValue("gray.50", "gray.800")}
    >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
                <Heading fontSize={"4xl"} textAlign={"center"}>
                    Pro-Rent
                </Heading>
                <Text fontSize={"lg"} color={"gray.600"}>
                    Signup as Tenant
                </Text>
            </Stack>
            <Box rounded={"lg"} p={8}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            >
                <Stack spacing={4}>
                    <form onSubmit={formik.handleSubmit}>
                        <HStack>
                            <Box>
                                <FormControl id="first_name" 
                                isInvalid={formik.touched.first_name && formik.errors.first_name}>
                                    <FormLabel>First Name</FormLabel>
                                    <Input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    value={formik.values.first_name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}/>
                                    <FormErrorMessage>{formik.errors.first_name}</FormErrorMessage>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="last_name" 
                                isInvalid={formik.touched.last_name && formik.errors.last_name}>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input
                                    type="text" id="last_name" name="last_name"
                                    value={formik.values.last_name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}/>
                                    <FormErrorMessage>{formik.errors.last_name}</FormErrorMessage>
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="email" 
                        isInvalid={formik.touched.email && formik.errors.email}>
                            <FormLabel>Email address</FormLabel>
                            <Input
                            type="email" id="email" name="email" 
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}/>
                            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                        </FormControl>
                        <FormControl id="phone" 
                        isInvalid={formik.touched.phone && formik.errors.phone}>
                            <FormLabel>Phone Number</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children="+62" />
                                <Input
                                type="tel" placeholder="Example: 81234567890"
                                id="phone" name="phone" value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                />
                            </InputGroup>
                            <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
                        </FormControl>
                        <FormControl id="id_card" 
                        isInvalid={formik.touched.id_card && formik.errors.id_card}>
                            <FormLabel htmlFor="id_card">ID Card Picture</FormLabel>
                            <Input
                            type="file" id="id_card" name="id_card" accept=".jpg, .png, .jpeg"
                            onChange={(e) => formik.setFieldValue("id_card", e.target.files[0])}
                            onBlur={formik.handleBlur}/>
                            <FormErrorMessage>{formik.errors.id_card}</FormErrorMessage>
                        </FormControl>
                        <FormControl id="password" 
                        isInvalid={formik.touched.password && formik.errors.password}>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                type={showPassword ? "text" : "password"} name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}/>
                                <InputRightElement h={"full"}>
                                    <Button
                                    variant={"ghost"} onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                        </FormControl>
                        <FormControl id="confirm_password" 
                        isInvalid={formik.touched.confirm_password && formik.errors.confirm_password}>
                            <FormLabel>Confirm Password</FormLabel>
                            <InputGroup>
                                <Input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirm_password"
                                value={formik.values.confirm_password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                />
                                <InputRightElement h={"full"}>
                                    <Button
                                    variant={"ghost"}
                                    onClick={() =>setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>
                                {formik.errors.confirm_password}
                            </FormErrorMessage>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                            isLoading={isLoading} loadingText="Submitting"
                            size="lg" bg={"blue.400"} color={"white"}
                            _hover={{bg: "blue.500",}} type="submit">
                                Sign up
                            </Button>
                        </Stack>
                    </form>
                    <Stack pt={6}>
                        <Text align={"center"}>
                            Already a tenant? <Link color={"blue.400"}>Login</Link>
                        </Text>
                    </Stack>
            </Stack>
            </Box>
        </Stack>
    </Flex>
    );
  };
  