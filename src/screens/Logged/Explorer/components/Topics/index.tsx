import TitlePattern from '@/components/atoms/TitlePattern';
import {
    CardImageInspiration,
    CardTextInspiration,
    CardTextInspirationSmall,
    ContainerCardInspiration,
    ContainerSubtitle,
    ContainerTopics,
    InspirationsCards,
    ScrollViewTopics,
    ViewCardKey,
    ViewText,
} from './style';
import { FontAwesome5 } from '@expo/vector-icons';
import { DividerComponent } from '@/components/atoms/Divider';
import { TopicsApps } from '@/helpers/constants/topics';
import { CardNavigationApp } from '@/components/molecules/CardNavigationApp';
import { useCallback } from 'react';
import { InspirationsApps } from '@/helpers/constants/InspirationsApps';
interface RenderInspirationsItemProps {
    image: any;
    title: string;
    subtitle: string;
    id: number;
}

const REenderInspirationsItem = ({ image, title, subtitle }: RenderInspirationsItemProps) => (
    <ContainerCardInspiration>
        <CardImageInspiration source={image} />
        <ViewText>
            <CardTextInspiration>{title}Cachorro</CardTextInspiration>
            <CardTextInspirationSmall>{subtitle}</CardTextInspirationSmall>
        </ViewText>
    </ContainerCardInspiration>
);
export default function Topics() {
    const MemoRenderItem = useCallback(
        ({ id, title, subtitle, image }: RenderInspirationsItemProps) => (
            <REenderInspirationsItem id={id} image={image} title={title} subtitle={subtitle} />
        ),
        []
    );
    const RenderSeparator = useCallback(() => <DividerComponent />, []);
    return (
        <ContainerTopics>
            <ContainerSubtitle>
                <TitlePattern size={20}>Tópicos para voces</TitlePattern>
                <FontAwesome5 name="ellipsis-h" size={24} color="#D6D9E0" />
            </ContainerSubtitle>
            <ScrollViewTopics>
                {TopicsApps.map(item => (
                    <CardNavigationApp
                        marginHorizontal={8}
                        width33={false}
                        key={item.id}
                        title={item.title}
                        iconName={item.icon}
                        size={item.size}
                        bgColor={item.color}
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
            <InspirationsCards>
                {/* <FlatList
                    nestedScrollEnabled
                    // style={{ flex: 1 }}
                    // showsVerticalScrollIndicator={false}
                    data={InspirationsApps}
                    renderItem={({ item }) => memoRenderItem(item)}
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={renderSeparator}
                /> */}
                {InspirationsApps.map(item => (
                    <ViewCardKey key={item.id}>
                        <MemoRenderItem
                            id={item.id}
                            image={item.image}
                            title={item.title}
                            subtitle={item.subtitle}
                        />
                        <RenderSeparator />
                    </ViewCardKey>
                ))}
            </InspirationsCards>
        </ContainerTopics>
    );
}
