import React from 'react'
import BlankPage from './BlankPage'
import FormCard from '../../components/card/FormCard'
import { Box, Text } from '@chakra-ui/react'
import { TbLockCheck, TbMailCheck } from 'react-icons/tb'

const SuccessPage = (props) => {
    let title, description, icon = "";
    if (props.purpose === "email") {
        title = "Permintaan sudah kami terima";
        description = "Silahkan periksa email anda untuk instruksi berikutnya";
        icon = <TbMailCheck size={70}/>;
    } else if (props.purpose === "reset") {
        title = "Kata sandi telah diubah";
        description = "Silahkan login kembali untuk masuk ke dalam dashboard";
        icon = <TbLockCheck size={70}/>;
    }
    return (
        <BlankPage>
            <FormCard>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    {icon}
                </Box>
                <Text as="b" fontSize="2xl">{title}</Text>
                <Text>{description}</Text>
            </FormCard>
        </BlankPage>
    )
}

export default SuccessPage