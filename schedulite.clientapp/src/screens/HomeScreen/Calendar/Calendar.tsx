import moment from "moment";
import { useContext } from "react";
import { ScheduleContext, ScheduleContextType } from "../../../context/ScheduleContext";
import ICourse from "../../../types/course.type";
import "./Calendar.scss";

const Calendar = ({ tentativeCourseHover, setCalendarCourseHover, setViewCourse }: { tentativeCourseHover: ICourse | undefined, setCalendarCourseHover: Function, setViewCourse: Function }) => {
    // const [activeCourses, setActiveCourses] = useState<ICourse[]>(schedule.activeCourses)
    // const [objStringified, setObj] = useState(JSON.stringify(schedule.activeCourses))
    const { overlap, activeCourses } = useContext(ScheduleContext) as ScheduleContextType
    // console.log(schedule);
    // console.log(`HOVER COURSE: ${hoverCourse}`)
    const convertClassToEvent = (course: ICourse, hover: boolean) => {
        // console.log(course);
        let days = []
        const startDate = moment(course["startTime"], 'YYYY/MM/DD hh:mm')
        const endDate = moment(course["endTime"], 'YYYY/MM/DD hh:mm A')
        if (course.onMonday) {
            days.push("m")
        }
        if (course.onTuesday) {
            days.push("t")
        }
        if (course.onWednesday) {
            days.push("w")
        }
        if (course.onThursday) {
            days.push("r")
        }
        if (course.onFriday) {
            days.push("f")
        }
        const time = (endDate.hours() - startDate.hours()) * 60 + (endDate.minute() - startDate.minute())
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
            "courseTitle": course.courseTitle,
            "course": course,
            "hover": hover
        }
        return event
    }
    function convert(input: string) {
        return moment(input, 'HH:mm').format('h:mm');
    }

    const createEvents = () => {
        let events = []
        for (const course of activeCourses.courses) {
            const inSchedule = activeCourses.courses.some((e: ICourse) => (e.id === course.id))
            const actOverlap = inSchedule && activeCourses.courses.some((e: ICourse) => (e.id !== course.id
                && overlap(e, course)));
            // let tempCourse = course
            // tempCourse.overlap = actOverlap
            course.overlap = actOverlap
            events.push(convertClassToEvent(course, false));
        }
        if (tentativeCourseHover) {
            events.push(convertClassToEvent(tentativeCourseHover, true));
        }

        return events
    }
    const eventKeys = loadEvents(createEvents(), setCalendarCourseHover, setViewCourse)
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
    let times = ["", "8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30", "5:00", "5:30", "6:00", "6:30", "7:00", "7:30", "8:00", "8:30", "9:00"]
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
const Day = ({ dayOfWeek, eventKey }: { dayOfWeek: string, eventKey: any }) => {
    // console.log("changed")
    let slots = []
    let times = ["", "8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30", "5:00", "5:30", "6:00", "6:30", "7:00", "7:30"]
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
            slots.push(
                <div
                    className={`day-slot`}
                    id={`${times[i]} ${dayOfWeek}`}
                    key={`${times[i]} ${dayOfWeek}`}
                >
                    {eventKey[`${times[i]} ${dayOfWeek}`].reverse()}
                </div>
            )
        } else {
            slots.push(
                <div
                    className={"day-slot"}
                    id={`${times[i]} ${dayOfWeek}`}
                    key={`${times[i]} ${dayOfWeek}`}
                >
                </div>
            )
        }
        // }
    }
    return (
        <div className={"days"}>
            {slots}
        </div>
    )
}
function loadEvents(events: any, setCalendarCourseHover: Function, setViewCourse: Function) {
    // console.log(`events loaded: ${events}`)
    let key: any = {}

    // let events = [{"timeStart": "8:00", "timeEnd": "8:50", "days": ["m", "w", "f"], "length":50, "courseTitle":"Principles of Accounting 101" },
    //     {"timeStart": "4:00", "timeEnd": "5:15", "days": ["m", "w"], "length":75, "courseTitle":"Principles of Accounting 101" }]
    for (const event of events) {
        for (const day of event.days) {
            // console.log(`${event.timeStart} ${day}`)

            // key[`${event.timeStart} ${day}`] = `<!--<div class="calendar-course" style="height: ${courseHeight}px;">${event.courseTitle}</div>-->`
            key[`${event.timeStart} ${day}`] = key[`${event.timeStart} ${day}`] ? [<CalendarCourse event={event} setCalendarCourseHover={setCalendarCourseHover} setViewCourse={setViewCourse} />, ...key[`${event.timeStart} ${day}`]] : [<CalendarCourse event={event} setCalendarCourseHover={setCalendarCourseHover} setViewCourse={setViewCourse} />]
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
const CalendarCourse = (props: any) => {
    const courseHeight = props.event.length * 1.5
    let event = props.event
    const handleMouseEnter = () => {
        props.setCalendarCourseHover(event.course);
        props.setViewCourse(true);
    }
    const handleMouseLeave = () => {
        // props.hoverCourse = null;
        props.setCalendarCourseHover(undefined);
        // props.setViewCourse(false);
    }
    // console.log("FROM CALENDAR COURSE")
    return (
        // <MouseOverPopover course={event.course}>
        <div className={`calendar-course ${event.hover ? 'hover' : ''} ${event.course.overlap ? 'overlap' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ height: courseHeight }}>
            <div>
                {event.courseTitle}
            </div>
        </div>
        // </MouseOverPopover>

    )
}
export default Calendar