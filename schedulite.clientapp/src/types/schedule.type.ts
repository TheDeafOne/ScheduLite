import ICourse from "./course.type";

export default interface ISchedule {
    activeCourses: ICourse[]
    tentativeCourses: ICourse[]
}