# 🔐 Configuração do Firebase

## Para Desenvolvedores

### 1️⃣ Configurar variáveis de ambiente

1. Copie o arquivo de exemplo:
```bash
cp .env.example .env
```

2. Preencha o `.env` com suas credenciais do Firebase Console:
```
EXPO_PUBLIC_FIREBASE_API_KEY=sua_chave_aqui
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
...
```

3. **NUNCA** commite o arquivo `.env` no Git!

### 2️⃣ Obter credenciais do Firebase

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Selecione seu projeto (ou crie um novo)
3. Vá em **Configurações do Projeto** (ícone de engrenagem)
4. Role até **Seus aplicativos** → **SDK setup and configuration**
5. Copie as credenciais do objeto `firebaseConfig`

## Para Build de Produção (EAS Build)

Para builds standalone (APK/IPA), configure as variáveis no EAS:

```bash
eas secret:create --scope project --name EXPO_PUBLIC_FIREBASE_API_KEY --value "sua_chave"
eas secret:create --scope project --name EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN --value "seu_dominio"
# ... repita para todas as variáveis
```

Ou adicione ao `app.json` (campo `extra`) no momento do build - mas **remova** antes de commitar!

## Hierarquia de Prioridade

1. **`.env`** - Desenvolvimento local (ignorado pelo Git)
2. **`app.json` extra** - Build de produção (EAS)
3. **Fallback** - Erro se nenhum disponível

## Segurança

✅ **O que está protegido:**
- `.env` está no `.gitignore`
- `google-services.json` está no `.gitignore`
- Credenciais removidas do `app.json`

⚠️ **IMPORTANTE:**
- Nunca commite arquivos `.env*` (exceto `.env.example`)
- Nunca commite `google-services.json`
- Use EAS Secrets para builds de produção
- Revise commits antes de dar push

## Testando

Após configurar o `.env`, reinicie o Metro bundler:

```bash
npm start -- --clear
```

Verifique o console - deve mostrar:
```
Firebase Config: { source: '.env', apiKey: '***otg', projectId: 'bloomyproto' }
```
