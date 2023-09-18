import { Modal, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

const ModalBlank = (props) => {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onCloseX}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                {props.children}
            </ModalContent>
        </Modal>
    )
}

export default ModalBlank