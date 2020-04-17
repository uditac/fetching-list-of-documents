import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ListRenderItemInfo,
  Image,
  FlatList,
  Button,
} from "react-native";
import { baseUrl, Blue } from "../Constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

export interface DocEntry {
  id: number;
  title: string;
  description: string;
  source: string;
}

const Item = ({ item, onPress }: { item: DocEntry; onPress: () => void }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Text style={styles.itemTitle}>{item.title}</Text>
    <Text style={styles.item}>{item.description}</Text>
  </TouchableOpacity>
);

async function fetchDocs() {
  const res = await fetch(`${baseUrl}/api/documents/`);
  const result = await res.json();
  return result.documents;
}

export function DocumentsScreen() {
  const navigation = useNavigation();
  const [documents, setDocs] = useState<DocEntry[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  function fetchAndSetState() {
    // Reset state
    setDocs([]);
    setError(undefined);

    setTimeout(() => {
      fetchDocs()
        .then((documents) => {
          setDocs(documents);
        })
        .catch((e) => {
          setError(e.toString());
        });
    }, 200);
  }

  useEffect(() => {
    fetchAndSetState();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.buttonWrapper}>
        <Button
          title="Reload Documents"
          color={Blue}
          onPress={() => {
            setTimeout(() => {
              fetchAndSetState();
            }, 200); // Small delay
          }}
        />
      </View>
      {error && <Text>Error: {error}</Text>}
      <FlatList
        data={documents}
        renderItem={({ item }) => (
          <Item
            item={item}
            onPress={() => navigation.navigate("DocumentDetails", { item })}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 10,
    paddingBottom: 10,
  },
  item: {
    paddingLeft: 20,
    alignItems: "flex-start",
    backgroundColor: "#ddd",
    borderRadius: 2,
    paddingTop: 10,
    paddingBottom: 10,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  itemTitle: {
    fontSize: 24,
  },
  img: {
    width: 220,
    height: 124,
    borderColor: "#bbb",
    borderWidth: 1,
    borderRadius: 2,
  },
});
