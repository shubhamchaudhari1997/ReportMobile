import { View, Text, Alert, StyleSheet } from "react-native";
import React from "react";
import Container from "../../components/Container";
import { COLORS } from "../../theme";
import { Button } from "@rneui/base";
import { fontsProxima } from "../../theme/typography";

const DeleteAccount = () => {
  const handleDeleteRequest = () => {
    Alert.alert("Account Deletion", "Account delete request submitted.");
  };

  return (
    <Container
      header={{
        title: `Delete Account`,
        backgroundColor: COLORS.primaryColor,
        statusBarType: "dark-content",
        toggleDrawer: true,
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18, marginBottom: 20,margin:40 }}>Click the button below to proceed with your account deletion request.</Text>

        <Button
          title={"Delete My Account"}
          onPress={handleDeleteRequest}
          titleStyle={styles.titleStyle}
          buttonStyle={styles.buttonStyle}
        />
      </View>
    </Container>
  );
};

export default DeleteAccount;
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.background_chipe,
    flex: 1,
  },
  titleStyle: {
    fontFamily: fontsProxima.bold,
    fontSize: 16,
    color: COLORS.primaryColor,
  },
  buttonStyle: {
    backgroundColor: COLORS.new,
    height: 45,
    marginTop: 15,
    borderRadius: 10,
  },
});
