import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { COLORS, FONTS } from './src/config/theme';
import { PERMISSIONS } from './src/config/permissions';

// Auth Screens
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterShopScreen from './src/screens/auth/RegisterShopScreen';
import JoinShopScreen from './src/screens/auth/JoinShopScreen';

// Main Screens
import DashboardScreen from './src/screens/dashboard/DashboardScreen';
import InventoryScreen from './src/screens/products/InventoryScreen';
import AddProductScreen from './src/screens/products/AddProductScreen';
import ProductDetailScreen from './src/screens/products/ProductDetailScreen';
import SalesScreen from './src/screens/sales/SalesScreen';
import NewSaleScreen from './src/screens/sales/NewSaleScreen';
import SaleDetailScreen from './src/screens/sales/SaleDetailScreen';
import CustomersScreen from './src/screens/customers/CustomersScreen';
import CustomerDetailScreen from './src/screens/customers/CustomerDetailScreen';
import StaffScreen from './src/screens/staff/StaffScreen';
import StaffDetailScreen from './src/screens/staff/StaffDetailScreen';
import ReportsScreen from './src/screens/reports/ReportsScreen';
import ExpenseScreen from './src/screens/expenses/ExpenseScreen';
import PurchaseScreen from './src/screens/purchases/PurchaseScreen';
import SettingsScreen from './src/screens/settings/SettingsScreen';
import ActivityLogScreen from './src/screens/activity/ActivityLogScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const screenOpts = { headerShown: false };

// ===== Auth Navigator =====
const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={screenOpts}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="RegisterShop" component={RegisterShopScreen} />
    <AuthStack.Screen name="JoinShop" component={JoinShopScreen} />
  </AuthStack.Navigator>
);

// ===== Stack Navigators =====
const DashboardStackNav = () => (
  <Stack.Navigator screenOptions={screenOpts}>
    <Stack.Screen name="DashboardMain" component={DashboardScreen} />
    <Stack.Screen name="AddProduct" component={AddProductScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    <Stack.Screen name="NewSale" component={NewSaleScreen} />
    <Stack.Screen name="SaleDetail" component={SaleDetailScreen} />
    <Stack.Screen name="Purchase" component={PurchaseScreen} />
    <Stack.Screen name="Expenses" component={ExpenseScreen} />
    <Stack.Screen name="Reports" component={ReportsScreen} />
    <Stack.Screen name="Customers" component={CustomersScreen} />
    <Stack.Screen name="CustomerDetail" component={CustomerDetailScreen} />
    <Stack.Screen name="Staff" component={StaffScreen} />
    <Stack.Screen name="StaffDetail" component={StaffDetailScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="ActivityLog" component={ActivityLogScreen} />
  </Stack.Navigator>
);

const InventoryStackNav = () => (
  <Stack.Navigator screenOptions={screenOpts}>
    <Stack.Screen name="InventoryMain" component={InventoryScreen} />
    <Stack.Screen name="AddProduct" component={AddProductScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    <Stack.Screen name="NewSale" component={NewSaleScreen} />
  </Stack.Navigator>
);

const SalesStackNav = () => (
  <Stack.Navigator screenOptions={screenOpts}>
    <Stack.Screen name="SalesMain" component={SalesScreen} />
    <Stack.Screen name="NewSale" component={NewSaleScreen} />
    <Stack.Screen name="SaleDetail" component={SaleDetailScreen} />
  </Stack.Navigator>
);

const CustomerStackNav = () => (
  <Stack.Navigator screenOptions={screenOpts}>
    <Stack.Screen name="CustomersMain" component={CustomersScreen} />
    <Stack.Screen name="CustomerDetail" component={CustomerDetailScreen} />
  </Stack.Navigator>
);

// ===== আরো মেনু (রোল ভিত্তিক) =====
const MoreMenuScreen = ({ navigation }) => {
  const { can, userData, signOut, shopData } = useAuth();

  const menuItems = [
    can(PERMISSIONS.VIEW_REPORTS) && { icon: '📊', label: 'রিপোর্ট ও লাভ-ক্ষতি', screen: 'Reports', color: COLORS.info },
    can(PERMISSIONS.VIEW_EXPENSES) && { icon: '💸', label: 'দোকানের খরচ', screen: 'Expenses', color: COLORS.secondary },
    can(PERMISSIONS.MAKE_PURCHASE) && { icon: '📥', label: 'পাইকারি মাল কেনা', screen: 'Purchase', color: COLORS.warning },
    can(PERMISSIONS.VIEW_STAFF) && { icon: '👥', label: 'কর্মচারী ব্যবস্থাপনা', screen: 'Staff', color: '#8E44AD' },
    can(PERMISSIONS.VIEW_ACTIVITY_LOG) && { icon: '📋', label: 'কার্যকলাপ ও অডিট লগ', screen: 'ActivityLog', color: COLORS.darkGray },
    can(PERMISSIONS.MANAGE_SETTINGS) && { icon: '⚙️', label: 'দোকানের সেটিংস', screen: 'Settings', color: COLORS.gray },
  ].filter(Boolean);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <View style={{
        backgroundColor: COLORS.dark, paddingTop: 50, paddingBottom: 24,
        paddingHorizontal: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <View style={{
            width: 56, height: 56, borderRadius: 28, backgroundColor: COLORS.primary + '30',
            justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: COLORS.primary,
          }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.primary }}>
              {(userData?.name || '?').charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ ...FONTS.h4, color: COLORS.white }}>{userData?.name}</Text>
            <Text style={{ ...FONTS.small, color: COLORS.lightGray }}>
              {userData?.role === 'owner' ? '👑 মালিক' :
                userData?.role === 'manager' ? '👔 ম্যানেজার' : '👷 কর্মচারী'}
            </Text>
            <Text style={{ ...FONTS.tiny, color: COLORS.gray }}>{shopData?.name || 'বঙ্গ বাজার দর্শনা'}</Text>
          </View>
        </View>
      </View>

      <View style={{ padding: 16 }}>
        {menuItems.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={{
              backgroundColor: COLORS.white, borderRadius: 14, padding: 16,
              marginBottom: 10, flexDirection: 'row', alignItems: 'center',
              elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08, shadowRadius: 4,
            }}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View style={{
              width: 48, height: 48, borderRadius: 14,
              backgroundColor: item.color + '20', justifyContent: 'center',
              alignItems: 'center', marginRight: 14,
            }}>
              <Text style={{ fontSize: 22 }}>{item.icon}</Text>
            </View>
            <Text style={{ ...FONTS.bodyBold, color: COLORS.dark, flex: 1 }}>
              {item.label}
            </Text>
            <Text style={{ fontSize: 20, color: COLORS.lightGray }}>›</Text>
          </TouchableOpacity>
        ))}

        {/* Logout */}
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.dangerLight, borderRadius: 14, padding: 16,
            marginTop: 10, alignItems: 'center',
          }}
          onPress={() => {
            Alert.alert('🚪 লগআউট', 'আপনি কি নিশ্চিত লগআউট করতে চান?', [
              { text: 'না', style: 'cancel' },
              { text: 'হ্যাঁ', onPress: signOut },
            ]);
          }}
        >
          <Text style={{ ...FONTS.bodyBold, color: COLORS.danger }}>🚪 লগআউট</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MoreStackNav = () => (
  <Stack.Navigator screenOptions={screenOpts}>
    <Stack.Screen name="MoreMain" component={MoreMenuScreen} />
    <Stack.Screen name="Reports" component={ReportsScreen} />
    <Stack.Screen name="Expenses" component={ExpenseScreen} />
    <Stack.Screen name="Purchase" component={PurchaseScreen} />
    <Stack.Screen name="Staff" component={StaffScreen} />
    <Stack.Screen name="StaffDetail" component={StaffDetailScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="ActivityLog" component={ActivityLogScreen} />
  </Stack.Navigator>
);

// Tab Icon
const TabIcon = ({ icon, label, focused }) => (
  <View style={{ alignItems: 'center', paddingTop: 8 }}>
    <Text style={{ fontSize: 22 }}>{icon}</Text>
    <Text style={{
      fontSize: 10, marginTop: 3, fontWeight: focused ? 'bold' : '500',
      color: focused ? COLORS.primary : COLORS.gray,
    }}>{label}</Text>
  </View>
);

// ===== Main Tab Navigator =====
const MainNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        height: 68, backgroundColor: COLORS.white, borderTopWidth: 0,
        elevation: 12, borderTopLeftRadius: 20, borderTopRightRadius: 20,
        position: 'absolute',
      },
      tabBarShowLabel: false,
    }}
  >
    <Tab.Screen name="Dashboard" component={DashboardStackNav}
      options={{ tabBarIcon: ({ focused }) => <TabIcon icon="🏠" label="হোম" focused={focused} /> }}
    />
    <Tab.Screen name="Inventory" component={InventoryStackNav}
      options={{ tabBarIcon: ({ focused }) => <TabIcon icon="📦" label="স্টক" focused={focused} /> }}
    />
    <Tab.Screen name="Sales" component={SalesStackNav}
      options={{ tabBarIcon: ({ focused }) => <TabIcon icon="💰" label="বিক্রি" focused={focused} /> }}
    />
    <Tab.Screen name="Customers" component={CustomerStackNav}
      options={{ tabBarIcon: ({ focused }) => <TabIcon icon="👥" label="কাস্টমার" focused={focused} /> }}
    />
    <Tab.Screen name="More" component={MoreStackNav}
      options={{ tabBarIcon: ({ focused }) => <TabIcon icon="📋" label="আরো" focused={focused} /> }}
    />
  </Tab.Navigator>
);

// ===== Root Navigator =====
const RootNavigator = () => {
  const { user, userData, loading, signOut } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ fontSize: 48, marginBottom: 16 }}>🏪</Text>
        <Text style={{ ...FONTS.h3, color: COLORS.white, marginBottom: 12 }}>
          বঙ্গ বাজার দর্শনা
        </Text>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ ...FONTS.small, color: COLORS.lightGray, marginTop: 16 }}>
          লোড হচ্ছে...
        </Text>
      </View>
    );
  }

  // Pending approval screen
  if (user && userData && userData.isApproved === false) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ fontSize: 48, marginBottom: 16 }}>⏳</Text>
        <Text style={{ ...FONTS.h3, color: COLORS.white, marginBottom: 12, textAlign: 'center' }}>
          অনুমোদনের অপেক্ষায়
        </Text>
        <Text style={{ ...FONTS.body, color: COLORS.lightGray, textAlign: 'center', paddingHorizontal: 40, lineHeight: 24 }}>
          আপনার অনুরোধটি দোকানের মালিকের অনুমোদনের অপেক্ষায় রয়েছে।
          মালিক অনুমোদন দিলে আপনি সরাসরি অ্যাপটি ব্যবহার করতে পারবেন।
        </Text>
        <TouchableOpacity
          style={{ backgroundColor: COLORS.primary, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 14, marginTop: 24 }}
          onPress={signOut}
        >
          <Text style={{ ...FONTS.bodyBold, color: COLORS.white }}>🚪 লগআউট</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user && userData ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

// ===== APP =====
export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: COLORS.dark,
  },
});
