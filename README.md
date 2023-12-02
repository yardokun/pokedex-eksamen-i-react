# Pokédex <!-- omit in toc -->

Pokédex er en React-basert webapplikasjon som lar brukere se informasjon om pokémoner og deres trenere.

Les første punkt, **"Installasjon"**, for å komme i gang med appen.

# Innhold <!-- omit in toc -->

- [1. Installasjon](#1-installasjon)
  - [1.1. Forutsetninger](#11-forutsetninger)
  - [1.2. Oppsett](#12-oppsett)
  - [1.3. Kjøre appen](#13-kjøre-appen)
  - [1.4. Pokemon API](#14-pokemon-api)
    - [Kontekst](#kontekst)
    - [Viktige Merknader](#viktige-merknader)
    - [Hvor i koden API-nøkkelen implementeres](#hvor-i-koden-api-nøkkelen-implementeres)
- [2. Bruk av appen](#2-bruk-av-appen)
  - [Hjem](#hjem)
  - [Alle Pokémon](#alle-pokémon)
  - [Legg til din Pokémon](#legg-til-din-pokémon)
  - [Mine Favoritter](#mine-favoritter)
- [3. Design](#3-design)
  - [3.1. Planlegging i Adobe](#31-planlegging-i-adobe)
  - [3.2. Bilder](#32-bilder)
- [4. Appens arkitektur](#4-appens-arkitektur)
  - [React.StrictMode](#reactstrictmode)
- [5. Notat](#5-notat)


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


<!-- ```js
const hello = "world";
```

```bash
npm install
``` -->

## 1.4. Pokemon API

### Kontekst

API-et benytter https://crudcrud.com/ som backend, som tilbyr en enkel RESTful tjeneste for å lagre og
hente data. Det er viktig å merke seg at https://crudcrud.com/ har begrensninger som utløpsdato for API-
nøkkelen og mangel på relasjonsdatabasefunksjoner.

### Viktige Merknader

**Fornyelse av API-nøkkel:**

https://crudcrud.com/ tilbyr en begrensning på 100 API-forespørsler og lagringskapasitet for hver 24-timers
periode. Når grensen på 100 forespørsler er nådd, eller etter 24 timer, vil den unike API-nøkkelen utløpe, og
alle lagrede data vil bli slettet. For å fortsette å bruke tjenesten, må du generere en ny nøkkel.

**For å få en ny API-nøkkel umiddelbart:**

1. Åpne utviklerverktøy i Google Chrome (Cmd+Option+I/Ctrl+Shift+I).
2. Gå til 'Application'-fanen.
3. I venstre kolonne, velg 'Storage'.
4. Klikk på 'Clear site data' knappen.
5. Oppdater nettstedet (Cmd+R/Ctrl+R).
Etter oppdatering vil https://crudcrud.com/ generere en ny unik API-nøkkel som du kan bruke.

### Hvor i koden API-nøkkelen implementeres

Gå til `src/endpoints.js`. Her finnes det en variabel kalt `path`. Bytt ut den nåværende API-nøkkelen med den nye API-nøkkelen.

# 2. Bruk av appen

## Hjem

På forsiden `home.page.jsx` kan brukeren velge mellom å gå til Alle Pokémon, Legg til Pokémon eller Mine Favoritter.

## Alle Pokémon

I `all.pokemon.page.jsx` får brukeren en oversikt over alle eksisterende pokémonkort. Her finnes allerede disse pokémon:

* Charizard
* Pikachu
* Bulbasaur
* Wartortle
* Eevee
* Butterfree

Under Alle Pokémon, finnes Alle Trenere. Her ligger det to trenerkort:

* Ash Ketchum
* Gary Oak

Brukeren har muligheten til å redigere hver pokémon og oppdatere noe av infoen om den, samt velge en av trenernes navn for å knytte trener og pokémon sammen. Da vil infoen bli oppdatert når brukeren trykker "Lagre", og pokémonen vil få den tilhørende trenerens ID i "Trener" feltet. Trenerkortet oppdateres med info om hvilke pokémon den eier (er knyttet opp mot) i "Pokémons" feltet. Brukeren kan også velge å slette de forskjellige pokémonkort og trenerkort. I tillegg er det en mulighet for å favorisere sine favoritt-pokémon. Disse vil da havne på Mine Favoritter-siden.

Det er også en mulighet for å søke på pokémon etter navn i søkefeltet `searchbar.component.jsx` øverst på siden.

## Legg til din Pokémon

I `addPokemon.page.jsx` har brukeren mulighet for å legge til sin egen pokémon med navn, type og nivå. Det er ikke mulig å legge til en pokémon som allerede eksisterer. Når brukeren har fylt ut all nødvendig info (alle felter), vil pokémonen bli lagt til på Alle Pokémon-siden.

## Mine Favoritter

I `myFavorites.page.jsx` kan brukeren se en oversikt over alle sine favoritt-pokémon som den har favorisert. Her er det også mulig å fjerne dem fra favoritter igjen.

# 3. Design

## 3.1. Planlegging i Adobe

Jeg startet med å lage et raskt design av hele appen i Adobe, for å kunne se hvordan jeg ville at den skulle se ut, samt kunne planlegge de ulike funksjonene og React-komponentene.

Etterhvert som jeg jobbet med prosjektet, innså jeg at jeg måtte gjøre noen endringer på designet, for å kunne implementere alle de nødvendige funksjonene. Derfor har jeg gått litt bort fra den opprinnelige idéen noen steder og gjort en del justeringer i appen.

[Link til designet i Adobe.](https://xd.adobe.com/view/9edc2693-e55b-4095-9610-b42570c19924-cb8f/)

## 3.2. Bilder

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

# 4. Appens arkitektur

Appen har en hierarkisk struktur som starter med `index.js` på toppen, som rendrer `App.jsx`-komponenten.

Fra `App.jsx` er det en sentral forgrening til forskjellige context providers som innkapsler hele applikasjonen, nemlig `FavoritesProvider` og `TrainersProvider`. Disse context providers gjør visse data tilgjengelige gjennom hele applikasjonen.

Komponenten `Routing.jsx` kalles inne i `App.jsx`, som deretter bestemmer hovedrutene i applikasjonen, som fører til forskjellige sidekomponenter som `Home.page.jsx`, `AllPokemon.page.jsx`, `AddPokemon.page.jsx`, og `MyFavorites.page.jsx`.

Hver av disse sidene kan representeres som separate grener som stammer fra `Routing.jsx`. De kan også bruke felles komponenter som `PokemonCard`, `TrainerCard`, `Searchbar`, osv. For eksempel, `AllPokemon.page.jsx` vil vise at den bruker `PokemonCard`, `Searchbar`, og `TrainerCard`.

Her er en forenklet representasjon:

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
    |     |-- InputText.component.jsx
    |
    |-- MyFavorites.page.jsx
          |-- PokemonCard.component.jsx
```

## React.StrictMode

I `index.js` har jeg kommentert ut *React.StrictMode*, siden jeg opplevde at denne ga meg duplikater av alle pokémonkort på siden om jeg hadde den aktivert. Men den er bra å bruke i utviklermodus, siden StrictMode er et verktøy for å fremheve potensielle problemer i en applikasjon. Når StrictMode er aktivert, kompilerer React en liste over alle klassekomponenter som bruker de usikre livssyklusene, og logger en advarselsmelding med informasjon om disse komponentene. [Kilde.](https://legacy.reactjs.org/docs/strict-mode.html)

Jeg ble dessverre nødt til å deaktivere den får å få appikasjonen til å kjøre som den skal.

# 5. Notat

På slutten av arbeidet med prosjektet klarte jeg å kludre til alt, så nå fungerer ikke ting som de skal. Trenerkortene kjøres for eksempel ut for mange ganger, og jeg er klar over dette. Har ikke nok tid til å fikse det.