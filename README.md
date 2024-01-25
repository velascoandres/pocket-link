# Pocket Link

Welcome to Pocket Link, your go-to application for link management featuring a convenient dashboard! This application is built using the [T3 stack](https://create.t3.gg/) with prisma.

Not only does it shorten links, but it also allows you to efficiently organize and monitor them through an intuitive dashboard. Transform lengthy links into concise, customized URLs that are effortlessly shareable. Take advantage of our dashboard to save, categorize, and track the performance of your links.

## How to Use

Clone this repository.
Set up your virtual environment (optional but recommended).
Copy the contents of `.env.example` into a new file named `.env` and configure the required variables.
```text
DATABASE_URL=""

NEXTAUTH_SECRET=""
NEXTAUTH_URL=""

DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""

GH_CLIENT_ID=""
GH_CLIENT_SECRET=""

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

Install dependencies.
```shell_script
yarn
```
Setup the database.
```shell_script
yarn postinstall
yarn db:push
```
Run the application in dev mode
```shell_script
yarn dev
```
Open your browser and visit [http://localhost:3000](http://localhost:3000) to begin shortening URLs.

## Key Features

- **Quick Shortening:** Transform long links with just a few clicks.
- **Intuitive Dashboard:** Save, organize, and manage your links efficiently.
- **Customization:** Personalize shortened URLs according to your preferences.

We hope you enjoy using Pocket Link for all your link management needs! If you have any questions or issues, feel free to open an [issue](https://github.com/velascoandres/pocket-link/issues)