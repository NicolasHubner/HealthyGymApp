import { StatusBar } from 'expo-status-bar';
import RoutesStack from './src/routes';

export default function App() {
  return (
    <>
    <RoutesStack />
    <StatusBar style="auto" />
    </>
  );
}
