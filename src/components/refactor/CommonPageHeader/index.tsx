import { HeaderGoBackButton } from '@/components/molecules/HeaderGoBackButton';

import { PageHeader, PageHeaderTitle } from './styles';

interface CommonPageHeaderProps {
    title?: string;
    onPress?: () => void;
    float?: boolean;
}

export function CommonPageHeader({ onPress, float = true, title }: CommonPageHeaderProps) {
    return (
        <PageHeader
            style={{
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 8,
                ...(float
                    ? {
                          position: 'absolute',
                          top: 0,
                          left: 0,
                      }
                    : {}),
            }}>
            <HeaderGoBackButton canGoBack onPress={() => (onPress ? onPress() : null)} />
            {title && <PageHeaderTitle>{title}</PageHeaderTitle>}
        </PageHeader>
    );
}
