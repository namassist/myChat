import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="32px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="75px"
              src={user.pic}
              alt={user.name}
            />
            <Text
              fontSize={{ base: "20px", md: "18px" }}
              fontFamily="Work sans"
            >
              Email: {user.email}
            </Text>
            <Text
              fontSize={{ base: "20px", md: "18px" }}
              fontFamily="Work sans"
            >
              No Jaringan: {user.noJaringan}
            </Text>
            <Text
              fontSize={{ base: "20px", md: "18px" }}
              fontFamily="Work sans"
            >
              Status: {user.status}
            </Text>
            <Text
              fontSize={{ base: "20px", md: "18px" }}
              fontFamily="Work sans"
            >
              Order: {user.order}
            </Text>
            <Text
              fontSize={{ base: "20px", md: "18px" }}
              fontFamily="Work sans"
            >
              Vendor: {user.vendor}
            </Text>
            <Text
              fontSize={{ base: "20px", md: "18px" }}
              fontFamily="Work sans"
            >
              Nama Vendor: {user.namaVendor}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
