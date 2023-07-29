import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

import { Button } from '@/components/atoms/Button';

import { Notion } from '@/types/coach/Notions';
import { StudentDetails } from '@/types/coach/Students';

import { CaracterCounter, Container, TextArea, Title } from './styles';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { api } from '@/services/api';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { set } from 'date-fns';

const caractersLimit = 400;

interface NotionsProps {
    studentInfo?: StudentDetails;
    notions?: Notion[];
    createNotion?: (notion: Notion) => void;
    date?: Date;
}

export function Notions({ studentInfo, createNotion, date }: NotionsProps) {
    const [notion, setNotion] = useState('');

    const { id, token } = useSelector((state: RootState) => state.user);

    // console.log('date', date);

    const createNewNotion = useCallback(
        (notionParam: string) => {
            if (!studentInfo || !studentInfo.id || notionParam.length <= 0 || !date) return;

            const newNotion: Notion = {
                coach: id?.toString() || '',
                user: studentInfo.id || '',
                datetime: new Date(date).toISOString(),
                note: notion,
            };
            // console.log('newNotion', newNotion);
            return newNotion;
        },
        [date, id, notion, studentInfo]
    );

    const saveNotions = useCallback(() => {
        if (!studentInfo || !studentInfo.id || notion.length <= 0 || !createNotion) return;

        const newNotion = createNewNotion(notion);

        createNotion?.(newNotion!);
    }, [notion, studentInfo, createNewNotion, createNotion]);

    const getNotionDay = useCallback(async () => {
        if (!studentInfo || !studentInfo.id || !date) return;

        const today = new Date(date);
        today.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        try {
            const headers = generateAuthHeaders(token!);
            const { data } = await api.get(
                `/notes-histories?filters[user][id][$eq]=${
                    studentInfo.id
                }&filters[datetime][$gte]=${today.toISOString()}&filters[datetime][$lte]=${endOfDay.toISOString()}`,
                {
                    headers,
                }
            );
            // console.log('data', data);
            setNotion(data.data[0]?.attributes.note || '');
        } catch (err: any) {
            console.error('err', err.message);
        }
    }, [date, studentInfo, token]);
    useEffect(() => {
        // console.error('ronald22o');
        getNotionDay();
    }, [getNotionDay]);

    return (
        <Container>
            <Title>Anotações</Title>

            <TextArea
                multiline
                maxLength={caractersLimit}
                onChangeText={e => setNotion(e)}
                value={notion}
                textAlign="left"
                style={{ textAlignVertical: 'top', paddingTop: 16 }}
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
