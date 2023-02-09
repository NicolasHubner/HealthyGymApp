import TitlePattern from '@/components/atoms/TitlePattern';
import { ContainerSubtitle, ContainerTopics, ScrollViewTopics } from './style';
import { FontAwesome5 } from '@expo/vector-icons';
import { DividerComponent } from '@/components/atoms/Divider';
import { TopicsApps } from '@/helpers/constants/topics';
import { CardNavigationApp } from '@/components/molecules/CardNavigationApp';

export default function Topics() {
    return (
        <ContainerTopics>
            <ContainerSubtitle>
                <TitlePattern size={20}>Tópicos para voces</TitlePattern>
                <FontAwesome5 name="ellipsis-h" size={24} color="#D6D9E0" />
            </ContainerSubtitle>
            <ScrollViewTopics>
                {TopicsApps.map(item => (
                    <CardNavigationApp
                        key={item.id}
                        title={item.title}
                        iconName={item.icon}
                        size={item.size}
                        typeIcon={item.typeIcon}
                        route={item.screen}
                    />
                ))}
            </ScrollViewTopics>
            <DividerComponent />
            <ContainerSubtitle marginTop={20}>
                <TitlePattern size={20}>Inspire-se</TitlePattern>
                <FontAwesome5 name="ellipsis-h" size={24} color="#D6D9E0" />
            </ContainerSubtitle>
        </ContainerTopics>
    );
}
