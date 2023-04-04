import "../../styles/Calendar.css"
import {useContext, useEffect, useState} from "react";
import ICourse from "../../types/course.type";
import course from "../../components/CourseComponents/Course";
import moment from "moment";
import ISchedule from "../../types/schedule.type";
import useDeepCompareEffect from 'use-deep-compare-effect';
import {hover} from "@testing-library/user-event/dist/hover";
import {ScheduleContext, ScheduleContextType} from "../../context/ScheduleContext";

const Calendar = ({ schedule, hoverCourse } : {schedule : ISchedule, hoverCourse: ICourse | undefined}) => {
    // const [activeCourses, setActiveCourses] = useState<ICourse[]>(schedule.activeCourses)
    // const [objStringified, setObj] = useState(JSON.stringify(schedule.activeCourses))
    const { activeCourses } = useContext(ScheduleContext) as ScheduleContextType

    // console.log(schedule);
    // console.log(`HOVER COURSE: ${hoverCourse}`)
    const convertClassToEvent = (course : ICourse) => {
        // console.log(course);
        let days = []
        const startDate = moment(course["start_time"], 'DD/MM/YYYY hh:mm')
        const endDate = moment(course["end_time"], 'DD/MM/YYYY hh:mm A')
        if (course.on_monday) {
            days.push("m")
        }
        if (course.on_tuesday) {
            days.push("t")
        }
        if (course.on_wednesday) {
            days.push("w")
        }
        if (course.on_thursday) {
            days.push("r")
        }
        if (course.on_friday) {
            days.push("f")
        }
        // console.log(endDate)
        // console.log(days)
        const time = (endDate.hours() - startDate.hours())*60 + (endDate.minute() - startDate.minute())
        // console.log(time)
        // console.log(myMomentObject.hours())
        // console.log(myMomentObject.minute())
        // console.log(Date.parse(course["start_time"]))
        let timeStart = convert(`${startDate.hours()}:${startDate.minute()}`)
        let timeEnd = convert(`${endDate.hours()}:${endDate.minute()}`)

        if (startDate.minute() === 5) {
            timeStart = convert(`${startDate.hours()}:00`)
        }
        const event = {
            "timeStart": timeStart,
            "timeEnd": timeEnd,
            "days": days,
            "length": time,
            "courseTitle": course.course_title,
            "course": course
        }
        return event
    }
    function convert(input : string) {
        return moment(input, 'HH:mm').format('h:mm');
    }
    // console.log(`PROPS ACTIVE: ${schedule.activeCourses}`)
    const overLap = (course1 : ICourse, course2: ICourse) => {
        const startDate1 = moment(course1["start_time"], 'DD/MM/YYYY hh:mm')
        const endDate1 = moment(course1["end_time"], 'DD/MM/YYYY hh:mm A')
        const startDate2 = moment(course2["start_time"], 'DD/MM/YYYY hh:mm')
        const endDate2 = moment(course2["end_time"], 'DD/MM/YYYY hh:mm A')

        const daysSame = (course1.on_monday && course1.on_monday === course2.on_monday)
            || (course1.on_tuesday && course1.on_tuesday === course2.on_tuesday)
            || (course1.on_wednesday && course1.on_wednesday === course2.on_wednesday)
            || (course1.on_thursday && course1.on_thursday === course2.on_thursday)
            || (course1.on_friday && course1.on_friday === course2.on_friday)

        return (startDate1.isBefore(endDate2) && startDate2.isBefore(endDate1) && daysSame)
    }
    const createEvents = () => {
        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const year = day * 365;
        let events = []
        for (const course of activeCourses.courses) {
            const inSchedule = activeCourses.courses.some((e : ICourse) => (e.id === course.id))
            const actOverlap = inSchedule && activeCourses.courses.some((e : ICourse) => (e.id !== course.id
                && overLap(e, course)));
            let tempCourse = course
            tempCourse.overlap = actOverlap
            events.push(convertClassToEvent(course));
        }
        if (hoverCourse) {
            events.push(convertClassToEvent(hoverCourse));

        }

        return events
    }
    const eventKeys = loadEvents(createEvents())
    // useDeepCompareEffect(() => {

        // Update the document title using the browser API
        // document.title = `You clicked ${count} times`;
        // loadEvents(events)
    // }, [activeSchedule]);
    return (
        <div className={"calendar-container"}>
            <div className={"calendar-times"}>
                <div className={"times-header"}>invis</div>
                <div className={"course-times"}><Times /></div>
            </div>
            <div className={"calendar-days"}>
                <div className={"calendar-header"}>
                    <div className={"weekday-header"}>Monday</div>
                    <div className={"weekday-header"}>Tuesday</div>
                    <div className={"weekday-header"}>Wednesday</div>
                    <div className={"weekday-header"}>Thursday</div>
                    <div className={"weekday-header"}>Friday</div>
                </div>
                <div className={"calendar-body"}>
                    <div className={"weekday"} id={"M"}><Day dayOfWeek={"m"} eventKey={eventKeys} /></div>
                    <div className={"weekday"} id={"T"}><Day dayOfWeek={"t"} eventKey={eventKeys} /></div>
                    <div className={"weekday"} id={"W"}><Day dayOfWeek={"w"} eventKey={eventKeys} /></div>
                    <div className={"weekday"} id={"E"}><Day dayOfWeek={"r"} eventKey={eventKeys} /></div>
                    <div className={"weekday"} id={"F"}><Day dayOfWeek={"f"} eventKey={eventKeys} /></div>
                </div>
            </div>
        </div>
    )
}
const Times = () => {
    let times = ["", "8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30", "5:00" ,"5:30", "6:00", "6:30", "7:00", "7:30"]
    let slots = []
    for (let i = 0; i < 24; i++) {
        slots.push(<div className={"time-slot"} id={i.toString()} key={times[i]}>
            <div className={""}>{times[i]}</div>
        </div>)
    }
    return (
        <div>
            {slots}
        </div>
    )
}
const Day = ({dayOfWeek, eventKey}: {dayOfWeek: string, eventKey: any}) => {
    // console.log("changed")
    let slots = []
    let times = ["", "8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30", "5:00" ,"5:30", "6:00", "6:30", "7:00", "7:30"]
    // let events = [{"timeStart": "8:00", "timeEnd": "8:50", "days": ["m", "w", "f"], "length":50, "courseTitle":"Principles of Accounting 101" },
    //     {"timeStart": "4:00", "timeEnd": "5:15", "days": ["m", "w"], "length":75, "courseTitle":"Principles of Accounting 101" }]
    for (let i = 0; i < 24; i++) {
        // if (i === times.indexOf(events[1].timeStart) && events[1].days.includes(dayOfWeek)) {
        //     const courseHeight = events[1].length * 2
        //     slots.push(<div className={"day-slot"} id={`${times[i]} ${dayOfWeek}`} key={`${times[i]} ${dayOfWeek}`}>
        //         <div className={"calendar-course"} style={{height: courseHeight}}>{events[1].courseTitle}</div>
        //     </div>)
        //
        // } else {
        if (eventKey[`${times[i]} ${dayOfWeek}`]) {
            slots.push(<div className={`day-slot`} id={`${times[i]} ${dayOfWeek}`} key={`${times[i]} ${dayOfWeek}`}>{eventKey[`${times[i]} ${dayOfWeek}`][0]}</div>)
        } else {
            slots.push(<div className={"day-slot"} id={`${times[i]} ${dayOfWeek}`} key={`${times[i]} ${dayOfWeek}`}></div>)
        }
        // }
    }
    return (
        <div>
            {slots}
        </div>
    )
}
function loadEvents(events : any) {
    // console.log(`events loaded: ${events}`)
    let key: any = {}

    // let events = [{"timeStart": "8:00", "timeEnd": "8:50", "days": ["m", "w", "f"], "length":50, "courseTitle":"Principles of Accounting 101" },
    //     {"timeStart": "4:00", "timeEnd": "5:15", "days": ["m", "w"], "length":75, "courseTitle":"Principles of Accounting 101" }]
    for (const event of events) {
        for (const day of event.days) {
            // console.log(`${event.timeStart} ${day}`)

            // key[`${event.timeStart} ${day}`] = `<!--<div class="calendar-course" style="height: ${courseHeight}px;">${event.courseTitle}</div>-->`
            key[`${event.timeStart} ${day}`] = key[`${event.timeStart} ${day}`] ? [<CalendarCourse event={event} />, ...key[`${event.timeStart} ${day}`]] : [<CalendarCourse event={event} />]
            // console.log(key)
            // const slot = document.getElementById(`${event.timeStart} ${day}`)
            // if (slot) {
            //     slot.innerHTML = `<div class="calendar-course" style="height: ${courseHeight}px;">${event.courseTitle}</div>`
            // }
        }
    }
    // console.log(key);
    return key
}
const CalendarCourse = (props : any) => {
    const courseHeight = props.event.length * 1.5
    let event = props.event
    // console.log("FROM CALENDAR COURSE")
    // console.log(event)
    return (
        <div className={`calendar-course ${event.course.overlap ? 'overlap' : ''}`} style={{height: courseHeight}}>
            <div>
                {event.courseTitle}
            </div>
            <div>
                {event.timeStart} - {event.timeEnd}
            </div>
        </div>
    )
}
export default Calendar