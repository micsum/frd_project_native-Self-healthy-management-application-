import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import { handleToken } from "../hooks/use-token";
import axios from "axios";
import { Domain } from "@env";
import { ProfileData } from "../utils/type";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
export const ProfileScreen = () => {
  const { clearToken } = handleToken();
  const [profileInfo, setProfileInfo] = useState<ProfileData>();

  const logout = () => {
    clearToken();
  };

  const { token } = handleToken();

  const getInfo = async () => {
    let profileInfo = await axios.get(Domain + `/user/profileInfo`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProfileInfo(profileInfo.data.info[0]);
  };

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    console.log("profileInfo : ", profileInfo);
  }, [profileInfo]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLLUBkJgwdSnMEx7TGzJ5p_2kz8JxCGv1bW3EKuBCa2w&s",
          }}
          style={styles.avatar}
          resizeMode="cover"
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{profileInfo?.username}</Text>
          <Text style={styles.userEmail}>{profileInfo?.email}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.infoSection}>
          <View
            style={[styles.infoIconContainer, { backgroundColor: "#8E44AD" }]}
          >
            <Text style={styles.infoIcon}>
              <FontAwesome5 name="user-alt" size={18} />
            </Text>
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Name</Text>
            <Text style={styles.infoText}>{profileInfo?.username}</Text>
          </View>
        </View>
        {profileInfo?.height && (
          <View style={styles.infoSection}>
            <View
              style={[styles.infoIconContainer, { backgroundColor: "#364F6B" }]}
            >
              <Text style={styles.infoIcon}>
                <MaterialCommunityIcons name="human-male-height" size={18} />
              </Text>
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>Height</Text>
              <Text style={styles.infoText}>{profileInfo?.height} cm</Text>
            </View>
          </View>
        )}
        {profileInfo?.weight && (
          <View style={styles.infoSection}>
            <View
              style={[styles.infoIconContainer, { backgroundColor: "#43A047" }]}
            >
              <Text style={styles.infoIcon}>
                <MaterialCommunityIcons name="weight-kilogram" size={18} />
              </Text>
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>Weight</Text>
              <Text style={styles.infoText}>{profileInfo?.weight} kg</Text>
            </View>
          </View>
        )}
      </View>
      <View style={styles.footer}>
        <Pressable
          style={[styles.footerItem, { backgroundColor: "#FC5185" }]}
          onPress={() => logout()}
        >
          <Text style={[styles.footerText, { color: "#fff" }]}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#38668E",
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  userInfo: {
    alignItems: "center",
  },
  username: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#fff",
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: "#fff",
  },
  body: {
    padding: 24,
  },
  infoSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    padding: 16,
  },
  infoIconContainer: {
    backgroundColor: "#FC5185",
    padding: 8,
    borderRadius: 8,
    marginRight: 16,
  },
  infoIcon: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  infoTextContainer: {},
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#364F6B",
  },
  infoText: {
    fontSize: 16,
    color: "#364F6B",
  },
  footer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  footerItem: {
    backgroundColor: "#FC5185",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  footerText: {
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "center",
  },
});
