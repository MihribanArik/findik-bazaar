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

const TekliflerCiftci = () => {
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

  const TeklifleriGetir = (ciftciid) => {
    fetch("https://findikbazaar.com.tr.ht/testapi.php?action=ciftciteklifgetir&ciftciid="+ciftciid)
      .then((res) => res.json())
      .then((res) => {
        if (res.status == "success") {
          setTeklifler(res.data);
        }
      }
      );
  }

  const TeklifeOnayVer = (teklifid) => {
    fetch("https://findikbazaar.com.tr.ht/testapi.php?action=teklifonayver&teklifid=" + teklifid, 
    {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == "success") {
          toast.show({
            title: "Teklif Onaylandı",
            status: "success",
            description: "Teklif Onaylandı",
            placement: "top",
            duration: 3000,
          });
          TeklifleriGetir(bilgiler.id);
        }
      }
      );
  }

  const TeklifeReddet = (teklifid) => {
    fetch("https://findikbazaar.com.tr.ht/testapi.php?action=teklifreddet&teklifid=" + teklifid,
      {
        method: "POST",
      })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == "success") {
          toast.show({
            title: "Teklif Reddedildi",
            status: "success",
            description: "Teklif Reddedildi",
            placement: "top",
            duration: 3000,
          });
          TeklifleriGetir(bilgiler.id);
        }
      }
      );
  }

  return (
    <VStack space={4} m={3}>
      <Heading size="xl" textAlign="center" color="lightText">
        Teklifler
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
                justifyContent="center"
                p={2}
              >
                <Text bold textAlign="center" color="lightText">
                  {item.ad} {item.soyad}
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
                    Teklifiniz: {item.teklif.toLocaleString('tr-TR')}₺
                  </Text>
                </HStack>
                <Text color="lightText" fontWeight="extrabold">Durum: &nbsp;
                {item.durum == 1 && <Badge colorScheme="warning">Beklemede</Badge>}
                {item.durum == 2 && <Badge colorScheme="success">Kabul Edildi</Badge>}
                {item.durum == 3 && <Badge colorScheme="danger">Reddedildi</Badge>}
                 </Text>
              </HStack> 
              <Divider />
              <HStack
                space={2}
                alignItems="center"
                p={2}
              >
                <Text bold color="lightText">
                Müşteri Adresi: {item.mahalle} / {item.ilce} / {item.il}  
                </Text>
              </HStack>
              <Divider />
              <HStack
                space={2}
                alignItems="center"
                p={2}
              >
                <Text bold color="lightText">
                  Eposta: {item.email}
                </Text>
              </HStack>
              <Divider />
              <HStack
                space={2}
                alignItems="center"
                justifyContent="space-between"
                p={2}
              >
                {item.durum != 2 && 
                <Button
                  colorScheme="success"
                  onPress={() => TeklifeOnayVer(item.id)}
                >
                  Onayla
                </Button>}

                {item.durum != 3 &&
                <Button
                  colorScheme="danger"
                  onPress={() => TeklifeReddet(item.id)}
                >
                  Reddet
                </Button>}



                
                </HStack>
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </VStack>
  );
};

export default TekliflerCiftci;
