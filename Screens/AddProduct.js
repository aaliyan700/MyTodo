import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput, Button, Divider, FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const categories = ['Electronics', 'Clothing', 'Groceries'];

const AddProduct = ({ navigation }) => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const selectCategory = category => {
        setProductCategory(category);
        setIsDropdownOpen(false);
    };

    const saveProduct = async () => {
        try {
            const product = {
                name: productName,
                price: productPrice,
                category: productCategory,
            };

            const products = await AsyncStorage.getItem('products');
            const productList = products ? JSON.parse(products) : [];

            productList.push(product);
            await AsyncStorage.setItem('products', JSON.stringify(productList));

            alert('Product saved successfully!');
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Product</Text>
            <TextInput
                label="Product Name"
                value={productName}
                onChangeText={text => setProductName(text)}
                style={styles.input}
            />
            <TextInput
                label="Product Price"
                value={productPrice}
                onChangeText={text => setProductPrice(text)}
                keyboardType="numeric"
                style={styles.input}
            />
            <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownContainer}>
                <Text style={styles.dropdownLabel}>Product Category</Text>
                <Text style={styles.dropdownValue}>{productCategory}</Text>
                <Text style={styles.dropdownIcon}>{isDropdownOpen ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            {isDropdownOpen && (
                <ScrollView style={styles.dropdownList}>
                    {categories.map((category, index) => (
                        <TouchableOpacity key={index} onPress={() => selectCategory(category)} style={styles.dropdownItem}>
                            <Text>{category}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
            <Button
                mode="contained"
                onPress={saveProduct}
                style={styles.button}
                contentStyle={styles.buttonContent}
            >
                Save Product
            </Button>
            <Divider style={styles.divider} />
            <FAB
                style={styles.fab}
                onPress={() => navigation.navigate("ViewProduct")}
                label='Display'
            >s
            </FAB>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        marginBottom: 10,
    },
    dropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 4,
        justifyContent: 'space-between',
    },
    dropdownLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    dropdownValue: {
        fontSize: 16,
    },
    dropdownIcon: {
        fontSize: 16,
    },
    dropdownList: {
        maxHeight: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 5,
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    button: {
        marginTop: 20,
    },
    buttonContent: {
        height: 50,
    },
    divider: {
        marginVertical: 20,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    fabText: {
        color: 'white', // Customize the text color
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
});

export default AddProduct;
