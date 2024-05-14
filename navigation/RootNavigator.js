// RootNavigator.js
import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppDrawer from './AppDrawer';
import { View, ActivityIndicator } from 'react-native';
import { UserContext } from '../contexts/UserContext';



function RootNavigator() {
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? <AppDrawer /> : <AuthStack />}
        </NavigationContainer>
    );
}

export default RootNavigator;