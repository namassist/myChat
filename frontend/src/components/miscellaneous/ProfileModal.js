import { ViewIcon, ExternalLinkIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Text,
  Image,
  Box,
  Alert,
} from "@chakra-ui/react";

const ProfileModal = ({ selectedChat, messages, user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const exportChat = async () => {
    let res = [];
    let str = "";
    for (let index = 0; index < messages.length; index++) {
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };

      const time = new Date(messages[index].createdAt).toLocaleDateString(
        undefined,
        options
      );

      const obj = {
        date: time,
        sender: messages[index].sender.name,
        content: messages[index].content,
      };
      res.push(obj);
    }

    res.map((e) => {
      str += `[${e.date}] ${e.sender} : ${e.content} \n`;
    });

    const blob = new Blob([str], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "chat.txt";
    link.href = url;
    link.click();
  };

  const changeStatus = async () => {
    let id = selectedChat.users[1]._id;
    axios.put(`/api/user/${id}`, { status: "end" }).then((res) => {
      // Alert
      window.location.reload();
    });
  };

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <Box d={{ base: "flex", justifyContent: "center" }}>
          <IconButton marginRight="2" icon={<ViewIcon />} onClick={onOpen} />
          {user.isAdmin !== true ? (
            <>
              <IconButton
                marginRight="2"
                icon={<ExternalLinkIcon />}
                onClick={exportChat}
              />
              <IconButton
                marginRight="2"
                icon={<DeleteIcon />}
                onClick={changeStatus}
              />
            </>
          ) : (
            ""
          )}
        </Box>
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="410px" bg="#7AA7DC">
          <ModalHeader
            fontSize="32px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            {user.isAdmin ? user.name : user.vendor}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent={user.isAdmin ? "space-around" : "space-between"}
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
            {user.isAdmin ? (
              " "
            ) : (
              <>
                <Text
                  fontSize={{ base: "20px", md: "18px" }}
                  fontFamily="Work sans"
                >
                  Pelanggan: {user.name}
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
                  Nama Vendor: {user.namaVendor}
                </Text>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
