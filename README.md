<div align="center">
<h1>Valex</h1>
</div>

# Description

Using Typescript to make a system example on how to create benefit cards for employees.

<div align="center">

  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
</div>

## Features:

- Create a Card.
- Activate a Card.
- Block/Unblock a Card.
- Recharge a Card.
- Make a purchase.
- Get balance and transactions.

# References

### Create a card

Here is where a company create a card for their employees, getting the mployee ID and the type of card that is going to be created, and giving the api key from company.

```http
POST /card/create
```

#### Request:

| Body         | Type      | Description                        |
| :----------- | :-------- | :--------------------------------- |
| `employeeId` | `integer` | **Required**. User Id              |
| `cardType`   | `string`  | **Required**. Type of card benefit |

`Valid types: [groceries, restaurant, transport, education, health]`

####

| Headers     | Type     | Description                         |
| :---------- | :------- | :---------------------------------- |
| `x-api-key` | `string` | **Required**. API key, from company |

####

</br>

#### Response:

Security code number.

#

### Activate a card

This route works to activate your card, which means you can create a password, with an maximum length of 4 numbers.

```http
PUT "/card/activate/:cardId"
```

#### Request:

| Body           | Type     | Description                      |
| :------------- | :------- | :------------------------------- |
| `password`     | `string` | **Required**. Card password      |
| `securityCode` | `string` | **Required**. Card security code |

| Params   | Type      | Description           |
| :------- | :-------- | :-------------------- |
| `cardId` | `integer` | **Required**. card Id |

`Password length: 4`

`Password pattern: only numbers`

`Security code max length: 3`

#

### Block a card

Here is where you can block or unblock your card, this route is for the employees, and dependes on current status from the card. On the route you have to put the card ID.

```http
PUT /card/block/:cardId
```

#### Request:

| Body       | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `password` | `string` | **Required**. Card password |

| Params   | Type      | Description           |
| :------- | :-------- | :-------------------- |
| `cardId` | `integer` | **Required**. card Id |

#

### Recharge a card

Here is where you put credit on your card. This route is for the company to recharge the cards. The amount is how much you'll recharge.

```http
POST /recharges/:cardId
```

#### Request:

| Headers     | Type     | Description                         |
| :---------- | :------- | :---------------------------------- |
| `x-api-key` | `string` | **Required**. API key, from company |

####

| Body     | Type      | Description                   |
| :------- | :-------- | :---------------------------- |
| `amount` | `integer` | **Required**. Recharge amount |

| Params   | Type      | Description           |
| :------- | :-------- | :-------------------- |
| `cardId` | `integer` | **Required**. card Id |

#

### Payment

Here is where a purchase is made, you have to inform the card ID and where you're buying, the card and the business must have the same type.

```http
POST /payment
```

#### Request:

| Body         | Type      | Description                  |
| :----------- | :-------- | :--------------------------- |
| `cardId`     | `integer` | **Required**. Card ID        |
| `password`   | `string`  | **Required**. Card password  |
| `businessId` | `integer` | **Required**. Business ID    |
| `amount`     | `integer` | **Required**. Payment amount |

### Get balance and Transaction

```http
GET /card/transaction/:cardId
```

#### Request:

| Params   | Type      | Description           |
| :------- | :-------- | :-------------------- |
| `cardId` | `integer` | **Required**. Card ID |

#
