# React Native + thirdweb + TypeScript Starter Template

Got questions? Jump into our [Discord](https://discord.gg/thirdweb) to speak with us directly.

## Getting Started

### Get a clientId

You can [get your clientId](https://thirdweb.com/dashboard/settings/api-keys) from our Dashboard and set it in the `.env` file var: `TW_CLIENT_ID`.

Please, make sure to add the app's `bundleId` in the Allowed Bundle IDs list. This app's bundleId = `com.thirdweb.connect`

### Install dependencies:

```bash
yarn install # or npm install
```

If you are developing on iOS, you will need to install the pods:

```bash
cd ios && pod install
```

## Running the app

Android:

```
yarn android
```

iOS:

```
yarn ios
```

## Local dev

Create an `.env.local` file with your client id:

`TW_CLIENT_ID=`

### yalc thirdweb packages

`yalc add @thirdweb-dev/contracts-js @thirdweb-dev/storage @thirdweb-dev/auth @thirdweb-dev/chains @thirdweb-dev/react-core @thirdweb-dev/react-native @thirdweb-dev/react-native-compat @thirdweb-dev/sdk @thirdweb-dev/wallets`

Run the following command to force getting the latest version of the yalc'ed packages

`yarn --force`

### testing your changes

## Learn More

To learn more about thirdweb and React Native, take a look at the following resources:

- [thirdweb Portal](https://portal.thirdweb.com) - check our guides and development resources.
- [thirdweb SDK](https://portal.thirdweb.com/sdk) - check our guides and development resources.
- [React Native Documentation](https://reactnative.dev/) - learn about React Native features and API.

You can check out [the thirdweb GitHub organization](https://github.com/thirdweb-dev) - your feedback and contributions are welcome!

## Join our Discord!

For any questions, suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).
