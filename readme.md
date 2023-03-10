# CrossLife App

Para rodar o app:

1. Clone o repositório e instale as dependências normalmente (usamos o Yarn)
2. Instale a CLI global do Eas: ```npm i -g eas-cli```
3. Faça login na sua conta EAS: ```eas login```
4. Para abrir o app no simulador do iPhone, execute o comando: 

    ```eas build:run -p ios```

5. Para abrir o app no emulador do android:

     ```eas build:run -p android```

---

Para buildar novas versões, o comando é:

```eas build -p ios``` ou ```eas build -p android```