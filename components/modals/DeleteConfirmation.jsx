// DeleteConfirmationModal.jsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

const DeleteConfirmationModal = ({ isOpen, onClose, onDelete }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="custom-delete-confirmation-modal"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        {/* <ModalHeader>Delete Confirmation</ModalHeader> */}
        <ModalBody>
          <p className="something_bad">
            Unexpected bad things will happen if you don’t read this!
        
            This action cannot be undone. This will permanently delete the{" "}
            measurement.
            <br />
          </p>
          Are you sure you want to delete this item?
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" onClick={onDelete}>
            Delete
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;
