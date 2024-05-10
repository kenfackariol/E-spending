// RootNavigator.js
import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppDrawer from './AppDrawer';
import { View, ActivityIndicator } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { dropTables, initDB, resetDB } from '../utils/database';
import { initCategories } from '../utils/categories_seed';

function RootNavigator() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);

    const initializeDB = async () => {
        try {
            // reset DB
            //   let response = await dropTables();
            //   console.log(response);

            // init DB
            let res = await initDB();
            console.log(res);

            //init categories
            // let int = await initCategories();
            // //console.log(int);
            // let cats = await getCategories();

        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // db pre-operations
        initializeDB();
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