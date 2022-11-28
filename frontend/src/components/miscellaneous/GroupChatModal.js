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
  FormControl,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState();
  const [noJaringan, setNoJaringan] = useState();
  const [status, setStatus] = useState();
  const [order, setOrder] = useState();
  const [vendor, setVendor] = useState();
  const [namaVendor, setNamaVendor] = useState();

  const toast = useToast();

  function generatePassword(length) {
    var password = "";

    let chars =
      "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLength = length;

    for (var i = 0; i <= passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }

    return password;
  }

  const handleSubmit = async () => {
    if (!name || !noJaringan || !status || !order || !vendor || !namaVendor) {
      toast({
        title: "Kolom input harus diisi!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    let genPassword = generatePassword(6);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email: `${name}@gmail.com`,
          password: genPassword,
          pic: "https://res.cloudinary.com/dvf43atmj/image/upload/v1669627214/hbawjzip4yl4tzgpdu6q.png",
          noJaringan,
          status,
          order,
          vendor,
          namaVendor,
        },
        config
      );
      toast({
        title: "Sukses",
        status: "success",
        description: `username: ${name}, password: ${genPassword}`,
        duration: 10000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Terjadi kesalahan",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      setTimeout(() => {
        window.location.reload();
      }, 9000);
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            Buat Chat Baru
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="No Jaringan"
                onChange={(e) => setNoJaringan(e.target.value)}
                mb={3}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Pelanggan"
                onChange={(e) => setName(e.target.value)}
                mb={3}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Status"
                onChange={(e) => setStatus(e.target.value)}
                mb={3}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Order"
                onChange={(e) => setOrder(e.target.value)}
                mb={3}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Vendor"
                onChange={(e) => setVendor(e.target.value)}
                mb={3}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Nama Vendor"
                onChange={(e) => setNamaVendor(e.target.value)}
                mb={3}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue">
              Buat Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
