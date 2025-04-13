import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

const CardDetails = ({ route }) => {
    const { card } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{card.name}</Text>

            <View style={styles.cardBox}>
                <Image
                    source={{ uri: card.card_images[0].image_url }}
                    style={styles.cardImage}
                />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Informações Básicas</Text>
                    <Info label="Tipo" value={card.type} />
                    {card.attribute && <Info label="Atributo" value={card.attribute} />}
                    {card.level && <Info label="Nível" value={card.level} />}
                    {card.race && <Info label="Raça" value={card.race} />}
                    {card.archetype && <Info label="Arquetipo" value={card.archetype} />}
                </View>

                {(card.atk !== undefined || card.def !== undefined) && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Status de Batalha</Text>
                        {card.atk !== undefined && <Info label="ATK" value={card.atk} />}
                        {card.def !== undefined && <Info label="DEF" value={card.def} />}
                    </View>
                )}

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Descrição</Text>
                    <Text style={styles.description}>{card.desc}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const Info = ({ label, value }) => (
    <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}:</Text>
        <Text style={styles.infoValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#f2f2f2",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#2e2e2e",
        textAlign: "center",
        marginBottom: 12,
    },
    cardBox: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    cardImage: {
        width: "100%",
        height: 300,
        resizeMode: "contain",
        borderRadius: 8,
        marginBottom: 16,
    },
    section: {
        marginBottom: 16,
        padding: 8,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#7159c1",
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingBottom: 4,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    infoLabel: {
        fontWeight: "600",
        color: "#333",
    },
    infoValue: {
        color: "#555",
    },
    description: {
        color: "#444",
        fontSize: 14,
        lineHeight: 20,
        textAlign: "justify",
    },
});

export default CardDetails;