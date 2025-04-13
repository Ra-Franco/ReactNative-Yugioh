import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchFilterBar from "../components/SearchFilterBar";


const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");

    useEffect(() => {
        const loadFavorites = async () => {
            const stored = await AsyncStorage.getItem("favorites");
            setFavorites(stored ? JSON.parse(stored) : []);
        };

        const unsubscribe = loadFavorites();
        return () => unsubscribe;
    }, []);

    const removeFavorite = async (cardId) => {
        const updated = favorites.filter((fav) => fav.id !== cardId);
        setFavorites(updated);
        await AsyncStorage.setItem("favorites", JSON.stringify(updated));
    };

    const filteredFavorites = favorites.filter((card) => {
        const matchesName = card.name.toLowerCase().includes(search.toLowerCase());

        const cardType = card.type?.toLowerCase();
        const selectedType = typeFilter.toLowerCase();

        const matchesType =
            selectedType === "all" ||
            (selectedType === "spell" && cardType.includes("spell")) ||
            (selectedType === "trap" && cardType.includes("trap")) ||
            (selectedType === "monster" && cardType.includes("monster"));

        return matchesName && matchesType;
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seus Favoritos</Text>
            <SearchFilterBar
                search={search}
                setSearch={setSearch}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
            />

            <FlatList
                data={filteredFavorites}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image
                            source={{ uri: item.card_images[0].image_url_small }}
                            style={styles.image}
                        />
                        <Text style={styles.name}>{item.name}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => removeFavorite(item.id)}
                        >
                            <Text style={styles.buttonText}>Remover</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 10 },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
    card: { flex: 1, alignItems: "center", margin: 10 },
    image: { width: 100, height: 140, borderRadius: 5 },
    name: { textAlign: "center", marginVertical: 5, fontWeight: "bold" },
    button: {
        backgroundColor: "#c00",
        padding: 5,
        borderRadius: 5,
        width: "80%",
        alignItems: "center",
    },
    buttonText: { color: "#fff" },
});

export default Favorites;
