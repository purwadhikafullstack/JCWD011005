import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

const ModalRegular = (props) => {
    let primaryButtonText = "";
    (props.primaryButton)? primaryButtonText = props.primaryButton : primaryButtonText = "Button";
    return (
        <Modal isOpen={props.isOpen} onClose={props.onCloseX}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{props.title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody textAlign={"center"}>{props.children}</ModalBody>
                <ModalFooter>
                    {
                        (props.secondaryButton)? <Button variant='ghost' marginRight={5} onClick={props.onClickSecondaryButton}>{props.secondaryButton}</Button>
                        : <></>
                    }
                    <Button type="submit" colorScheme={props.primaryButtonColor} mr={3} onClick={props.onSubmit} isLoading={props.isLoading}>{primaryButtonText}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalRegular