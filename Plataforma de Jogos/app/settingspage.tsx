import { LinhaEspacamento, ScreenContainer } from "@/assets/components";
import SquareSwitch from "@/assets/components/SquareSwitch";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import CustomIconButton from "../assets/components/CustomIconButton";
import { useNotificationsSettings } from "../src/notifications/NotificationsSettingsContext";

export default function SettingsPage() {
    const { allEnabled, pomodoroEnabled, usageEnabled, setAllEnabled, setPomodoroEnabled, setUsageEnabled } = useNotificationsSettings();
    return (
        <ScreenContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.maincontainer}>
                <Text style={styles.title}>Configurações</Text>
                <View style={styles.checkboxcontainer}>
                    <View style={styles.row}>
                        <Text style={styles.checkboxlabel}>Ativar notificações</Text>
                        <SquareSwitch
                            value={allEnabled}
                            onValueChange={setAllEnabled}
                        />
                    </View>

                    <LinhaEspacamento />

                    <View style={styles.row}>
                        <Text style={styles.checkboxlabel}>Ativar Lembretes de uso</Text>
                        <SquareSwitch
                            value={usageEnabled}
                            onValueChange={setUsageEnabled}
                            disabled={!allEnabled}
                        />
                    </View>

                    <LinhaEspacamento />

                    <View style={styles.row}>
                        <Text style={styles.checkboxlabel}>Ativar modo pomodoro</Text>
                        <SquareSwitch
                            value={pomodoroEnabled}
                            onValueChange={setPomodoroEnabled}
                            disabled={!allEnabled}
                        />
                    </View>

                </View>
                <View style={styles.buttoncontainer}>
                    <CustomIconButton title="Guias" iconName="book" iconColor="#fff" iconSize={22} onPress={() => router.push('/tutorialpage')} />
                    <CustomIconButton title="Informações" iconName="information-circle" iconColor="#fff" iconSize={22} onPress={() => router.push('/infopage')} />
                </View>
            </View>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 0.8,
        width: '80%',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        marginBottom: 20,
        color: '#623DB3',
        fontFamily: 'LuckiestGuy-Regular',
    },
    checkboxlabel: {
        fontSize: 20,
        marginHorizontal: 10,
        color: '#623DB3',
        fontFamily: 'Bebas-Neue',
    },
    checkboxcontainer: {
        width: '100%',
        maxWidth: 400,
        padding: 20,
        backgroundColor: "#FFE1BF",
        borderRadius: 15,
        marginBottom: 30,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttoncontainer: {
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
    },
});
