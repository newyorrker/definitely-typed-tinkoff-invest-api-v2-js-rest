# Tinkoff-invest-api: types. Non-official❗️ 
It is generated types from [tinkoff api v2 proto contracts](https://github.com/Tinkoff/investAPI/tree/main/src/docs/contracts)


Why? 🤷🏻
----
I decide to use [proxy](https://tinkoff.github.io/investAPI/swagger-ui/) for my project but there aren't types for typescript 😢 \
I made script for automatic generation types from [proto contracts](https://github.com/Tinkoff/investAPI/tree/main/src/docs/contracts) using `ts-proto` 🤖


Usage 👨‍💻
----
Just install npm package `npm i tinkoff-invest-api-v2-types`

How to update the version?
----
You need to clone this repository, set the [version of tinkoff api](https://github.com/Tinkoff/investAPI/branches) which you want in .env. Like this: `API_VERSION=1.0.8`.

After you must run the command `npm run build` (make sure you have already installed protobuf), commit changes and make a pull request. ✅
