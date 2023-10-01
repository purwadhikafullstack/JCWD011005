import { Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import React from 'react'

const PopoverText = (props) => {
  return (
    <Popover size="lg" trigger="hover">
      <PopoverTrigger>
        {props.children}
      </PopoverTrigger>
      <PopoverContent bg={props.bgColor} color={props.textColor} borderColor={props.borderColor} width="auto">
        <PopoverArrow  bg={props.bgColor}/>
        <PopoverBody>{props.text}</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default PopoverText