import { LinhaEspacamento, NavigableButton, NavigableSwitch, NavigationProvider, ScreenContainer } from "@/assets/components";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useNotificationsSettings } from "../src/notifications/NotificationsSettingsContext";

export default function SettingsPage() {
    const { allEnabled, pomodoroEnabled, usageEnabled, setAllEnabled, setPomodoroEnabled, setUsageEnabled } = useNotificationsSettings();
    
    // Layout da navegação:
    // Linha 0: 1 switch (Ativar notificações)
    // Linha 1: 1 switch (Lembretes de uso)
    // Linha 2: 1 switch (Modo pomodoro)
    // Linha 3: 1 botão (Guias)
    // Linha 4: 1 botão (Informações)
    const navigationLayout = [
        [1],  // Switch 1
        [1],  // Switch 2
        [1],  // Switch 3
        [1],  // Botão Guias
        [1],  // Botão Informações
    ];

    return (
        <NavigationProvider initialLayout={navigationLayout} enableBackNavigation={true}>
            <ScreenContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.maincontainer}>
                    <Text style={styles.title}>Configurações</Text>
                    <View style={styles.checkboxcontainer}>
                        <NavigableSwitch
                            row={0}
                            col={0}
                            label="Ativar notificações"
                            value={allEnabled}
                            onValueChange={setAllEnabled}
                            labelStyle={styles.checkboxlabel}
                        />

                        <LinhaEspacamento />

                        <NavigableSwitch
                            row={1}
                            col={0}
                            label="Ativar Lembretes de uso"
                            value={usageEnabled}
                            onValueChange={setUsageEnabled}
                            disabled={!allEnabled}
                            labelStyle={styles.checkboxlabel}
                        />

                        <LinhaEspacamento />

                        <NavigableSwitch
                            row={2}
                            col={0}
                            label="Ativar modo pomodoro"
                            value={pomodoroEnabled}
                            onValueChange={setPomodoroEnabled}
                            disabled={!allEnabled}
                            labelStyle={styles.checkboxlabel}
                        />
                    </View>
                    
                    <View style={styles.buttoncontainer}>
                        <NavigableButton
                            row={3}
                            col={0}
                            title="Guias"
                            iconName="book"
                            iconSize={22}
                            onSelect={() => router.push('/tutorialpage')}
                            style={styles.button}
                        />
                        <NavigableButton
                            row={4}
                            col={0}
                            title="Informações"
                            iconName="information-circle"
                            iconSize={22}
                            onSelect={() => router.push('/infopage')}
                            style={styles.button}
                        />
                    </View>
                </View>
            </ScreenContainer>
        </NavigationProvider>
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
    buttoncontainer: {
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
    },
    button: {
        width: '100%',
        paddingVertical: 18,
        paddingHorizontal: 30,
        minHeight: 60,
    },
});
