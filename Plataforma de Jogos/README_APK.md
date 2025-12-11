- Java JDK 11 ou 17 (compatível com Gradle 8+). Recomendo JDK 17.
- Android SDK com plataformas e build-tools compatíveis.
- Variáveis de ambiente: ANDROID_HOME (ou ANDROID_SDK_ROOT) apontando para o SDK, e as ferramentas do SDK no PATH (platform-tools, tools/bin).
- Node.js e npm/yarn (para instalar dependências antes do build).
- Windows PowerShell (instruções abaixo usam PowerShell).

Passo 0 — Instalar dependências do projeto

Abra PowerShell na raiz do projeto e rode:

npm install
# ou
# yarn install

Passo 1 — Gerar um keystore (se você não tiver um)

Execute no PowerShell (altere alias, senha e caminhos conforme desejado):

$keyPass = Read-Host -Prompt "Senha do key (recomendado)" -AsSecureString; 
$keyPassPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($keyPass)); 

ejava -jar (Join-Path $env:JAVA_HOME 'bin\keytool.exe') -genkeypair -v -keystore android\release-keystore.jks -storetype JKS -alias mykey -keyalg RSA -keysize 2048 -validity 10000 -storepass $keyPassPlain -keypass $keyPassPlain

Passo 2 — Criar `key.properties`

Crie o arquivo `android\key.properties` com o conteúdo:

storePassword=<sua_store_password>
keyPassword=<sua_key_password>
keyAlias=mykey
storeFile=release-keystore.jks

Se você tiver colocado o keystore em outro local, atualize `storeFile` para o caminho relativo a `android/`.

Passo 3 — Configurar signingConfig no Gradle

O projeto já tenta carregar `android/key.properties`. Se não existir, o build de release cairá para usar o `debug.keystore` (isso não é recomendado para distribuição). Certifique-se que `android/app/build.gradle` contém a leitura de `key.properties` (já incluída).

Passo 4 — Limpar e construir o APK de release

No PowerShell, execute:

cd android; 
.\gradlew.bat clean; 
.\gradlew.bat assembleRelease

O APK gerado ficará em:

android\app\build\outputs\apk\release\app-release.apk
