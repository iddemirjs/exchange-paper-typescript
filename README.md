# Typescript AppExchange

Project Definition: Exchange is an arbitrarily trading game developed by a startup in a very short span of time called “Super
Traders” . The purpose of the application is to educate users on the terminology used in trading of shares.

# Requirements

* Docker
* NPM
* Sequelize
* JWT
* Express
* Bcrypt
* Nodemon

## installation
```
$ docker-compose up
```
```
$ npm run dev
```

## API Documents

https://documenter.getpostman.com/view/4020808/2s9YXfcivT

## todo list

|macro|description|status|
|-|-|:-:|
|`User Roles`|Not every customer should be able to add paper and change rank|:ok_hand:|
|`Pre-test and Append-test`|Some append and pre tests should be added on Postman collection|:ok_hand:|
|`Postman API Environments`|API Postman Environments variable should be created.|:ok_hand:|
|`getting terminal arguments`|Bulk creator function should be connect to npm cli|:hourglass:|
|`User Roles`|User roles should be customized|:hourglass:|
|`trades should be manage a stream broker`|all transactions should be manage with a message broker. (Ex. Kafka, RabbitMQ)|:hourglass:|
|`User Balance, UserPaper Quantities`|With using message broker, these column should be add and manage|:hourglass:|
