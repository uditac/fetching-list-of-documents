import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { ScreenParamList } from "../App";
import { baseUrl } from "../Constants";
import FileViewer from "react-file-viewer";

export function DocumentDetails() {
  const route = useRoute<RouteProp<ScreenParamList, "DocumentDetails">>();
  const { item } = route.params;
  const file = `${baseUrl}/${item.source}`;

  const type = "docx";

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>{item.title}</Text>

      <Text style={styles.desc}>{item.description}</Text>
      <FileViewer fileType={type} filePath={file} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 10,
    textAlign: "center",
  },
  desc: {
    color: "grey",
    lineHeight: 20,
    textAlign: "center",
  },
  image: {
    flex: 1,
  },
});
