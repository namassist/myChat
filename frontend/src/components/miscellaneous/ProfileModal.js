import { ViewIcon, ExternalLinkIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

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
  Box,
} from "@chakra-ui/react";

const ProfileModal = ({ messages, user, children }) => {
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

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <Box d={{ base: "flex", justifyContent: "center" }}>
          <IconButton marginRight="2" icon={<ViewIcon />} onClick={onOpen} />
          <IconButton
            marginRight="2"
            icon={<ExternalLinkIcon />}
            onClick={exportChat}
          />
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
