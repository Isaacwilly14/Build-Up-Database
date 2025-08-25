Backend

1\. Getting Started

Prerequisites

Java 17 or higher



Maven 3.6+



A relational database (e.g., MySQL, PostgreSQL, H2)



Setup

Clone the repository:



Bash



git clone https://github.com/your-username/your-repo-name.git

cd crop\_build\_up\_erp

Configure your database in src/main/resources/application.properties. Update the following properties with your database credentials:



Properties



spring.datasource.url=jdbc:mysql://localhost:3306/your\_database\_name

spring.datasource.username=your\_username

spring.datasource.password=your\_password

spring.jpa.hibernate.ddl-auto=update

Build the project using Maven:



Bash



mvn clean install

Run the application:



Bash



mvn spring-boot:run

The application will start on http://localhost:8080.



2\. API Endpoints

The backend exposes several REST API endpoints for managing greenhouse data, sticking plans, and user authentication. All endpoints are prefixed with /api.



Authentication

Register User



Endpoint: POST /api/auth/register



Request Body:



JSON



{

&nbsp; "username": "Elisha",

&nbsp; "password": "123456"

}

Login User



Endpoint: POST /api/auth/login



Request Body:



JSON



{

&nbsp; "username": "yourusername",

&nbsp; "password": "yourpassword"

}

Note: This endpoint will return a JWT token upon successful authentication, which should be included in the Authorization header of subsequent requests.



Greenhouse Management

Get All Greenhouses



Endpoint: GET /api/greenhouses



Response: A list of greenhouse objects.



Sticking Plans

Create Sticking Plan



Endpoint: POST /api/sticking-plans



Request Body:



JSON



{

&nbsp; "greenhouse": "Greenhouse A",

&nbsp; "varietyCode": "VAR-123",

&nbsp; "pStickingWeek": 25,

&nbsp; "urcQuantity": 5000.0

}

Get All Sticking Plans



Endpoint: GET /api/sticking-plans



Response: A list of sticking plan objects.

