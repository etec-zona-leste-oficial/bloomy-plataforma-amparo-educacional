# Uso:
#   PowerShell:
#   .\scripts\run-android.ps1            # Usa Expo (npm run android)
#   .\scripts\run-android.ps1 -UseGradle  # Usa Gradle direto (installDebug)

[CmdletBinding()]
param(
  [switch] $UseGradle
)

Write-Host "==> Preparando ambiente Android nesta sessão (sem alterar PATH global)" -ForegroundColor Cyan

# Descobre a raiz do projeto (pasta pai de scripts/)
$projectRoot = (Resolve-Path "$PSScriptRoot\..\").Path
Set-Location $projectRoot

# Local padrão do Android SDK do usuário
$sdk = $env:ANDROID_SDK_ROOT
if (-not $sdk -or -not (Test-Path $sdk)) {
  $sdk = Join-Path $env:LOCALAPPDATA 'Android\Sdk'
}

if (-not (Test-Path $sdk)) {
  Write-Error "ANDROID_SDK_ROOT não definido e SDK não encontrado em '$sdk'. Instale o Android SDK via Android Studio ou ajuste a variável ANDROID_SDK_ROOT."
  exit 1
}

# Garante ANDROID_SDK_ROOT na sessão e adiciona platform-tools ao PATH atual
$env:ANDROID_SDK_ROOT = $sdk
$platformTools = Join-Path $sdk 'platform-tools'
if (-not (Test-Path $platformTools)) {
  Write-Error "platform-tools não encontrado em '$platformTools'. Abra o Android Studio > SDK Manager e instale 'Android SDK Platform-Tools'."
  exit 1
}
if (-not (($env:PATH -split ';') -contains $platformTools)) {
  $env:PATH = "$env:PATH;$platformTools"
}

# Caminho do adb
$adb = Join-Path $platformTools 'adb.exe'

Write-Host "==> Verificando adb" -ForegroundColor Cyan
try {
  & $adb version | Write-Host
} catch {
  Write-Error "Falha ao executar adb. Caminho: $adb"
  exit 1
}

Write-Host "==> Dispositivos conectados" -ForegroundColor Cyan
& $adb devices | Write-Host

Write-Host "==> Diretório do projeto: $projectRoot" -ForegroundColor Cyan

if ($UseGradle) {
  Write-Host "==> Build+Instalação via Gradle: installDebug" -ForegroundColor Yellow
  Push-Location (Join-Path $projectRoot 'android')
  try {
    & .\gradlew.bat installDebug --stacktrace --info
  } finally {
    Pop-Location
  }
} else {
  Write-Host "==> Expo CLI: npm run android (com EXPO_DEBUG=1)" -ForegroundColor Yellow
  $env:EXPO_DEBUG = '1'
  & npm run android
}

Write-Host "==> Concluído" -ForegroundColor Green
