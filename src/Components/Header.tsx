import { Ionicons } from '@expo/vector-icons';
import React, { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, Animated, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Header({ navigation }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const toggleDropdown = () => {
    if (showDropdown) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setShowDropdown(false));
    } else {
      setShowDropdown(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleLogoPress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('TelaInicial');
    });
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 0],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <SafeAreaView style={styles.header}>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu-outline" style={styles.menuIcon} size={27} />
      </TouchableOpacity>

      <Pressable 
        onPress={handleLogoPress}
        style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
      >
        <Animated.View style={[styles.logoContainer, { transform: [{ scale: scaleAnim }] }]}>
          <Image 
            style={styles.logo} 
            source={require('../../assets/Logo.jpg')} 
            resizeMode="contain"
          />
        </Animated.View>
      </Pressable>

      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={toggleDropdown}>
          <Ionicons name="person-outline" style={styles.menuIcon} size={27} />
        </TouchableOpacity>
      </View>

      {showDropdown && (
        <Modal transparent={true} visible={showDropdown} onRequestClose={toggleDropdown}>
          <TouchableOpacity style={styles.dropdownOverlay} activeOpacity={1} onPress={toggleDropdown}>
            <Animated.View style={[styles.dropdownMenu, { opacity, transform: [{ translateY }] }]}>
              <TouchableOpacity 
                style={styles.dropdownItem}
                onPress={() => {
                  toggleDropdown();
                  navigation.navigate('TelaLogin');
                }}
              >
                <Ionicons name="log-in-outline" size={20} color="#e23b10" />
                <Text style={styles.dropdownText}>Login</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableOpacity>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  menuButton: {
    width: 27,
  },
  menuIcon: {
    color: '#e23b10',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 70,
    width: 140,
  },
  rightIcons: {
    width: 27,
    alignItems: 'flex-end',
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: 16,
  },
  dropdownMenu: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 8,
    width: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownText: {
    color: '#333333',
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },
});
