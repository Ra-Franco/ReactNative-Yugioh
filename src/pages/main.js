import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import SearchFilterBar from "../components/SearchFilterBar";
import { useIsFocused } from "@react-navigation/native";

const Main = ({ navigation }) => {
  const [allCards, setAllCards] = useState([]);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const pageSize = 20;
  const isFocused = useIsFocused();

  useEffect(() => {
    loadAllCards();
    loadFavorites();
    if (isFocused) {
      loadFavorites();
    }
  }, [isFocused]);

  useEffect(() => {
    paginateCards();
  }, [page, allCards]);

  const loadAllCards = async () => {
    try {
      setLoading(true);
      const response = await api.get("/cardinfo.php");
      setAllCards(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar cartas:", error);
      setLoading(false);
    }
  };

  const paginateCards = () => {
    if (!Array.isArray(allCards) || allCards.length === 0) return;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const newCards = allCards.slice(start, end);
    setDisplayedCards((prev) => [...prev, ...newCards]);
  };

  const loadMoreCards = () => {
    if (!loading && displayedCards.length < allCards.length) {
      setPage((prev) => prev + 1);
    }
  };

  const loadFavorites = async () => {
    const stored = await AsyncStorage.getItem("favorites");
    setFavorites(stored ? JSON.parse(stored) : []);
  };

  const toggleFavorite = async (card) => {
    let updatedFavorites;
    if (favorites.find((fav) => fav.id === card.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== card.id);
    } else {
      updatedFavorites = [...favorites, card];
    }
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (card) => favorites.some((fav) => fav.id === card.id);

  const handleCardPress = (card) => {
    navigation.navigate("CardDetails", { card });
  };

  const filteredCards = displayedCards.filter((card) => {
    const matchesSearch = card.name.toLowerCase().includes(search.toLowerCase());
    const matchesType =
      typeFilter === "All" || card.type.toLowerCase().includes(typeFilter);
    return matchesSearch && matchesType;
  });

  if (loading && displayedCards.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#7159c1" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.favButton}
        onPress={() => navigation.navigate("Favorites")}
      >
        <Text style={styles.favText}>Ver Favoritos</Text>
      </TouchableOpacity>

      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

      <FlatList
        data={filteredCards}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
            <Image
              source={{ uri: item.card_images[0].image_url_small }}
              style={styles.image}
            />
            <Text style={styles.name}>{item.name}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => toggleFavorite(item)}
            >
              <Text style={styles.buttonText}>
                {isFavorite(item) ? "Remover" : "Favoritar"}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        onEndReached={loadMoreCards}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          loading ? <ActivityIndicator size="small" color="#7159c1" /> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  card: { flex: 1, alignItems: "center", margin: 10 },
  image: { width: 100, height: 140, borderRadius: 5 },
  name: { textAlign: "center", marginVertical: 5, fontWeight: "bold" },
  button: {
    backgroundColor: "#7159c1",
    padding: 5,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: { color: "#fff" },
  favButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  favText: { color: "#fff", fontWeight: "bold" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default Main;