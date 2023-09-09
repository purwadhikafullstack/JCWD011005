import { Box, Collapse, Text } from '@chakra-ui/react'
import React from 'react'

const InputWithError = (props) => {
    const bool = props.errors && props.touched;
    const margin = (props.margin)? props.margin : 5;
    const marginBottom = (props.marginBottom)? props.marginBottom : 1;
    const padding = (props.padding)? props.padding : 1;
    return (
        <Box
            borderRadius="10"
            bgColor={bool? 'red' : 'transparent'}
            color="white"
            margin={margin}
            marginBottom={marginBottom}
            padding={padding}
            width="100%"
            in={bool}
            sx={{
                "transition": "background-color 0.5s ease-out"
            }}
            alignItems={"start"}
            textAlign={"left"}
        >
            {props.children}
            <Collapse in={bool}>
                <Text fontSize={"md"} paddingLeft="1">{props.errors}</Text>
            </Collapse>
        </Box>
    )
}

export default InputWithError