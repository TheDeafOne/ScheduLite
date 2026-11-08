# Running ScheduLite locally

ScheduLite has a React client and a Spring Boot web service. Run both, with a MongoDB database available to the web service.

Use **Node.js 18.15.0, npm 9.5.0, and Java 11**. The included Gradle wrapper downloads Gradle 7.6.1 and the backend dependencies.

Configure a MongoDB database and load the catalog you want to use before starting the applications.

## 1. Get the project

```sh
git clone https://github.com/TheDeafOne/ScheduLite.git
cd ScheduLite
```

## 2. Configure MongoDB

Create a database and database user in [MongoDB Atlas](https://www.mongodb.com/atlas). Allow the development machine to connect through the cluster's network settings.

Copy the environment template from the repository root into the web-service directory:

```sh
cp .env.template ScheduLite.webservice/.env
```

On Windows, copy the file with your editor or use `Copy-Item .env.template ScheduLite.webservice/.env` in PowerShell.

Fill in the six entries in that file:

| Variable | Value |
| --- | --- |
| `MONGO_DATABASE` | Your database name |
| `MONGO_USER` | The cluster's database username |
| `MONGO_PASSWORD` | That user's password, URI-encoded if it contains reserved URI characters |
| `MONGO_CLUSTER` | The host portion of the Atlas connection string, such as `cluster0.example.mongodb.net` |
| `SPRING_SECURITY_USER` | A development Spring Security username |
| `SPRING_SECURITY_PASSWORD` | Its password |

The web service constructs its `mongodb+srv` URI from these values. The last two entries are server configuration; student accounts are created through the application's sign-up flow.

### Database contents

The application uses `courses`, `roles`, and `users` collections. Add the roles and catalog data as described below.

Before using sign-up, add the role records expected by [AuthController](ScheduLite.webservice/src/main/java/com/schedulite/schedulite/controllers/AuthController.java). In `mongosh`, connected to your own database, run:

```javascript
db.roles.updateOne({ name: "ROLE_USER" }, { $setOnInsert: { name: "ROLE_USER" } }, { upsert: true });
db.roles.updateOne({ name: "ROLE_MODERATOR" }, { $setOnInsert: { name: "ROLE_MODERATOR" } }, { upsert: true });
db.roles.updateOne({ name: "ROLE_ADMIN" }, { $setOnInsert: { name: "ROLE_ADMIN" } }, { upsert: true });
```

Load your catalog into `courses` using the field names in [Course.java](ScheduLite.webservice/src/main/java/com/schedulite/schedulite/models/Course.java). The model includes term, course/section identifiers, instructor, credits, location, weekday flags, and start/end times. The existing client parses times with `YYYY/MM/DD h:mm:ss`; the API filters weekdays using string values such as `"True"`. Match those conventions when preparing data.

Free-text catalog search uses MongoDB text queries. Create a text index if the imported collection does not already have one:

```javascript
db.courses.createIndex({
  courseTitle: "text",
  coursePrefix: "text",
  courseNumber: "text",
  firstName: "text",
  lastName: "text"
});
```

The term selectors list Spring/Fall and years 2018–2020. Use matching terms when loading a catalog for these selectors.

## 3. Point the client at the local API

In the [Axios configuration](schedulite.clientapp/src/api/axios-config.ts), set `baseURL` to your local API:

```typescript
baseURL: 'http://localhost:8080/api/v1',
```

If you change the web-service port with `PORT`, use that same port here.

## 4. Start the backend

From the repository root:

```sh
cd ScheduLite.webservice
sh ./gradlew bootRun
```

On Windows, use `.\gradlew.bat bootRun`. Make sure `JAVA_HOME` points to Java 11. The wrapper downloads Gradle and the Java dependencies on its first run.

The API listens on [http://localhost:8080/api/v1](http://localhost:8080/api/v1) unless `PORT` is set. You can also run `ScheduliteApplication` from a Java IDE, with `ScheduLite.webservice` as the working directory so the `.env` file is found.

## 5. Start the frontend

In a second terminal, from the repository root:

```sh
cd schedulite.clientapp
npm ci
npm start
```

Open [http://localhost:3000](http://localhost:3000). Sign up, create a named schedule for a term in your catalog, search for courses, and add active and tentative choices.

`npm run build`, from `schedulite.clientapp`, creates the client production build. The API and database still need to be running separately.
