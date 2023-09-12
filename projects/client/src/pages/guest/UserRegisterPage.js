import { Box, Button, Input } from '@chakra-ui/react'
import React from 'react'
import InputWithError from '../../components/input/InputWithError'
import axios from 'axios';
import { useFormik } from 'formik'
import * as Yup from "yup";

const UserRegisterPage = () => {
  const addUserSchema = useFormik({
    initialValues: {
      roleName: ""
    },
    validationSchema: Yup.object({
      roleName: Yup.string()
        .matches(/^[a-zA-Z]+$/, "Hanya huruf yang diperbolehkan!")
        .required("Peran tidak boleh kosong!"),
    }),
    onSubmit: async values => {
      await axios.post("http://localhost:8000/api/admin/role/create", {
        roleName: values.roleName
      }).then(resp => {
        // props.fetchData();
      }).catch(error => {
        console.log(error.response.data.error);
        alert(error.response.data.message);
      });
    }
  });
  return (
    <form onSubmit={addUserSchema.handleSubmit}>
      <InputWithError margin={"0"} padding={"1"} errors={addUserSchema.errors.firstName} touched={addUserSchema.touched.firstName}>
        <Input type="text" name="firstName" placeholder='Nama Depan' bgColor="white" borderColor={"grey"} color={"black"} value={addUserSchema.values.firstName} onChange={addUserSchema.handleChange}/>
      </InputWithError>
      <InputWithError margin={"0"} padding={"1"} errors={addUserSchema.errors.firstName} touched={addUserSchema.touched.lastName}>
        <Input type="text" name="lastName" placeholder='Nama Belakang' bgColor="white" borderColor={"grey"} color={"black"} value={addUserSchema.values.lastName} onChange={addUserSchema.handleChange}/>
      </InputWithError>
      <InputWithError margin={"0"} padding={"1"} errors={addUserSchema.errors.email} touched={addUserSchema.touched.email}>
        <Input type="text" name="email" placeholder='Nama Depan' bgColor="white" borderColor={"grey"} color={"black"} value={addUserSchema.values.email} onChange={addUserSchema.handleChange}/>
      </InputWithError>
      <InputWithError margin={"0"} padding={"1"} errors={addUserSchema.errors.password} touched={addUserSchema.touched.password}>
        <Input type="text" name="password" placeholder='Password' bgColor="white" borderColor={"grey"} color={"black"} value={addUserSchema.values.password} onChange={addUserSchema.handleChange}/>
      </InputWithError>
      <InputWithError margin={"0"} padding={"1"} errors={addUserSchema.errors.phone} touched={addUserSchema.touched.phone}>
        <Input type="text" name="phone" placeholder='Nomor Telepon' bgColor="white" borderColor={"grey"} color={"black"} value={addUserSchema.values.phone} onChange={addUserSchema.handleChange}/>
      </InputWithError>
      <Button type="submit" colorScheme={"green"} marginX="5">Mendaftar</Button>
    </form>
  )
}

export default UserRegisterPage