
# About
![Logo](https://user-images.githubusercontent.com/60880102/174495365-6e490dcb-7f4d-4d41-a116-38604f59fe04.png)
<br/>
<br/>
Whapi is basically an API build on top of venom, a library for WhatsApp that contains methods to communicate with. The purpose of Whapi is use that methods through that API.



## Features

- Multiple instances
- Generate Base64 QR Code by request
- Send text
- Authorization with bearer token


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PRIVATE_KEY`



## Run Locally

Clone the project

```bash
  git clone https://github.com/bruno-pt/Whapi.git
```

Go to the project directory

```bash
  cd Whapi
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## API Reference

#### Create a new instance

```bash
  POST /api/instance
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Username for your instance. |
| `password` | `string` | **Required**. Password for your instance. |


#### Generate bearer token
*You need to have an instace created before.*

```bash
  POST /api/token
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | **Required**. Instances's username. |
| `password` | `string` | **Required**. Instances's password. |


#### Send a text to destinatary

```bash
  POST /api/send-text
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization` | `Bearer` | **Required**. Your generated bearer token. |

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `phone` | `string` | **Required**. Destinatary. |
| `text` | `string` | **Required**. Text to send. |


## Related

Main library that Whapi use

[orkestral/venom](https://github.com/orkestral/venom)

