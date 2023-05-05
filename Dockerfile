# Use the official maven/Java 8 image to create a build artifact.
# https://hub.docker.com/_/maven
FROM gradle:7.1.0-jdk11 AS builder

# Copy local code to the container image.
WORKDIR /ScheduLite.webservice
COPY ./ScheduLite.webservice ./

RUN ls

# Build a release artifact.
WORKDIR /ScheduLite.webservice
RUN gradle build

# build base image
# https://docs.docker.com/develop/develop-images/multistage-build/#use-multi-stage-builds
FROM amazoncorretto:11.0.18 AS runner

# ARG MONGO_DATABASE
# ARG MONGO_USER
# ARG MONGO_PASSWORD
# ARG MONGO_CLUSTER
# ARG SPRING_SECURITY_USER
# ARG SPRING_SECURITY_PASSWORD

# # set environment variables
# ENV MONGO_DATABASE="${{secrets.MONGO_DATABASE}}"
# ENV MONGO_USER="${{secrets.MONGO_USER}}"
# ENV MONGO_PASSWORD="${{secrets.MONGO_PASSWORD}}"
# ENV MONGO_CLUSTER="${{secrets.MONGO_CLUSTER}}"
# ENV SPRING_SECURITY_USER="${{secrets.SPRING_SECURITY_USER}}"
# ENV SPRING_SECURITY_PASSWORD="${{secrets.SPRING_SECURITY_PASSWORD}}"
ENV JAR_NAME=schedulite-0.0.1-SNAPSHOT.jar
ENV APP_HOME=/ScheduLite.webservice/


WORKDIR ${APP_HOME}
COPY --from=builder ${APP_HOME} .
EXPOSE 8080


# Run the web service on container startup.
CMD ["java", "-jar", "/ScheduLite.webservice/build/libs/schedulite-0.0.1-SNAPSHOT.jar"]