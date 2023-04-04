## About This Project
Schedulite is an online, open-source course scheduler. \ Our goal is to provide easy access to high quality course scheduling software, to any student anywhere. 
## Installation
This repository is a [monorepo](https://en.wikipedia.org/wiki/Monorepo), meaning it contains multiple projects (two in our case). These are the frontend and backend to ScheduLite. We do this for ease of use and maintanence – at the cost of a more involved installation process.\
Our tech stack consists of the following languages, tools, and frameworks:
### Front End
* React
* Node.js
* TypeScript
* npm
### Back End
* SpringBoot
* Java
* Gradle

For a more more involved tutorial on installation and getting started, navigate to [INSTALL.md](INSTALL.md)

## Usage
The largest aspiration when building this project has been ease of use. Making a course schedule is difficult, especially for new students. Because of this, we have three main pages:
1. __Course Search Page__ \
This page is (metaphorically) the center of our app. It is vital that a user is able to dynamically search for courses however they like, whether that be with a custom search query, or the numerous filters we provide. \
Additionally, we provide the ability to add a given course to a pair of lists we call the active and tentative courses. Active courses is the set of courses that the user feasibly wants to take in the future. Tentative courses are courses that user is not sure about, but might want to consider applying to the schedule later on.
2. __Schedule Managment Page__
This part of the app is where the user can view the active courses in a calender format. It also allows them to move active courses to tentative, and vice versa. Finally, once the user is happy with the adjustments they've made to their schedule, they can save it.
3. __Schedule Selection Page__
This page is where the user selects a schedule from their list of previously created schedules. Additionally, they can make a new schedule.