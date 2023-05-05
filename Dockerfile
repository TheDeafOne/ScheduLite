# Use the official maven/Java 8 image to create a build artifact.
# https://hub.docker.com/_/maven
FROM gradle:7.1.0-jdk11 AS builder

# Copy local code to the container image.
WORKDIR /schedulite/schedulite.webservice
COPY . ./

# Build a release artifact.
RUN gradle build

# build base image
# https://docs.docker.com/develop/develop-images/multistage-build/#use-multi-stage-builds
FROM amazoncorretto:11.0.18 AS runner

# set environment variables
ENV MONGO_DATABASE=${{secrets.MONGO_DATABASE}}
ENV MONGO_USER=${{secrets.MONGO_USER}}
ENV MONGO_PASSWORD=${{secrets.MONGO_PASSWORD}}
ENV MONGO_CLUSTER=${{secrets.MONGO_CLUSTER}}
ENV SPRING_SECURITY_USER=${{secrets.SPRING_SECURITY_USER}}
ENV SPRING_SECURITY_PASSWORD=${{secrets.SPRING_SECURITY_PASSWORD}}
ENV JAR_NAME=schedulite-0.0.1-SNAPSHOT.jar
ENV APP_HOME=/schedulite.webservice/


WORKDIR ${APP_HOME}
COPY --from=builder ${APP_HOME} .
EXPOSE 8080


# Run the web service on container startup.
CMD ["java", "-jar", "/schedulite.webservice/build/libs/schedulite-0.0.1-SNAPSHOT.jar"]