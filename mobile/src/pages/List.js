import React, { useState, useEffect } from "react";
import socketio from 'socket.io-client';
import {
    AsyncStorage,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Image,
    Alert
} from "react-native";

import SpotList from "../components/SpotList";
import logo from "../assets/logo.png";

import api from '../services/api';

export default function List() {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio(api.defaults.baseURL, {
                query: { user_id }
            });

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'aprovada' : 'rejeitada'}`)
            })
        })
    }, []);

    useEffect(() => {
        AsyncStorage.getItem("techs").then(storageTechs => {
            const techsArray = storageTechs.split(",").map(tech => tech.trim());
            setTechs(techsArray);
        });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <ScrollView>
                {techs.map((tech, index) => (
                    <SpotList key={index} tech={tech} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 30
    }
});
