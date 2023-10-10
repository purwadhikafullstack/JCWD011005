import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React from 'react'

const InputDate = (props) => {
    const type = (props.value)? "date" : ((props.type)? "date" : "text");
    return (
        <InputGroup>
            {
                (props.icon)? <InputLeftElement pointerEvents='none' color="black" fontSize="xl" height={props.height}>
                    {props.icon}
                </InputLeftElement>
                : <></>
            }
            <Input type={type} name={props.name} placeholder={props.placeholder} bgColor="white" border="1px" borderColor="grey" color="black" height={props.height} width={props.width} value={props.value} onChange={props.onChange} onMouseOver={props.onMouseOver} onMouseOut={props.onMouseOut}/>
        </InputGroup>
    )
}

export default InputDate