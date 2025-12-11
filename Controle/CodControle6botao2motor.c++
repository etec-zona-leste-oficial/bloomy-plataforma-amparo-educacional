#include <BleKeyboard.h>

// Define os pinos dos componentes
const int ledPin = 2;
const int buttonPin1 = 27;  // W (UP)
const int buttonPin2 = 26;  // S (DOWN)
const int buttonPin3 = 25;  // A (LEFT)
const int buttonPin4 = 32;  // D (RIGHT)
const int buttonPin5 = 18;  // E 
const int buttonPin6 = 19;  // Q 
const int featureOutputPin = 4; // Motor de vibração

// Inicializa BLE Keyboard
BleKeyboard bleKeyboard("Controle Bloomy", "Bloomy", 100);

// Estado anterior dos botões
int lastButtonState1 = HIGH;
int lastButtonState2 = HIGH;
int lastButtonState3 = HIGH;
int lastButtonState4 = HIGH;
int lastButtonState5 = HIGH;
int lastButtonState6 = HIGH;

// Tempo de pressão de cada botão
unsigned long buttonPressStartTime1 = 0;
unsigned long buttonPressStartTime2 = 0;
unsigned long buttonPressStartTime3 = 0;
unsigned long buttonPressStartTime4 = 0;
unsigned long buttonPressStartTime5 = 0;
unsigned long buttonPressStartTime6 = 0;

const unsigned long ALL_BUTTONS_LONG_PRESS_DURATION = 10000; // 10 segundos

// Variáveis da vibração
bool featureActive = false;
bool longPressAllButtonsDetected = false;

// Pulsos rápidos ao ativar feature
bool isBlinkingFeature = false;
int featureBlinkCount = 0;
const int TOTAL_FEATURE_BLINKS = 5;
const unsigned long FEATURE_BLINK_INTERVAL = 100;
unsigned long lastFeatureBlinkTime = 0;

// Pulso curto ao apertar botão
bool triggerFeatureOutputPulse = false;
unsigned long featureOutputPulseStartTime = 0;
const unsigned long FEATURE_OUTPUT_PULSE_DURATION = 150;

// -----------------------------------------------------------------------

void setup() {
  Serial.begin(115200);

  pinMode(ledPin, OUTPUT);
  pinMode(featureOutputPin, OUTPUT);
  digitalWrite(featureOutputPin, LOW);

  pinMode(buttonPin1, INPUT_PULLUP);
  pinMode(buttonPin2, INPUT_PULLUP);
  pinMode(buttonPin3, INPUT_PULLUP);
  pinMode(buttonPin4, INPUT_PULLUP);
  pinMode(buttonPin5, INPUT_PULLUP);
  pinMode(buttonPin6, INPUT_PULLUP);

  Serial.println("Starting BLE Keyboard...");
  bleKeyboard.begin();
}

// -----------------------------------------------------------------------

void handleButton(int buttonPin, int* lastButtonState, unsigned long* buttonPressStartTime, char key, const char* buttonName) {
  unsigned long currentTime = millis();
  int currentButtonState = digitalRead(buttonPin);

  if (currentButtonState != *lastButtonState) {

    if (currentButtonState == LOW) {
      Serial.print(buttonName);
      Serial.println(" Pressionado");

      bleKeyboard.press(key);
      *buttonPressStartTime = currentTime;

      if (featureActive) {
        digitalWrite(ledPin, HIGH);
        triggerFeatureOutputPulse = true;
      }

    } else {
      Serial.print(buttonName);
      Serial.println(" Solto");

      bleKeyboard.release(key);
      *buttonPressStartTime = 0;
      digitalWrite(ledPin, LOW);
    }

    delay(20);
  }

  *lastButtonState = currentButtonState;
}

// -----------------------------------------------------------------------

void manageActivationBlink() {
  if (!isBlinkingFeature) return;

  unsigned long currentTime = millis();

  if (currentTime - lastFeatureBlinkTime >= FEATURE_BLINK_INTERVAL) {

    digitalWrite(featureOutputPin, digitalRead(featureOutputPin) ^ 1);

    if (digitalRead(featureOutputPin) == HIGH) {
      featureBlinkCount++;
    }

    lastFeatureBlinkTime = currentTime;

    if (featureBlinkCount >= TOTAL_FEATURE_BLINKS) {
      digitalWrite(featureOutputPin, LOW);
      isBlinkingFeature = false;
      featureBlinkCount = 0;
      Serial.println("Pulsos de ativação completados.");
    }
  }
}

// -----------------------------------------------------------------------

void manageFeatureOutputPulse() {
  unsigned long currentTime = millis();

  if (triggerFeatureOutputPulse && digitalRead(featureOutputPin) == LOW) {
    digitalWrite(featureOutputPin, HIGH);
    featureOutputPulseStartTime = currentTime;
    triggerFeatureOutputPulse = false;

    Serial.println("Vibrando (toque ao apertar)");
    return;
  }

  if (digitalRead(featureOutputPin) == HIGH &&
      (currentTime - featureOutputPulseStartTime >= FEATURE_OUTPUT_PULSE_DURATION)) {

    digitalWrite(featureOutputPin, LOW);
    featureOutputPulseStartTime = 0;

    Serial.println("Parando vibração.");
  }
}

// -----------------------------------------------------------------------

void loop() {
  manageActivationBlink();
  manageFeatureOutputPulse();

  if (bleKeyboard.isConnected()) {

    // ---- MAPEAMENTO FINAL ----
    handleButton(buttonPin1, &lastButtonState1, &buttonPressStartTime1, 'w', "W");
    handleButton(buttonPin2, &lastButtonState2, &buttonPressStartTime2, 's', "S");
    handleButton(buttonPin3, &lastButtonState3, &buttonPressStartTime3, 'a', "A");
    handleButton(buttonPin4, &lastButtonState4, &buttonPressStartTime4, 'd', "D");
    handleButton(buttonPin5, &lastButtonState5, &buttonPressStartTime5, 'e', "E");
    handleButton(buttonPin6, &lastButtonState6, &buttonPressStartTime6, 'q', "Q");

    // ------- DETECÇÃO DOS 10s PARA ATIVAR/DESATIVAR VIBRAÇÃO -------
    if (digitalRead(buttonPin1) == LOW && digitalRead(buttonPin2) == LOW &&
        digitalRead(buttonPin3) == LOW && digitalRead(buttonPin4) == LOW) {

      if (buttonPressStartTime1 != 0 && buttonPressStartTime2 != 0 &&
          buttonPressStartTime3 != 0 && buttonPressStartTime4 != 0) {

        unsigned long latestPressTime = max(buttonPressStartTime1, buttonPressStartTime2);
        latestPressTime = max(latestPressTime, buttonPressStartTime3);
        latestPressTime = max(latestPressTime, buttonPressStartTime4);

        if (!longPressAllButtonsDetected &&
            (millis() - latestPressTime >= ALL_BUTTONS_LONG_PRESS_DURATION)) {

          bool wasFeatureActive = featureActive;
          featureActive = !featureActive;
          longPressAllButtonsDetected = true;

          Serial.print("Vibração: ");
          Serial.println(featureActive ? "Ativada" : "Desativada");

          if (featureActive && !wasFeatureActive) {
            isBlinkingFeature = true;
            featureBlinkCount = 0;
            lastFeatureBlinkTime = millis();
            Serial.println("Iniciando pulsos de feedback da vibração");
          }
        }
      }
    } else {
      longPressAllButtonsDetected = false;
    }

  } else {
    Serial.println("Esperando conexão...");

    for (int i = 0; i < 5; i++) {
      digitalWrite(ledPin, HIGH);
      delay(100);
      digitalWrite(ledPin, LOW);
      delay(100);
    }

    delay(4000);
  }
}
