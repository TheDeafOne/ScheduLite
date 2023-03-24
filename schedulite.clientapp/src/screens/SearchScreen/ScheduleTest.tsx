import { Calendar, momentLocalizer } from 'react-big-calendar'
import events from "./events";
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";


const localizer = momentLocalizer(moment)
const MyCalendar = (props : any) => (
    <div style={{flexGrow: 1, height: 0, zIndex: 10}}>
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView="week"
            // views={{
            //     week: true
            // }}
            style={{
            }}
        />
    </div>
)
export default MyCalendar