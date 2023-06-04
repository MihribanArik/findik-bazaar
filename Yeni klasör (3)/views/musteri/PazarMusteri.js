import React, { useState, useEffect, useRef } from "react";
import {
  Heading,
  VStack,
  Box,
  FlatList,
  Input,
  Text,
  Divider,
  HStack,
  Button,
  ScrollView,
  useToast,
  Actionsheet,
  useDisclose,
  Toast,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode } from 'base-64';


const PazarMusteri = () => {
  const [bilgiler, setBilgiler] = useState({ id: "", ad: "", soyad: "" });
  const [ciftciler, setCiftciler] = useState([]);
  const [selectedItem, setSelectedItem] = useState({tonaj:0,fiyat:0,tonaj:0,teklif:0});
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();

  useEffect(() => {
    PazarGetir();

    (async () => {
      AsyncStorage.getItem("token").then((value) => {
        var token = JSON.parse(decode(JSON.parse(value)));
        setBilgiler({ ...token });
      });
    })();

  }, []);

  const teklifPaneli = (item) => {
    setSelectedItem({ ...item, teklif: (parseInt(item.fiyat) * parseInt(item.tonaj))});
    onOpen();
  };

  const teklifVer = () => {
    var formData = new FormData();
    formData.append("ciftciid", selectedItem.id);
    formData.append("musteriid", bilgiler.id);
    formData.append("teklif", selectedItem.teklif);

    fetch("https://findikbazaar.com.tr.ht/testapi.php?action=teklifver", {
      method: "POST",
      headers: {
        Accept: "multipart/form-data",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == "success") {
          Toast.show({
            title: "Teklifiniz başarıyla gönderildi.",
            status: "success",
            duration: 3000,
            placement: "top",
          });
          onClose();
        } else {
          Toast.show({
            title: "Teklifiniz gönderilemedi.",
            status: "error",
            duration: 3000,
            placement: "top",
          });
        }
      });
  };

  const PazarGetir = () => {
    fetch("https://findikbazaar.com.tr.ht/testapi.php?action=pazargetir")
      .then((res) => res.json())
      .then((res) => {
        if (res.status == "success") {
          setCiftciler(res.data);
        } else {
          setCiftciler([]);
        }
      });
  };

  return (
    <VStack space={4} m={3}>
      <Heading size="xl" textAlign="center" color="lightText">
        Pazaryeri
      </Heading>
      <Divider />
      <ScrollView showsHorizontalScrollIndicator={false} height="75%">
        {ciftciler.length == 0 && (
          <Text color="lightText" textAlign="center" mt={5}>
            Henüz pazaryeri ilanı bulunmamaktadır.
          </Text>
        )}
        <FlatList
          data={ciftciler}
          m="0"
          p={0}
          renderItem={({ item }) => (
            <Box
              bg="amber.900"
              shadow={2}
              rounded="lg"
              my="2"
              maxWidth="100%"
              width="100%"
              alignSelf="center"
            >
              <HStack
                space={2}
                alignItems="center"
                justifyContent="space-between"
                p={2}
              >
                <HStack space={2} alignItems="center">
                  <Text bold color="lightText">
                    {item.ad} {item.soyad}
                  </Text>
                </HStack>
                <Text bold color="lightText">
                  Depo : {item.ilce} / {item.il}
                </Text>
              </HStack>
              <Divider />
              <HStack
                space={2}
                alignItems="center"
                justifyContent="space-between"
                p={2}
              >
                <HStack space={2} alignItems="center">
                  <Text bold color="lightText">
                    Tonaj: {parseInt(item.tonaj).toLocaleString('tr-TR')}KG
                  </Text>
                </HStack>
                <Text color="lightText" bold>Fiyat(KG): {item.fiyat.toLocaleString('tr-TR')} ₺</Text>
              </HStack>
              <Divider />
              <HStack
                space={2}
                alignItems="stretch"
                justifyContent="space-between"
                p={2}
              >
                <Text bold color="lightText">
                  Toplam Fiyat: {(item.tonaj * item.fiyat).toLocaleString('tr-TR')} ₺
                </Text>
                <Button colorScheme="amber" size="sm" onPress={() => teklifPaneli(item)}>
                  <Text color="lightText">Teklif Ver</Text>
                </Button>
              </HStack>
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item alignContent="center" alignItems="center">
            <Text color="amber.900" fontWeight="bold" fontSize="xl" p="0.5" textAlign="center">Teklif Formu</Text>
            <Box
              bg="amber.600"
              shadow={2}
              rounded="xl"
              my="2"
              width="100%"
              alignSelf="center"
              
            >
              <HStack
                space={2}
                alignItems="center"
                justifyContent="space-between"
                p={2}
              >
                <HStack space={2} alignItems="center">
                  <Text bold color="lightText">
                    {selectedItem.ad} {selectedItem.soyad}
                  </Text>
                </HStack>
                <Text color="lightText">
                Tonaj: {parseInt(selectedItem.tonaj).toLocaleString('tr-TR')}KG
                </Text>
              </HStack>
              <Divider />
              <HStack
                space={2}
                alignItems="center"
                justifyContent="space-between"
                p={2}
              >
                <HStack space={2} alignItems="center">
                  <Text bold color="lightText">
              Toplam Fiyat: {(selectedItem.tonaj * selectedItem.fiyat).toLocaleString('tr-TR')} ₺
                  </Text>
                </HStack>
                <Text color="lightText">Fiyat(KG): {selectedItem.fiyat.toLocaleString('tr-TR')} ₺</Text>
              </HStack>
              <Divider />
              <HStack
                space={2}
                alignItems="stretch"
                justifyContent="space-between"
                p={2}
                >
                <Text bold color="lightText">
                 Depo : {selectedItem.mahalle} / {selectedItem.ilce} / {selectedItem.il}
                </Text>
              </HStack>
              <HStack
                space={2}
                alignItems="stretch"
                justifyContent="space-between"
                p={2}
                >
                <Text bold color="lightText">
                 {selectedItem.adres} 
                </Text>
              </HStack>
              <Divider />
              <HStack
                space={2}
                alignItems="stretch"
                justifyContent="space-between"
                p={2}
                >
                <Text bold color="lightText">
                Hasat Konumu : {selectedItem.konum}
                </Text>
              </HStack>
            </Box>
          </Actionsheet.Item>
          <Actionsheet.Item
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            p="0"
            margin={0}

          >
            <HStack
              space={2}
              alignSelf="center"
              alignItems="center"
              justifyContent="center"
              p={2}
              width="110%"
              backgroundColor="amber.600"
              rounded="xl"
            >
              <HStack space={2} alignItems="center">
                <Text bold color="lightText" paddingLeft={2}>
                  Teklif Fiyatı
                </Text>
              </HStack>
              <Input
                placeholder="Teklif Fiyatı"
                keyboardType="numeric"
                width="50%"
                bg="amber.900"
                color="lightText"
                defaultValue={parseInt(selectedItem.fiyat) * parseInt(selectedItem.tonaj)}
                value={selectedItem.teklif}
                onChangeText={(text) => {
                  setSelectedItem({ ...selectedItem, teklif: parseInt(text) });
                }}
                borderColor="amber.900"
                borderWidth="1"
              />
            </HStack>
          </Actionsheet.Item>
          <Actionsheet.Item
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            p="0"
            margin={2}
          >
            <Button
              colorScheme="amber"
              backgroundColor="amber.800"
              size="md"
              onPress={() => teklifVer()} >
              <Text color="lightText">Teklif Ver</Text>
            </Button>
          </Actionsheet.Item>

          <Actionsheet.Item
            onPress={() => {
              onClose();
            }}
            justifyContent="center"
            alignItems="center"
            p="0"
            margin={0}
          >
            <Text color="amber.900" fontWeight="bold" fontSize="xl" p="0.5" textAlign="center">İptal</Text>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </VStack>
  );
};

export default PazarMusteri;
