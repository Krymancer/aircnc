import React, { useState } from 'react';
import { Alert, SafeAreaView, AsyncStorage, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import api from "../services/api";

export default function Book({ navigation }) {
    const [date, setDate] = useState('');
    const id = navigation.getParam('id');

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user');
        const res = await api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers: {
                user_id
            }
        })

        Alert.alert('Solicitação de reserva enviada.');

        navigation.navigate('List')
    }

    function handleCancel() {
        navigation.navigate('List')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>
                Data de interesse *
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Qual data você quer reservar?"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>

            
            <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 30
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 30
    },
    button: {
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        backgroundColor: '#f05a5b'
    },
    cancelButton: {
        backgroundColor: '#ccc',
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});
