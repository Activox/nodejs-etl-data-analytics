## Nodejs Sequelize RESTAPI MySQL For Customer Investment Analytics

This is a REST API using Javascript Technologies and MySQL to consume a XML and CSV File to calculate customers investments Analytics

- nodeJs
- express
- mysql
- sequelize
- mongoDb
- Docker

## How to run

### Requirements
- Docker installed

### Installation and execution
- Clone or Fork the project.

First go to ```.env``` file and change ```YOUR_API``` with your API from ```ANALYTIC_MYSQL_NAME```

Run ```docker-compose``` command.

* Building the containers: ```docker-compose build```

* Starting the services: ```docker-compose up -d```

* Stoping the services: ```docker-compose stop```

Components access and credentials
- MySQL (host: YOUR_IP, port: 3360, user: root, password: EtLTest2022, database:
analytics)
- phpMyAdmin (host: http://localhost:18081/, server: YOUR_IP, user: root,
password: EtLTest2022)
- MongoDB (host: YOUR_IP, port: 27071, user: root, password: EtLTest2022,
database: analytics)
- Mongo Express (host: http://localhost:18082/, no credentials needed)
- RabbitMQ (host: YOUR_IP, port: 5627, user: root, password: EtLTest2022)
- RabbitMQ Management (host: http://localhost:18083/, user: root, password:
EtLTest2022)

#### Note

If the NodeJS application throw an exception because is trying to connect to the MySQL service that is still initializing for the first time; in this case wait for MySQL to fully initialize first and then run the command `docker-compose restart $NAME_SERVICE` in another terminal to restart the crashed service.

Replace YOUR_IP with your computer’s private IP address. You may run into connectivity issues if you use 127.0.0.1 or localhost. The port numbers are customized to avoid conflicts, copy and paste them instead of writing them

### Testing ⚙️

For test use a simple Rest API Client and send a get to ```localhost:8000/analytics``` this will return all analytics by customer and investment.

You can also see this info in mongodb-express in ```http://localhost:18082/``` search for ```analytics``` database then ```customer_investment_analytics collection```

### Autores ✒️

* **Autor:** Paul G. Ottenwalder, paulguillermo19@gmail.com



