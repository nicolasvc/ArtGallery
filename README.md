# ArtGallery 🎨  

[![GitHub license](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![ktlint](https://img.shields.io/badge/code%20style-%E2%9D%A4-FF4081.svg)](https://ktlint.github.io/)

![Art](https://github.com/nicolasvc/ArtGallery/assets/40839023/e63a8228-428e-4ffd-99bd-c2fd109c5180)

**ArtGallery** is a sample art react native application 📱 built to  take *the technical test* of Modak. 


## About
This app efficiently retrieves and stores Art data from the Art Institute of Chicago API using SQLite storage, ensuring smooth and responsive performance.

Enjoy a clean and user-friendly Material UI design, providing an elegant and intuitive experience for users.

Explore the world of art with access to a wealth of information and resources from the Art Institute of Chicago API. Discover more about their extensive collection and exhibitions


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
- [React i18](https://www.npmjs.com/package/react-i18next)  Enables multilingual support in the application.
- [React sqlite storage](https://www.npmjs.com/package/react-native-sqlite-storage) Allows save data in our local database .
- [React sqlite storage](https://notifee.app)  Provides comprehensive notification event management and configuration.
- [React sqlite storage](https://rnfirebase.io) Integrates Firebase services, including push notifications, seamlessly into your app.


# Package Structure

<details>

<summary>See Structure</summary>

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
</details>

## Architecture

This app uses [***the CLEAN architecture***](https://medium.com/bancolombia-tech/clean-architecture-aislando-los-detalles-4f9530f35d7a) Pattern.

and [***Atomic design***](https://medium.com/timeless/atomic-design-with-react-native-7259a8bdabbe)

This structure follows a modular approach and is organized based on the functionality and responsibility of each file or directory. Furthermore, by categorizing components into groups such as atoms, molecules, organisms, and templates, it promotes code reusability and maintainability.

## How to run de project 🏃🏽

### Install Dependencies
Ensure that you have Node.js and npm (or Yarn) installed on your machine. Then, navigate to the project directory and run the following command to install dependencies:
```
npm install
```

### Configure Environment Variables: 
Create a .env.development file in the project's root directory and add the following configuration:
```
API_URL=https://api.artic.edu/api/v1/
```
### Run the Application: 
Use the following command to start the application on an emulator or physical device:
For Android:

```
npx react-native run-android
```
Or for iOS:
```
npx react-native run-ios
```
Make sure you have an Android emulator or iOS device connected and set up on your machine.

<details>

<summary>Set Up Firebase for Push Notifications 🔥💬 (Optional):</summary>

If you want to enable push notifications, start by creating a project on Firebase at Firebase Console.
1. Add your Android app in Firebase and make sure to use the same package name as in your React Native project (e.g., com.artgallery).
2. Download the google-services.json file provided by Firebase after adding the Android app.
3. Place the google-services.json file in the following path in your React Native project: ArtGallery/android/app.
   
With these additional steps, you'll be able to configure your project to receive push notifications through Firebase. Be sure to follow Firebase's documentation for more details on how to set up and send push notifications in your app.

https://github.com/nicolasvc/ArtGallery/assets/40839023/c73a871e-1dfd-404b-9363-1944b393bf53
</details>


## Discuss 💬

Have any questions, doubts or want to present your opinions, views? You're always welcome. You can [start discussions](https://github.com/nicolasvc/ArtGallery/issues).



## License
```
MIT License

```

