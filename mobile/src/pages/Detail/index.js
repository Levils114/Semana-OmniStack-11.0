import React, {useEffect} from 'react';
import {Feather} from '@expo/vector-icons';
import {View, Text, Image, TouchableOpacity, Linking, ScrollView} from 'react-native';
import logo from "./../../../assets/logo.png";
import {useNavigation, useRoute} from '@react-navigation/native';
import * as MailComposer from "expo-mail-composer";
import api from "./../../services/api";

import styles from "./styles";


export default function Detail(){

    const route = useRoute();

    const incidents = route.params.incidents;
    
    const navigation = useNavigation();
    const message = `Olá ${incidents.name}, estou entrando em contato para ser um herói do seu caso ${incidents.title} com o valor de R$ ${incidents.value}`;

    function navigateToIncidents(){
        navigation.goBack('incidents')
    }

    function sendEmail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incidents.title}`,
            recipients: [incidents.email],
            body: message
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=+55${incidents.wpp}&text=${message}`)
    }
    
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={navigateToIncidents}>
                    <Feather name="arrow-left" size={28} color="#e02041"/>
                </TouchableOpacity>
                <Image source={logo} />
            </View>
          <ScrollView showsVerticalScrollIndicator={false}>   
            <View style={styles.incident}>
                <View style={styles.moreDetails}>
                    <View>
                        <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incidents.name}</Text>
                    </View>
                    
                    <View>        
                        <Text style={[styles.incidentProperty, {marginTop: 0}]}>Cidade:</Text>
                        <Text style={styles.incidentValue}>{incidents.city}</Text>
                    </View>
                    
                    <View>        
                        <Text style={[styles.incidentProperty, {marginTop: 0}]}>UF:</Text>
                        <Text style={styles.incidentValue}>{incidents.uf}</Text>
                    </View>    
                </View>

                <Text style={styles.incidentProperty}>Caso:</Text>
                <Text style={styles.incidentValue}>{incidents.title}</Text>

                <Text style={styles.incidentProperty}>Descrição:</Text>
                <Text style={styles.incidentValue}>{incidents.description}</Text>

                <Text style={styles.incidentProperty}>Valor:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR',
                     {style:'currency', currency: 'BRL'})
                     .format(incidents.value)}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroeTitle}>Salve o dia</Text>
                <Text style={styles.heroeTitle}>Seja o herói desse caso</Text>

                <Text style={styles.heroeDescription}>Entre em contato</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.actionButton} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton} onPress={sendEmail}>
                        <Text style={styles.actionText}>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
         </ScrollView>      
        </View>
    );
}