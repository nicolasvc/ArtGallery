# ArtGallery 🎨  

[![GitHub license](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![ktlint](https://img.shields.io/badge/code%20style-%E2%9D%A4-FF4081.svg)](https://ktlint.github.io/)

![Recipely](https://user-images.githubusercontent.com/40839023/205104367-4d58c4d9-bdfd-468c-b6e6-c9cf839818eb.jpg)

**ArtGallery** is a sample art react native application 📱 built to  take *the technical test* of Modak. 


## About
It simply loads **Art** data from API and stores it in persistence storage (sql lite storage).
- Clean and Simple Material UI.


*Art Institute of Chicago  API is used in this app. More information  [here](https://api.artic.edu/docs/#collections-2)*.

## Built With 🛠
- [TypeScript](https://www.typescriptlang.org) - TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- [Axios](https://axios-http.com/docs/intro) - Axios is a promise-based HTTP Client for node.js.
- [React navigation](https://reactnavigation.org) Allows create navigation in our app
- [React Image Zoom](https://www.npmjs.com/package/react-native-image-zoom-viewer) Allows make zoom in out art picture.
- [React PagerView](https://github.com/callstack/react-native-pager-view) This component allows the user to swipe left and right through pages of data.
- [React Html Render](https://meliorence.github.io/react-native-render-html/) This component allows the app render HTML strings.
- [React SnackBar](https://www.npmjs.com/package/react-native-snackbar) Material Design "Snackbar" component for Android and iOS. Supports custom colors, fonts, and languages.
- [React PagerView](https://github.com/callstack/react-native-pager-view) This component allows the user to swipe left and right through pages of data.
- [React i18](https://www.npmjs.com/package/react-i18next) Allows multilanguage in the application.
- [React sqlite storage](https://www.npmjs.com/package/react-native-sqlite-storage) Allows save data in our local database .


# Package Structure
 ```
..
└── src
    ├── assets
    │   ├── constants      # Constans
    │   ├── fonts          # Fonts
    │   ├── images         # Images
    │   └── lottie         # Animation Lottie
    │
    ├── components
    │   ├── atoms          # Atomics components
    │   ├── molecules      # Molecular components
    │   ├── organisms      # Organisms components
    │   ├── templates      # Templates components
    │
    ├── dataSource
    │   ├── local          # Local data source
    │   └── remote         # Remote data source
    │
    ├── di
    │   ├── ModuleDI       # Module Dependency Injection
    │
    ├── hooks
    │   ├── useDetailArt   # Hook related with detail art.
    │   ├── useFavoriteArt # Hook related with favorite art.
    │   └── useListArtRemote # Hook related with remote list art.
    │
    ├── i18n
    │   ├── en             # Translate english
    │   └── i18n           # Configuration internan
    │
    ├── navigation
    │   ├── NavigationView # Configuration navigation
    │
    ├── repository
    │   ├── RepositoryArt  # Repository art
    │
    ├── screens
    │   ├── DetailArt      # Screen detail art
    │   ├── FavoriteArt    # Screen favorite art
    │   └── ListArt        # Screen list art
    │
    ├── services
    │   ├── database       # Service database
    │   └── server         # Service server
```


## Architecture

This app uses [***the CLEAN architecture***](https://medium.com/bancolombia-tech/clean-architecture-aislando-los-detalles-4f9530f35d7a) Pattern.

and [***Atomic design***](https://medium.com/timeless/atomic-design-with-react-native-7259a8bdabbe)

This structure follows a modular approach and is organized based on the functionality and responsibility of each file or directory. Furthermore, by categorizing components into groups such as atoms, molecules, organisms, and templates, it promotes code reusability and maintainability.



## Discuss 💬

Have any questions, doubts or want to present your opinions, views? You're always welcome. You can [start discussions](https://github.com/nicolasvc/ArtGallery/issues).



## License
```
MIT License

```

