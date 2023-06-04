import React,{useState,useEffect} from "react";
import { Heading, VStack,Box, FormControl,Input,HStack,Text,Divider, Button, ScrollView, useToast } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode } from 'base-64';
import { useNavigation } from "@react-navigation/native";

const ProfilMusteri = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const [bilgiler, setBilgiler] = useState({ id: "", ad: "", soyad: "" });
  const [profil, setProfil] = useState({
    musteriid: "",
    userType: "musteri",
    il:   "",
    ilce: "",
    mahalle: "",
    adres: "",
    
  });

  useEffect(() => {
    (async () => {
      AsyncStorage.getItem("token").then((value) => {
        var token = JSON.parse(decode(JSON.parse(value)));
        setBilgiler({ ...token });
      });
    })();
  },[]);

  useEffect(() => {
    if (bilgiler.id != "") 
    fetch("https://findikbazaar.com.tr.ht/testapi.php?action=musteriprofilbilgigetir&musteriid="+bilgiler.id)
      .then((res) => res.json())
      .then((res) => {
         if (res.data) {
           setProfil({
            musteriid: res.data.userId,
            userType: "musteri",
            il:   res.data.il,
            ilce: res.data.ilce,
            mahalle: res.data.mahalle,
            adres: res.data.adres,
          
        });
         }
      });


    setProfil({ ...profil, musteriid: bilgiler.id });
  }, [bilgiler]);
 
  const kaydet = () => {
    var profilform = new FormData();
    Object.entries(profil).forEach(([key, value]) => {
      profilform.append(key, value);
    });
    fetch("https://findikbazaar.com.tr.ht/testapi.php?action=musterbilgiguncelle", {
      method: "POST",
      headers: {
        Accept: "multipart/form-data",
      },
      body: profilform,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status=="success") {
          toast.show({
            title: "Kayıt Başarılı",
            status: "success",
            description: res.message,
            placement: "top",
            duration: 3000,
          });
        } else {
          toast.show({
            title: "Kayıt Başarısız",
            status: "error",
            description: res.message,
            placement: "top",
            duration: 3000,
          });
        }
      });
  };

  const cikisYap = () => {
    AsyncStorage.removeItem("token");
    navigation.navigate("Login");
  };

  return (
    
      <VStack space={4} m={3} maxWidth="90%"
      w="90%">
      <Heading size="xl" color="lightText">{bilgiler.ad + " " + bilgiler.soyad}</Heading>
      <HStack space={2} alignItems="center"
      justifyContent="space-between">
        <Heading size="md" color="lightText">Hoşgeldiniz!</Heading>
        <Button size="sm" colorScheme="danger" color="lightText" onPress={()=>cikisYap()}>Çıkış Yap</Button>
      </HStack>
      <Box
        bg="dark.50"
        shadow={2}
        rounded="lg"
        w="100%"
        alignSelf="center"
        p={3}
        py={5}
      >
      
        <Heading size="md"  color="lightText">
          Adres Bilgileri
        </Heading>
        <FormControl >
          <FormControl.Label _text={{bold:true}}>İl</FormControl.Label>
          <Input
            placeholder="İl"
            color="lightText"
            value={profil.il}
            onChangeText={(text) => setProfil({ ...profil, il: text }) }
          />
        </FormControl>
        <FormControl >
          <FormControl.Label _text={{bold:true}}>İlçe</FormControl.Label>
          <Input
            placeholder="İlçe"
            color="lightText"
            value={profil.ilce}
            onChangeText={(text) => setProfil({ ...profil, ilce: text  })}
          />
        </FormControl>
        <FormControl >
          <FormControl.Label _text={{bold:true}}>Mahalle</FormControl.Label>
          <Input
            placeholder="Mahalle"
            color="lightText"
            value={profil.mahalle}
            onChangeText={(text) => setProfil({ ...profil, mahalle: text  })}
          />
        </FormControl>
        <FormControl >
          <FormControl.Label _text={{bold:true}}>Adres</FormControl.Label>
          <Input
            placeholder="Adres"
            color="lightText"
            value={profil.adres}
            onChangeText={(text) => setProfil({ ...profil, adres: text  })}
          />
        </FormControl>
        <FormControl >
          <Button mt={2} colorScheme="cyan" _text={{bold:true}} onPress={()=>kaydet()}>Kaydet</Button>
        </FormControl>

      </Box>
    </VStack>
  );
};

export default ProfilMusteri;
