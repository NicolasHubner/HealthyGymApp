import { ParamListBase, StackNavigationState, TypedNavigator } from '@react-navigation/native';
import {
    NativeStackNavigationEventMap,
    NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { NativeStackNavigatorProps } from '@react-navigation/native-stack/lib/typescript/src/types';

export interface StackScreenProps {
    stack: TypedNavigator<
        ParamListBase,
        StackNavigationState<ParamListBase>,
        NativeStackNavigationOptions,
        NativeStackNavigationEventMap,
        ({
            id,
            initialRouteName,
            children,
            screenListeners,
            screenOptions,
            ...rest
        }: NativeStackNavigatorProps) => JSX.Element
    >;
}

export type StackScreen = {
    id: string;
    name: string;
    component: () => JSX.Element;
    options?: NativeStackNavigationOptions;
};
