import * as React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { Button } from 'react-native-paper';
export default function ViewCv({ route }) {
    const { temp } = route.params;
    const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <style>
      body {
        font-family: 'Helvetica Neue', sans-serif;
        text-align: center;
        background-color: #f5f5f5;
        margin: 0;
        padding: 20px;
      }
      
      h1 {
        font-size: 36px;
        font-weight: bold;
        margin: 10px 0;
      }
      
      p {
        font-size: 18px;
        margin: 5px 0;
      }
      
      .section {
        border-top: 2px solid #333;
        padding: 20px 0;
      }
    </style>
  </head>
  <body>
    <h1>Resume</h1>
    
    <div class="section">
      <h1>Personal Information</h1>
      <p><strong>Name:</strong> ${temp.name}</p>
      <p><strong>Date of Birth:</strong> ${temp.dateOfBirth}</p>
      <p><strong>Address:</strong> ${temp.address}</p>
    </div>
    
    <div class="section">
      <h1>Education</h1>
      <p>${temp.education}</p>
    </div>
  </body>
</html>
`;
    const printToFile = async () => {
        const { uri } = await Print.printToFileAsync({ html });
        console.log('File has been saved to:', uri);
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    };
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.name}>{temp.name}</Text>
                        <Text style={styles.subTitle}>Curriculum Vitae</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        <Text style={styles.info}>{temp.education}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Date of Birth</Text>
                        <Text style={styles.info}>{temp.dateOfBirth}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Address</Text>
                        <Text style={styles.info}>{temp.address}</Text>
                    </View>
                    <Button mode="contained" style={styles.generateButton}
                        onPress={printToFile}>
                        Generate PDF
                    </Button>
                </View>
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        elevation: 5,
        borderRadius: 5,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    subTitle: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    info: {
        fontSize: 16,
    },
    generateButton: {
        marginTop: 20,
        backgroundColor: 'green',
    },
});

