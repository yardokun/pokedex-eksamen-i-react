# Pokédex <!-- omit in toc -->

Pokédex er en React-basert webapplikasjon som lar brukere se informasjon om pokémoner og deres trenere.

Les første punkt, **"Installasjon"**, for å komme i gang med appen.

# Innhold <!-- omit in toc -->

- [1. Installasjon](#1-installasjon)
  - [1.1. Forutsetninger](#11-forutsetninger)
  - [1.2. Oppsett](#12-oppsett)
  - [1.3. Kjøre appen](#13-kjøre-appen)
- [2. Design](#2-design)
  - [2.1. Planlegging i Adobe](#21-planlegging-i-adobe)
  - [2.2. Bilder](#22-bilder)
- [3. Appens arkitektur](#3-appens-arkitektur)
- [4. Notater til meg selv](#4-notater-til-meg-selv)


# 1. Installasjon

## 1.1. Forutsetninger

Før du starter, må du sikre at du har følgende installert på din maskin:

* Node.js (Versjon 12 eller nyere)
* NPM (Node Package Manager, følger vanligvis med Node.js installasjon)

Du kan sjekke versjonene av disse verktøyene ved å kjøre følgende kommandoer i terminalen:

```bash
node -v
npm -v
```
## 1.2. Oppsett

1. **Åpne den zippede mappen**
   
Pakk ut den zippede mappen til et ønsket sted på din maskin.

2. **Naviger til prosjektmappe**
   
Åpne terminalen og naviger til prosjektets rotmappe:

```bash
cd sti/til/din/utpakkede/mappe/eksamen-i-react
```

3. **Installer avhengigheter**
   
Når du er inne i prosjektets rotmappe, kjør følgende kommando for å installere alle nødvendige avhengigheter:

```bash
npm install
```

## 1.3. Kjøre appen

For å starte appen lokalt på din maskin, kjør følgende kommando i prosjektets rotmappe:

```bash
npm start
```

Dette vil starte utviklingsserveren og åpne appen i din standard nettleser. Hvis nettleseren ikke åpner automatisk, kan du manuelt navigere til **http://localhost:3000** for å vise appen.


```js
const hello = "world";
```

```bash
npm install
```

# 2. Design

## 2.1. Planlegging i Adobe

Jeg startet med å lage et raskt design av hele appen i Adobe, for å kunne se hvordan jeg ville at den skulle se ut, samt kunne planlegge de ulike funksjonene og React-komponentene.

Etterhvert som jeg jobbet med prosjektet, innså jeg at jeg måtte gjøre noen endringer på designet, for å kunne implementere alle de nødvendige funksjonene. Derfor har jeg gått litt bort fra den opprinnelige idéen noen steder og gjort en del justeringer i appen.

[Link til designet i Adobe.](https://xd.adobe.com/view/9edc2693-e55b-4095-9610-b42570c19924-cb8f/)

## 2.2. Bilder

Alle bilder av de forskjellige pokémon er hentet fra https://www.pokemon.com/us/pokedex.

<img src="src/assets/graphics/bulbasaur.png" width="100"><img src="src/assets/graphics/butterfree.png" width="100"><img src="src/assets/graphics/charizard.png" width="100"><img src="src/assets/graphics/eevee.png" width="100"><img src="src/assets/graphics/pikachu.png" width="100"><img src="src/assets/graphics/wartortle.png" width="100">

[Pokemon-logo](https://www.pngegg.com/en/png-wpzwe)

<img src="src/assets/graphics/logo.png" width="130">

[Pokemon-placeholder-bilde](https://www.google.com/search?sca_esv=584551767&rlz=1C5CHFA_enNO1019NO1020&hl=no&sxsrf=AM9HkKm7KbqGKYbwRQEagmyG9EiGeVzcxg:1700652464270&q=pokemon+question+mark+png&tbm=isch&source=lnms&sa=X&ved=2ahUKEwjgn5OQwNeCAxVtFBAIHX3OB2MQ0pQJegQICxAB&biw=1440&bih=790&dpr=2#imgrc=AWkiklilCU9zEM)

<img src="src/assets/graphics/pokemonPlaceholder.png" width="100">

Pokemon trenere: [Ash](https://www.pngwing.com/en/free-png-mtzss) og [Gary](https://www.pngwing.com/en/free-png-tmrpw)

<img src="/src/assets/graphics/ash-ketchum.png" width="100"> <img src="src/assets/graphics/gary-oak.png" width="60">

Navigasjons-ikonene er laget med [DALL-E](https://openai.com/dall-e-3).

<img src="src/assets/graphics/pokemonball.png" width="150"> <img src="src/assets/graphics/pokemonPencil.png" width="150"> <img src="src/assets/graphics/pokemonFavorite.png" width="150">

# 3. Appens arkitektur

Appen har en hierarkisk struktur som starter med `index.js` på toppen, som rendrer `App.jsx`-komponenten.

Fra `App.jsx` er det en sentral forgrening til forskjellige context providers som innkapsler hele applikasjonen, nemlig `FavoritesProvider` og `TrainersProvider`. Disse context providers gjør visse data tilgjengelige gjennom hele applikasjonen.

Komponenten `Routing.jsx` kalles inne i `App.jsx`, som deretter bestemmer hovedrutene i applikasjonen, som fører til forskjellige sidekomponenter som `Home.page.jsx`, `AllPokemon.page.jsx`, `AddPokemon.page.jsx`, og `MyFavorites.page.jsx`.

Hver av disse sidene kan representeres som separate grener som stammer fra `Routing.jsx`. De kan også bruke felles komponenter som `PokemonCard`, `TrainerCard`, `Searchbar`, osv. For eksempel, `AllPokemon.page.jsx` vil vise at den bruker `PokemonCard`, `Searchbar`, og `TrainerCard`.

```
Index.js
  |
  App.jsx
  |---FavoritesProvider
  |---TrainersProvider
  |
  Routing.jsx
    |
    |-- Home.page.jsx
    |-- AllPokemon.page.jsx
    |     |-- PokemonCard.component.jsx
    |     |-- Searchbar.component.jsx
    |     |-- TrainerCard.component.jsx
    |
    |-- AddPokemon.page.jsx
    |     |-- SelectTrainer.component.jsx
    |
    |-- MyFavorites.page.jsx
          |-- PokemonCard.component.jsx
```

# 4. Notater til meg selv

Kom med forslag til pokémon info som kan legges inn


Vise pokemonkort på allPokemon.
Kjør listen én gang. Hvis den allerede er kjørt, ikke POST igjen, bruk GET.

Vise trenere på allPokemon.
Hardkode trenere. Gjør samme som på pokemon kort.

Hent alle trenere i "Velg trener" og velg hvilken trener til hvilken pokemon.
GET trenere jeg har laget, og vis navn i listen.

Når man lagrer pokemon => PUT pokemon og trener

Gå inn på trener => Ser hvilke pokemon den trener har
(Ny side)