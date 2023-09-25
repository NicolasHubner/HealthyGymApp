import { CardNavigationApp } from '@/components/molecules/CardNavigationApp';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';
import { useNavigation } from '@react-navigation/native';
import { Divider, Text, View } from 'native-base';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

interface INotification {
    id: number;
    name: string;
    description: string;
    iconName?: string;
    typeIcon?: string;
    route?: string;
    bgColor?: string;
    source?: any;
}

export default function TimeNotification() {
    const navigator = useNavigation() as INavigation;
    const [notification, _] = useState<INotification[]>([
        {
            id: 1,
            name: 'Alimentação',
            description: 'Horários de alimentação',
            iconName: 'food-apple',
            typeIcon: 'MaterialCommunityIcons',
            // route: RouteNames.TimeNotification,
            bgColor: '#b05353',
        },
        {
            id: 2,
            name: 'Sono',
            description: 'Horários de dormir',
            iconName: 'sleep',
            typeIcon: 'MaterialCommunityIcons',
            route: RouteNames.logged.sleep,
            bgColor: '#7fdddd',
        },
        {
            id: 3,
            name: 'Treino(s)',
            description: 'Horários de treino',
            iconName: 'dumbbell',
            typeIcon: 'MaterialCommunityIcons',
            route: RouteNames.logged.trainDays,
            bgColor: '#e9e463',
        },
    ]);

    return (
        <ScrollablePageWrapper edges={['left', 'right']} padding={0} styles={{ paddingTop: 0 }}>
            <Text
                fontFamily={'Rubik_500Medium'}
                fontSize={22}
                color={'#000000'}
                textAlign={'left'}
                w={'100%'}
                mt={0}
                // bg={'#FFFFFF'}
                pl={4}>
                Horários
            </Text>

            <Divider mt={2} w={'90%'} />

            <View
                w={'100%'}
                flexDirection={'column'}
                mb={32}
                mt={4}
                alignItems={'center'}
                justifyContent={'center'}>
                {notification.map((item, index) => (
                    <TouchableOpacity
                        onPress={() => {
                            if (item.route) {
                                navigator.navigate(item.route);
                            }
                        }}>
                        <View key={index} w={'90%'} flexDirection={'row'} mt={4}>
                            <CardNavigationApp
                                key={index}
                                iconName={item.iconName}
                                typeIcon={item.typeIcon}
                                bgColor={item.bgColor}
                                // route={item.route}
                                isWidth33={true}
                                source={item.source}
                                size={60}
                            />
                            <View
                                w={'80%'}
                                ml={4}
                                justifyContent={'center'}
                                flexDirection={'column'}>
                                <Text
                                    fontFamily={'Rubik_500Medium'}
                                    fontSize={16}
                                    color={'#000000'}
                                    textAlign={'left'}
                                    w={'100%'}
                                    mt={0}>
                                    {item.name}
                                </Text>
                                <Text
                                    fontFamily={'Rubik_400Regular'}
                                    fontSize={14}
                                    color={'#000000'}
                                    textAlign={'left'}
                                    w={'100%'}
                                    mt={0}>
                                    {item.description}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollablePageWrapper>
    );
}
