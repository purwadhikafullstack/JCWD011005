import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React, { useState } from 'react'
import { TbChevronDown } from 'react-icons/tb'

const DropdownMenu = (props) => {
  const placeholder = (props.placeholder)? props.placeholder : "Button";
  const [selectedItem, setSelectedItem] = useState(placeholder);
  return (
    <Menu onChange={props.onChange}>
      <MenuButton as={Button} bgColor="white" border="1px" borderColor="grey" height={props.buttonHeight} leftIcon={props.icon} rightIcon={<TbChevronDown/>}>
        {selectedItem}
      </MenuButton>
      <MenuList color="black">
        {
          (props.value)? props.value.map((item, index) => (
            <MenuItem value={item.value} onClick={() => setSelectedItem(item.display)}>{item.display}</MenuItem>
          ))
          : <MenuItem>This is menu item</MenuItem>
        }
        </MenuList>
    </Menu>
  )
}

export default DropdownMenu