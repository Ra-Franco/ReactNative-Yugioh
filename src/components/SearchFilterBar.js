import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const SearchFilterBar = ({ search, setSearch, typeFilter, setTypeFilter }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.search}
                placeholder="Buscar carta por nome..."
                value={search}
                onChangeText={setSearch}
            />

            <Picker
                selectedValue={typeFilter}
                style={styles.picker}
                onValueChange={setTypeFilter}
            >
                <Picker.Item label="Todos" value="All" />
                <Picker.Item label="Monstro" value="monster" />
                <Picker.Item label="Magia (Spell)" value="spell" />
                <Picker.Item label="Armadilha (Trap)" value="trap" />
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    search: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    picker: {
        height: 50,
    },
});

export default SearchFilterBar;