import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React from 'react'

const InputWithLeftIcon = (props) => {
    return (
        <InputGroup>
            <InputLeftElement pointerEvents='none' color="black" fontSize="xl" height={props.height}>
                {props.icon}
            </InputLeftElement>
            <Input type='text' name={props.name} placeholder={props.placeholder} bgColor="white" border="1px" borderColor="grey" color="black" height={props.height} width={props.width} value={props.value} onChange={props.onChange}/>
        </InputGroup>
    )
}

export default InputWithLeftIcon