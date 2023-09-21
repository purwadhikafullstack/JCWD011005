import React from 'react'
import BlankPage from './BlankPage'
import FormCard from '../../components/card/FormCard'
import { Box, Button, Divider, Text } from '@chakra-ui/react'
import { TbLockCheck, TbMailCheck } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

const SuccessPage = (props) => {
    const navigate = useNavigate();
    let title, description, icon = "";
    if (props.purpose === "email") {
        title = "Permintaan sudah kami terima";
        description = "Silahkan periksa email anda untuk instruksi berikutnya";
        icon = <TbMailCheck size="70"/>;
    } else if (props.purpose === "reset") {
        title = "Kata sandi telah diubah";
        description = "Silahkan login kembali untuk masuk ke dalam dashboard";
        icon = <TbLockCheck size="70"/>;
    }
    return (
        <BlankPage>
            <FormCard>
                <Box display="flex" justifyContent="center" alignItems="center">
                    {icon}
                </Box>
                <Text as="b" fontSize="2xl">{title}</Text>
                <Text>{description}</Text>
                <Divider marginTop="5" marginBottom="5"/>
                <Box display="flex" gap="5">
                    <Button colorScheme="gray" flex="1" onClick={() => navigate('/')}>Home</Button>
                    <Button colorScheme="gray" flex="1" onClick={() => navigate('/user/login')}>Login</Button>
                </Box>
            </FormCard>
        </BlankPage>
    )
}

export default SuccessPage