import React,{useState,useEffect} from "react";
import { Heading, VStack,Box, FormControl,Input,Text,Divider, Button, ScrollView, useToast, HStack } from "native-base";
import { TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode } from 'base-64';
import { useNavigation } from "@react-navigation/native";

const ProfilCiftci = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const [bilgiler, setBilgiler] = useState({ id: "", ad: "", soyad: "" });
  const [profil, setProfil] = useState({
      ciftciid: 0,
      userType: "ciftci",
      tonaj: 0,
      konum: "",
      fiyat: 0,
      masraf: 0,
      il: "",
      ilce: "",
      mahalle: "",
      adres: "",
    
  });

  
  useEffect(() => {
    
    (async () => {
      AsyncStorage.getItem("token").then((value) => {
        var token = JSON.parse(decode(JSON.parse(value)));
        setBilgiler({ ...token });
        bilgileriGetir(token.id);
      });
    })();

    
  }, []);

  const bilgileriGetir = (cid) => {
     
    fetch("https://findikbazaar.com.tr.ht/testapi.php?action=ciftciprofilbilgigetir&ciftciid="+cid)
      .then((res) => res.json())
      .then((res) => {
         if (res.data) {
           setProfil({
            ciftciid: cid,
            userType: "ciftci",
            tonaj: res.data.tonaj,
            konum: res.data.konum,
            fiyat: res.data.fiyat,
            masraf: res.data.masraf,
            il:   res.data.il,
            ilce: res.data.ilce,
            mahalle: res.data.mahalle,
            adres: res.data.adres,
          
        });
         }
      });


    setProfil({ ...profil, ciftciid: cid });
  }
 
  const kaydet = () => {
    var profilform = new FormData();
    Object.entries(profil).forEach(([key, value]) => {
      profilform.append(key, value);
    });
    fetch("https://findikbazaar.com.tr.ht/testapi.php?action=ciftcibilgiguncelle", {
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
            description: "Kayıt Başarılı",
            placement: "top",
            duration: 3000,
          });
        } else {
          toast.show({
            title: "Kayıt Başarısız",
            status: "error",
            description: "Kayıt Başarısız",
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
      <ScrollView
        bg="dark.50"
        shadow={2}
        rounded="lg"
        w="100%"
        alignSelf="center"
        p={3}
        height={480}
        showsVerticalScrollIndicator={false}
      >
        <Heading size="md"  mt={2} color="lightText">
          Hasat Bilgileri
        </Heading>
        
        
        <FormControl >
          <FormControl.Label _text={{bold:true}}>Ağırlık(KG)</FormControl.Label>
          <Input
            placeholder="Ağırlık"
            color="lightText"
            value={profil.tonaj}
            inputMode="numeric"
            name="tonaj"
             onChangeText={(text) => setProfil({ ...profil, tonaj: parseInt(text) })}
          />
        </FormControl>
        <FormControl >
          <FormControl.Label _text={{bold:true}}>Kilogram Fiyatı(₺)</FormControl.Label>
          <Input
            placeholder="Fiyat"
            color="lightText"
            inputMode="numeric"
            value={profil.fiyat}
            onChangeText={(text) => setProfil({ ...profil, fiyat: parseInt(text)  })}
          />
        </FormControl>

        <FormControl >
          <FormControl.Label _text={{bold:true}}>Toplam Masraf(₺)</FormControl.Label>
          <Input
            placeholder="Masraf"
            color="lightText"
            inputMode="numeric"
            value={profil.masraf}
            onChangeText={(text) => setProfil({ ...profil,masraf: parseInt(text) })}
          />
        </FormControl>

        <FormControl >
          <FormControl.Label _text={{bold:true}}>Tarla Konumu</FormControl.Label>
          <Input
            placeholder="Konum"
            color="lightText"
            value={profil.konum}
            onChangeText={(text) => setProfil({ ...profil, konum: text })}
          />
        </FormControl>

        <Divider my={2} />

        <Heading size="md" mt={2} color="lightText">
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
        <FormControl mb={10}>
          <Button mt={2} colorScheme="cyan" _text={{bold:true}} onPress={()=>kaydet()}>Kaydet</Button>
        </FormControl>

      </ScrollView>
    </VStack>
  );
};

export default ProfilCiftci;
