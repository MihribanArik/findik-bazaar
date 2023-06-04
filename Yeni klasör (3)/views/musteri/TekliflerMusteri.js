import React, { useState, useEffect, useRef } from "react";
import {
  Heading,
  VStack,
  Box,
  FlatList,
  Text,
  Divider,
  HStack,
  Button,
  ScrollView,
  useToast,
  Badge,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode } from 'base-64';

const TekliflerMusteri = () => {
  const toast = useToast();
  const [bilgiler, setBilgiler] = useState({ id: "", ad: "", soyad: "" });
  const [teklifler, setTeklifler] = useState([]);

  useEffect(() => {
    (async () => {
      AsyncStorage.getItem("token").then((value) => {
        var token = JSON.parse(decode(JSON.parse(value)));
        setBilgiler({ ...token });
        TeklifleriGetir(token.id);
      });
    })();

  }, []);

  const TeklifleriGetir = (musteriid) => {
    fetch("https://findikbazaar.com.tr.ht/testapi.php?action=musteriteklifgetir&musteriid=" + musteriid)
      .then((res) => res.json())
      .then((res) => {
        if (res.status == "success") {
          setTeklifler(res.data);
        }
      }
      );
  }

  const TeklifeGeriCek = (teklifid) => {
    var formData = new FormData();
    formData.append("musteriid", bilgiler.id);
    formData.append("id", teklifid);
    fetch("https://findikbazaar.com.tr.ht/testapi.php?action=teklifgericek",
      {
        method: "POST",
        headers: {
          Accept: 'multipart/form-data',
        },
        body: formData
      })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == "success") {
          toast.show({
            title: "Teklif Geri Çekildi",
            status: "success",
          });
          TeklifleriGetir(bilgiler.id);
        }
      }
      );
  }

  return (
    <VStack space={4} m={3}>
      <Heading size="xl" textAlign="center" color="lightText">
        Teklifleriniz
      </Heading>
      <Divider />
      <ScrollView showsHorizontalScrollIndicator={false} height="75%">
        {teklifler.length == 0 && (
          <Text color="lightText" textAlign="center" mt={5}>
            Henüz Teklif bulunmamaktadır.
          </Text>
        )}
        <FlatList
          data={teklifler}
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
                <Text color="lightText">
                  <Text fontWeight="extrabold">Depo :</Text> {item.ilce} / {item.il}
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
                    Tonaj: {item.tonaj.toLocaleString('tr-TR')} KG
                  </Text>
                </HStack>
                <Text color="lightText">
                <Text fontWeight="extrabold">Fiyat(KG):</Text> {item.fiyat.toLocaleString('tr-TR')} ₺
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
                  Toplam Fiyat: {(item.tonaj * item.fiyat).toLocaleString('tr-TR')} ₺
                </Text>
                <Button colorScheme="red" size="sm" onPress={()=>TeklifeGeriCek(item.id)}>
                  <Text color="lightText">Geri Çek</Text>
                </Button>
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
                    Teklifiniz: {item.teklif.toLocaleString('tr-TR')}₺
                  </Text>
                </HStack>
                <Text color="lightText" fontWeight="extrabold">Durum: &nbsp;
                {item.durum == 1 && <Badge colorScheme="warning">Beklemede</Badge>}
                {item.durum == 2 && <Badge colorScheme="success">Kabul Edildi</Badge>}
                {item.durum == 3 && <Badge colorScheme="danger">Reddedildi</Badge>}
                 </Text>
              </HStack> 
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </VStack>
  );
};

export default TekliflerMusteri;
