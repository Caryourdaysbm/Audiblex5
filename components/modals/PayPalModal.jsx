// PayPalModal.jsx
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react";
import ReactPaypal from "../payments/ReactPaypal";
  
  const PayPalModal = ({ isOpen, onClose, onDelete }) => {



    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="custom-delete-confirmation-modal"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
          {/* <ReactPaypal paypal_plan_id={paypal_plan_id} /> */}
          <div className="paypal">

          <ReactPaypal />
          </div>
       

          </ModalBody>
  
         
        </ModalContent>
      </Modal>
    );
  };
  
  export default PayPalModal;
  