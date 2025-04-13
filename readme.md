# Yu-Gi-Oh! Card Viewer 📱🃏

Um aplicativo mobile feito com React Native que consome a API pública do YGOPRODeck para listar cartas de Yu-Gi-Oh!, permitir buscar e filtrar cartas, e também favoritá-las com persistência local.

## 🌐 API Utilizada

**YGOPRODeck API** - https://db.ygoprodeck.com/api-guide/

Exemplo de endpoint:
```src/pages/SearchFilterBar.js
GET https://db.ygoprodeck.com/api/v7/cardinfo.php
```

A API retorna dados como:
- `name`, `type`, `desc`, `atk`, `def`, `level`, `race`, `attribute`
- `card_images` com múltiplas resoluções

## ⚙️ Funcionalidades

- Listagem paginada de cartas
- Busca por nome
- Filtro por tipo (Monster, Spell, Trap)
- Detalhamento visual das cartas
- Sistema de favoritos com persistência via AsyncStorage
- Componentização reutilizável (ex: barra de pesquisa usada no Main e Favorites)
- Sincronização entre telas ao favoritar/remover

## 🛠 Tecnologias

- React Native
- Expo
- Axios (requisições HTTP)
- AsyncStorage (persistência local)
- Navegação com React Navigation

## 🧱 Estrutura do Projeto

```
/src
  /components
    SearchFilterBar.js     ← componente reutilizável
  /pages
    Main.js                ← tela principal de cartas
    Favorites.js           ← favoritos com busca/filtro
    CardDetails.js         ← detalhes visuais de uma carta
  /services
    api.js                 ← instância Axios
```

## ▶️ Como Executar

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Rode o projeto com Expo:
   ```bash
   npx expo start
   ```
   
## 📄 Licença

Este projeto é apenas para fins educacionais.