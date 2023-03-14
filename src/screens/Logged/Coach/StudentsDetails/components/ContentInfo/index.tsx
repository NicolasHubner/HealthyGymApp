import { detailsList } from './detailsList';

import { ContentBody, IconWrapper, InfoRow, InfoTitle, InfoValue } from './styles';

export function ContentInfo() {
    return (
        <ContentBody>
            {detailsList.map(({ Icon, ...detail }) => (
                <InfoRow key={detail.id}>
                    <IconWrapper>
                        <Icon />
                    </IconWrapper>
                    <InfoTitle>{detail.title}</InfoTitle>
                    <InfoValue>{detail.value}</InfoValue>
                </InfoRow>
            ))}
        </ContentBody>
    );
}
