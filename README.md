# 📱 Mobile Automation POC - Clock App

Projeto de Prova de Conceito (POC) para automação de testes móveis utilizando WebDriverIO, Appium e TypeScript, focado no aplicativo Clock do Android.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **Java JDK** (versão 11 ou superior)
- **Android Studio** com Android SDK
- **Emulador Android** ou dispositivo físico
- **Appium Server** (instalado via npm)

### Verificar Instalação

```bash
# Verificar Node.js
node --version
npm --version

# Verificar Java
java -version

# Verificar Android SDK
adb version
```

## 🚀 Instalação

1. **Clone o repositório:**
   ```bash
   git clone <repository-url>
   cd mobile-automation-poc
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Instale o Appium Server globalmente:**
   ```bash
   npm install -g appium
   npm install -g appium-doctor
   ```

4. **Verifique a instalação do Appium:**
   ```bash
   appium-doctor --android
   ```

## ⚙️ Configurações Atuais

### **WebDriverIO Configuration (`wdio.conf.ts`)**

- **Runner:** Local
- **Framework:** Mocha
- **Reporter:** Spec + Allure
- **Porta:** 4723 (Appium Server)

### **Capabilities Android**

```typescript
{
  platformName: 'Android',
  'appium:deviceName': 'emulator-5554',
  'appium:platformVersion': '14',
  'appium:automationName': 'UiAutomator2',
  'appium:appPackage': 'com.google.android.deskclock',
  'appium:appActivity': 'com.android.deskclock.DeskClock'
}
```

### **Estrutura do Projeto**

```
mobile-automation-poc/
├── test/
│   ├── pageobjects/
│   │   └── clock.page.ts      # Page Object para o app Clock
│   └── specs/
│       └── test.e2e.ts        # Casos de teste E2E
├── wdio.conf.ts               # Configuração WebDriverIO
├── package.json               # Dependências e scripts
├── tsconfig.json              # Configuração TypeScript
└── README.md                  # Este arquivo
```

## 🧪 Executando os Testes

### **Pré-requisitos para Execução**

1. **Inicie o Emulador Android:**
   ```bash
   # Via Android Studio ou comando
   emulator -avd <nome-do-avd>
   ```

2. **Verifique se o dispositivo está conectado:**
   ```bash
   adb devices
   ```

3. **Inicie o Appium Server:**
   ```bash
   appium
   ```

### **Comandos de Execução**

#### **Executar Todos os Testes**
```bash
npm run wdio
# ou
npx wdio run wdio.conf.ts
```

#### **Executar Testes com Filtro (por arquivo)**
```bash
# Executar apenas testes do arquivo test.e2e.ts
npx wdio run wdio.conf.ts --spec test/specs/test.e2e.ts
```

#### **Executar Testes com Filtro (por suíte)**
```bash
# Executar apenas testes da suíte "Time Display Tests"
npx wdio run wdio.conf.ts --suite timeDisplay

# Executar apenas testes da suíte "Alarm Configuration Tests"
npx wdio run wdio.conf.ts --suite alarmConfig
```

#### **Executar Teste Específico (por grep)**
```bash
# Executar testes que contenham "alarm" no nome
npx wdio run wdio.conf.ts --grep "alarm"

# Executar apenas o teste "should configure alarm to 10:55 AM"
npx wdio run wdio.conf.ts --grep "10:55"
```

#### **Executar com Modo Debug/Verbose**
```bash
# Com logs detalhados
npx wdio run wdio.conf.ts --logLevel debug

# Com pausa entre passos (útil para debug)
npx wdio run wdio.conf.ts --debug
```

## 📊 Relatórios Allure

### **Instalar Allure CLI**
```bash
npm install -g allure-commandline
```

### **Gerar e Visualizar Relatório**

1. **Executar os testes (eles geram os resultados automaticamente):**
   ```bash
   npm run wdio
   ```

2. **Gerar o relatório HTML:**
   ```bash
   allure generate allure-results --clean
   ```

3. **Abrir o relatório no navegador:**
   ```bash
   allure open
   ```

### **Comandos Úteis do Allure**

```bash
# Gerar relatório limpo (remove relatórios anteriores)
allure generate allure-results --clean

# Abrir relatório em uma porta específica
allure open --port 8080

# Servir relatório (para compartilhamento)
allure serve allure-results

# Limpar resultados anteriores
rm -rf allure-results allure-report
```

## 🔍 Cenários de Teste Implementados

### **Time Display Tests**
- ✅ Verificar se o horário é exibido
- ✅ Obter o horário atual do relógio

### **Alarm Configuration Tests**
- ✅ Navegar para a aba de alarmes
- ✅ Configurar alarme para 10:55 AM (sequência completa)

## 🛠️ Tecnologias Utilizadas

- **WebDriverIO** - Framework de automação
- **Appium** - Server para automação móvel
- **TypeScript** - Linguagem de programação
- **Mocha** - Framework de testes
- **Allure** - Relatórios de teste
- **UiAutomator2** - Driver Android
- **Expect-WebDriverIO** - Assertions

## 📱 Mapeamento de Elementos

### **Estratégias Utilizadas**
- **Accessibility ID** (`~`) - Mais confiável para apps móveis
- **XPath** - Para elementos sem accessibility ID
- **Resource ID** - Para elementos específicos do Android

### **Exemplos de Seletores**
```typescript
// Accessibility ID (preferido)
private get alarmTab() { return $('~Alarm') }

// XPath com Resource ID
private get timeDisplay() {
    return $('//android.widget.TextView[@resource-id="com.google.android.deskclock:id/digital_clock"]')
}

// XPath com texto
private get amButton() {
    return $('//android.widget.CompoundButton[@text="AM"]')
}
```

## 🔧 Desenvolvimento e Debugging

### **Usar Appium Inspector**
```bash
npx appium-inspector
```

**Capabilities para Inspector:**
```json
{
  "platformName": "Android",
  "appium:deviceName": "emulator-5554",
  "appium:platformVersion": "14",
  "appium:automationName": "UiAutomator2",
  "appium:appPackage": "com.google.android.deskclock",
  "appium:appActivity": "com.android.deskclock.DeskClock"
}
```

### **Logs e Troubleshooting**

- **Logs do WebDriverIO:** Verifique o console durante execução
- **Logs do Appium:** Execute `appium` em outro terminal
- **Logs do Android:** `adb logcat`
- **Screenshots:** Capturados automaticamente em caso de falha

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Boas Práticas Implementadas

- ✅ **Page Object Pattern** - Separação de seletores e ações
- ✅ **Esperas Explícitas** - `waitForDisplayed` para mobile
- ✅ **TypeScript** - Type safety e melhor DX
- ✅ **JSDoc Comments** - Documentação inline
- ✅ **Estrutura Organizada** - Testes agrupados por funcionalidade
- ✅ **Git Ignore Adequado** - Exclui artefatos de teste

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique os logs de execução
2. Consulte a documentação do WebDriverIO/Appium
3. Abra uma issue no repositório

---

**Happy Testing! 🚀**</content>
<parameter name="filePath">c:\Users\NTConsult\Documents\mobile-automation-poc\README.md