import { useCallback, useState } from 'react';
import { View } from 'react-native';

import { Button } from '@/components/atoms/Button';

import { generateRandomUuid } from '@/helpers/functions/generateUuid';

import { Notion } from '@/types/coach/Notions';
import { StudentDetails } from '@/types/coach/Students';

import { CaracterCounter, Container, TextArea, Title } from './styles';

const caractersLimit = 400;

interface NotionsProps {
    studentInfo?: StudentDetails;
    notions?: Notion[];
    createNotion?: (notion: Notion) => void;
}

export function Notions({ studentInfo, createNotion }: NotionsProps) {
    const [notion, setNotion] = useState('');

    const createNewNotion = useCallback(
        (notionParam: string) => {
            if (!studentInfo || !studentInfo.id || notionParam.length <= 0) return;

            const newNotion: Notion = {
                id: generateRandomUuid(),
                userId: studentInfo?.id,
                notion: notionParam,
                createdAt: new Date(),
            };

            return newNotion;
        },
        [studentInfo]
    );

    const saveNotions = useCallback(() => {
        if (!studentInfo || !studentInfo.id || notion.length <= 0 || !createNotion) return;

        const newNotion = createNewNotion(notion);

        createNotion?.(newNotion!);
    }, [notion, studentInfo, createNewNotion, createNotion]);

    return (
        <Container>
            <Title>Anotações</Title>

            <TextArea
                multiline
                maxLength={caractersLimit}
                onChangeText={e => setNotion(e)}
                value={notion}
                textAlign="left"
            />

            <CaracterCounter>
                {notion.length}/{caractersLimit}
            </CaracterCounter>

            <View style={{ marginTop: 48 }}>
                <Button fullWidth label="Salvar" onPress={saveNotions} />
            </View>
        </Container>
    );
}
