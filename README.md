# NomeBr

App mobile para explorar os nomes do Brasil com dados oficiais do Censo do IBGE.
Publicado na Google Play: [NomeBr](https://play.google.com/store/apps/details?id=com.avantech.nomebr).

## O que o app faz

- **Mais usados:** ranking dos nomes mais frequentes no Brasil
- **Mais raros:** nomes pouco registrados, para quem procura algo diferente
- **Pesquisar nome:** a frequência de um nome ao longo das décadas, com filtro por sexo

Os dados vêm da [API de Nomes do IBGE](https://servicodados.ibge.gov.br/api/docs/nomes)
(`/api/v2/censos/nomes`), consultada ao vivo.

## Stack

- React Native 0.81 + Expo 54 (Expo Router)
- TypeScript
- Arquitetura MVVM: telas em `src/app`, view models em `src/viewmodel`, serviço e repositório em `src/model`
- Monetização com Google AdMob (`react-native-google-mobile-ads`)
- `app.py`: script Python que consulta o IBGE e gera a lista de nomes raros (`nomes_filtrados.json`)

## Como rodar

```bash
npm install
npx expo start        # abre no Expo Go ou no emulador
npm run android       # build nativa (necessária para os anúncios do AdMob)
```
