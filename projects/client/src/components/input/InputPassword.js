import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'

const InputPassword = (props) => {
  return (
    <InputGroup size='md'>
      <Input
        name={props.name}
        pr='4.5rem'
        type={props.show ? 'text' : 'password'}
        placeholder={props.isConfirm? 'Konfirmasi kata sandi' : 'Kata sandi'}
        bgColor="white" 
        borderColor={"grey"} 
        color={"black"}
        value={props.value}
        onChange={props.onChange}
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={props.handleClick} colorScheme={props.show? "red" : "gray"} >
          {props.show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

export default InputPassword