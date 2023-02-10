import { baseBoldText } from '@/styles/global';
import styled from 'styled-components/native';

export const ContainerColection = styled.View`
    /* flex: 1; */
    background-color: ${({ theme }) => theme.colors.white};
    width: 100%;
    /* height: 200px; */
`;
export const ContainerSubtitle = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    margin-top: 16px;
    margin-horizontal: 28px;
`;
export const ColectionsCardsContainer = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: {
        paddingHorizontal: 16,
    },
})`
    flex-direction: row;

    /* margin-horizontal: 28px; */
    padding-vertical: 24px;
    margin-bottom: 86px;
`;
export const ColectionCard = styled.TouchableOpacity`
    width: 185px;
    height: 242px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 20px;
    background-image: ;
    margin-right: 16px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    /* padding: 16px; */
    shadow-color: ${({ theme }) => theme.colors.brown[500]};
    shadow-radius: 7px;
    shadow-opacity: 0.2;
    elevation: 7;
`;
export const TitleCard = styled.Text`
    ${baseBoldText}
    font-size: 12px;
    line-height: 14px;
    color: ${({ theme }) => theme.colors.black};
    /* opactiy: 70%; */
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-top: 40px;
`;
export const SubtitleCard = styled.Text`
    ${baseBoldText}
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.22px;
    color: ${({ theme }) => theme.colors.black};
    margin-top: 16px;
    padding-horizontal: 16px;
    text-align: center;
`;
export const PressableArticles = styled.Pressable`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 48px;
    background-color: ${({ theme }) => theme.colors.white};
    width: 87px;
    height: 36px;
    border-radius: 12px;
`;
export const TextArticles = styled.Text`
    ${baseBoldText}
    font-size: 12px;
    line-height: 14px;
    color: ${({ theme }) => theme.colors.green[500]};
    letter-spacing: 0.22px;
`;
export const BgCard = styled.Image`
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    /* justify-content: flex-start; */
    border-radius: 20px;
    opacity: 0.6;
    /* right: 10px; */
    /* resize: both; */
    background-position: right;
`;
