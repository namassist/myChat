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
  Select,
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
  const [customOrder, setCustomOrder] = useState();
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

      // eslint-disable-next-line no-unused-vars
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email: `${name}@gmail.com`,
          password: genPassword,
          pic: "https://res.cloudinary.com/dvf43atmj/image/upload/v1670308881/userr_wplu4v.png",
          noJaringan,
          status,
          order: customOrder !== undefined ? customOrder  : order,
          vendor,
          namaVendor,
        },
        config
      );

      toast({
        title: "Sukses",
        status: "success",
        description: `email: ${name}@gmail.com, password: ${genPassword}`,
        duration: 1000,
        isClosable: false,
        position: "bottom",
        onCloseComplete: () => {
          navigator.clipboard.writeText(
            `email: ${name}@gmail.com \n password: ${genPassword}`
          );
          alert("email dan pasword login berhasil di copy!");
        },
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
      setTimeout(() => {}, 1100);
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent bg="#7AA7DC">
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
                _placeholder={{ color: "#7B7676" }}
                bg="#D9D9D9"
                mb={3}
                onChange={(e) => setNoJaringan(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Pelanggan"
                onChange={(e) => setName(e.target.value)}
                mb={3}
                _placeholder={{ color: "#7B7676" }}
                bg="#D9D9D9"
              />
            </FormControl>
            <FormControl>
              <Select
                mb={3}
                value={status}
                placeholder="Status"
                bg="#D9D9D9"
                textColor={status !== undefined ? "" : "#7B7676"}
                iconColor="gray.400"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="on progress">On Progress</option>
                <option value="End">End</option>
              </Select>
            </FormControl>
            <FormControl>
              <Select
                bg="#D9D9D9"
                mb={3}
                value={order}
                placeholder="Order"
                textColor={order !== undefined ? "" : "#7B7676"}
                iconColor="gray.400"
                onChange={(e) => setOrder(e.target.value)}
              >
                <option value="Cabut Perangkat">Cabut Perangkat</option>
                <option value="Migrasi Perangkat">Migrasi Perangkat</option>
                <option value="Pasang Baru">Pasang Baru</option>
                <option value="Aktivasi">Aktivasi</option>
                <option value="Lainnya">Lainnya</option>
              </Select>
            </FormControl>
            {order === "Lainnya" ? <FormControl>
              <Input
                onChange={(e) => setCustomOrder(e.target.value)}
                mb={3}
                _placeholder={{ color: "#7B7676" }}
                bg="#D9D9D9"
              />
            </FormControl> : <></> }
            
            <FormControl>
              <Select
                bg="#D9D9D9"
                mb={3}
                value={vendor}
                placeholder="Vendor"
                textColor={vendor !== undefined ? "" : "#7B7676"}
                iconColor="gray.400"
                onChange={(e) => setVendor(e.target.value)}
              >
                <option value="Catu Buana">Catu Buana</option>
                <option value="PPS">PPS</option>
                <option value="Kopkarla">Kopkarla</option>
                <option value="Wahana Teknik">Wahana Teknik</option>
                <option value="SMN Mandiri">SMN Mandiri</option>
                <option value="Pratama Mandiri">Pratama Mandiri</option>
                <option value="Amanah">Amanah</option>
                <option value="Wesi Aji">Wesi Aji</option>
              </Select>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Nama Vendor"
                onChange={(e) => setNamaVendor(e.target.value)}
                mb={3}
                _placeholder={{ color: "#7B7676" }}
                bg="#D9D9D9"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit} bg="#1666BA" textColor="white">
              Buat Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
