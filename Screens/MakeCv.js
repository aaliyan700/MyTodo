import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const MakeCv = ({ navigation }) => {
    const [name, setName] = useState('');
    const [education, setEducation] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [address, setAddress] = useState('');
    const ViewCv = () => {
        if (name && education && dateOfBirth && address) {
            let temp = {
                name: name,
                education: education,
                dateOfBirth: dateOfBirth,
                address: address
            }
            console.log("first", temp);
            navigation.navigate("ViewCv", { temp })
        } else {
            alert("Please input required fields");
        }

    }
    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: "white", elevation: 3, padding: 16, borderRadius: 5 }}>
                <TextInput
                    label="Full Name"
                    value={name}
                    onChangeText={(val) => setName(val)}
                    style={styles.input}
                />
                <TextInput
                    label="Education"
                    value={education}
                    onChangeText={(val) => setEducation(val)}
                    style={styles.input}
                />
                <TextInput
                    label="Date of Birth"
                    value={dateOfBirth}
                    onChangeText={(val) => setDateOfBirth(val)}
                    style={styles.input}
                />
                <TextInput
                    label="Address"
                    value={address}
                    onChangeText={(val) => setAddress(val)}
                    style={styles.input}
                />
                <Button mode="contained" style={styles.button}
                    onPress={() => ViewCv()}>
                    View CV
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: 'pink',
    },
    input: {
        marginBottom: 16,
        backgroundColor: 'white',
    },
    button: {
        marginTop: 16,
        backgroundColor: 'green',
    },
});

export default MakeCv;