# Zoom Telegram Reminder Bot

This bot notifies a Telegram channel when a new lecture is about to start. Members of the channel can easily register new lectures and view the existing ones. The project has been created primarily for our student Telegram group. 

## How to setup

After you've created a Telegram bot, you need a node js server. Clone this repo, install the dependencies, populate the fields in the `.env.example`, rename it to `.env` and build it using `npm run build`. The file referenced with the environment variable `LECTURESPATH` has to contain `[]` to be a valid JSON. Start the project using `npm run start`. The project should be up and running on port `3455`. You can set up a reverse proxy if you would like to use HTTPS.

You can also create a systemd service to run the bot. We provide an example systemd service file as `systemd.serice.example`.

## How to use

The bot supports the commands `/lectures` and `/register`. Use them for more information. 

## Contributing 

Feel free to open issues or fork the project. Contributions are always welcome. 
