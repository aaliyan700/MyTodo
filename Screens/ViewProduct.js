import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Divider } from 'react-native-paper';
const categories = ['All', 'Electronics', 'Clothing', 'Groceries'];
const sortingOptions = [
    { label: 'Sort By Price', value: 'none' },
    { label: 'Low to High', value: 'lowToHigh' },
    { label: 'High to Low', value: 'highToLow' },
];
const ViewProduct = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
    const [selectedPriceSortOption, setSelectedPriceSortOption] = useState('none');
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const products = await AsyncStorage.getItem('products');
                if (products) {
                    const productList = JSON.parse(products);
                    setProducts(productList);
                    setFilteredProducts(productList);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchProducts();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [selectedCategoryFilter, selectedPriceSortOption]);

    const applyFilters = () => {
        let filtered = products;

        if (selectedCategoryFilter !== 'All') {
            filtered = products.filter(product => product.category === selectedCategoryFilter);
        }

        if (selectedPriceSortOption === 'lowToHigh') {
            filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (selectedPriceSortOption === 'highToLow') {
            filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        }
        setFilteredProducts([...filtered]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Product List</Text>
            </View>
            <View style={styles.filterContainer}>
                <TouchableOpacity onPress={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)} style={styles.filterItem}>
                    <Text style={styles.filterLabel}>Category</Text>
                    <Text style={styles.filterValue}>{selectedCategoryFilter}</Text>
                    <Text style={styles.filterIcon}>{isCategoryDropdownOpen ? '▲' : '▼'}</Text>
                </TouchableOpacity>
                {isCategoryDropdownOpen && (
                    <ScrollView style={styles.dropdownList}>
                        {categories.map((category, index) => (
                            <TouchableOpacity key={index} onPress={() => {
                                setSelectedCategoryFilter(category);
                                setIsCategoryDropdownOpen(false);
                            }} style={styles.dropdownItem}>
                                <Text>{category}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
                <TouchableOpacity onPress={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)} style={styles.filterItem}>
                    <Text style={styles.filterLabel}>Sort By</Text>
                    <Text style={styles.filterValue}>{sortingOptions.find(option => option.value === selectedPriceSortOption).label}</Text>
                    <Text style={styles.filterIcon}>{isPriceDropdownOpen ? '▲' : '▼'}</Text>
                </TouchableOpacity>
                {isPriceDropdownOpen && (
                    <ScrollView style={styles.dropdownList}>
                        {sortingOptions.map((option, index) => (
                            <TouchableOpacity key={index} onPress={() => {
                                setSelectedPriceSortOption(option.value);
                                setIsPriceDropdownOpen(false);
                            }} style={styles.dropdownItem}>
                                <Text>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
            </View>
            <Divider style={styles.divider} />
            <ScrollView>
                {filteredProducts.map((product, index) => (
                    <View key={index} style={styles.productItem}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productPrice}>Price: ${product.price}</Text>
                        <Text style={styles.productCategory}>Category: {product.category}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    filterItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    filterLabel: {
        fontSize: 16,
        marginRight: 5,
    },
    filterValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    filterIcon: {
        fontSize: 16,
    },
    dropdownList: {
        maxHeight: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 5,
        position: 'absolute',
        backgroundColor: 'white',
        width: '100%',
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    divider: {
        marginVertical: 10,
    },
    productItem: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
    },
    productCategory: {
        fontSize: 16,
    },
});

export default ViewProduct;
