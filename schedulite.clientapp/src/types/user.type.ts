import ISchedule from "./schedule.type"

export default interface IUser {
    id?: any | null,
    username?: string | null,
    email?: string,
    password?: string,
    roles?: Array<string>
    schedules?: Array<ISchedule>
}