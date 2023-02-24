import { Graphics } from '../../Metrics/CardsMetrics/style';
import * as ProgressCircle from 'react-native-progress';
import { SubTitleGraphic, TextGraphic, ViewTextGraphic } from './style';

export default function CircleGraphic() {
    return (
        <Graphics>
            <ProgressCircle.Circle
                showsText={false}
                thickness={12}
                borderWidth={0}
                animated={false}
                unfilledColor={'#F4F6FA'}
                color={'#1F87FE'}
                strokeCap="round"
                progress={0.32}
                size={210}
                style={{ justifyContent: 'center', alignItems: 'center' }}>
                <ProgressCircle.Circle
                    showsText={false}
                    thickness={12}
                    borderWidth={0}
                    animated={false}
                    unfilledColor={'#F4F6FA'}
                    color={'#AF8EFF'}
                    strokeCap="round"
                    progress={0.4}
                    size={180}
                    style={{
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <ProgressCircle.Circle
                        showsText={false}
                        thickness={12}
                        borderWidth={0}
                        animated={false}
                        unfilledColor={'#F4F6FA'}
                        color={'#90D692'}
                        strokeCap="round"
                        progress={0.28}
                        size={150}
                        style={{
                            position: 'absolute',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <ViewTextGraphic>
                            <TextGraphic>40%</TextGraphic>
                            <SubTitleGraphic>das metas diárias</SubTitleGraphic>
                        </ViewTextGraphic>
                    </ProgressCircle.Circle>
                </ProgressCircle.Circle>
            </ProgressCircle.Circle>
        </Graphics>
    );
}
