import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { DocumentDetails } from './DocumentDetails';
import { DocumentsScreen } from './DocumentsScreen';


// Documents have multiple screens - create a stack
const DocumentStack = createStackNavigator();
export function DocumentStackScreen() {
    return (
        <DocumentStack.Navigator>
            <DocumentStack.Screen name="Documents" component={DocumentsScreen} />
            <DocumentStack.Screen name="DocumentDetails" component={DocumentDetails} />
        </DocumentStack.Navigator>
    );
}