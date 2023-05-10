import { useContext } from 'react';
import { HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi';
import Results from "../../components/CourseComponents/Results/Results";

import { ScheduleContext, ScheduleContextType } from "../../context/ScheduleContext";
import ICourse from "../../types/course.type";

const CoursePanel = (props: any) => {

    // const [schedule, setSchedule] = useState<ISchedule>( {activeCourses : active, tentativeCourses : tentative})
    // GET BOTH THE ACTIVE AND TENTATIVE COURSE LIST FROM THE DATABASE
    const { activeCourses, setActiveCourses, tentativeCourses, setTentativeCourses, calcActiveCredits } = useContext(ScheduleContext) as ScheduleContextType

    const activeToTentative = (course: ICourse) => {
        setTentativeCourses({ course: course, type: "add", unshift: true })
        setActiveCourses({ course: course, type: "remove" })
    }
    const tentativeToActive = (course: ICourse) => {
        setActiveCourses({ course: course, type: "add" })
        setTentativeCourses({ course: course, type: "remove" })
    }

    return (

        <div className={"side-panel left-panel"} >
            <div className={"side-panel-title-container"}>
                <div className={"side-panel-title"} >
                    Current Courses
                </div>
                <div className={"side-panel-title credits"}>{calcActiveCredits()} cr.</div>
            </div>
            {
                calcActiveCredits() === 0 &&
                (
                    <div className={"no-courses"}>
                        No courses! Add courses <a href={"/Search"}>here.</a>
                    </div>
                )
            }
            <Results
                response={activeCourses.courses}
                panel={true}
                onCourseClick={props.onCourseClick}
                switchAction={activeToTentative}
                button={<HiOutlineMinus />}
                schedule="active" />
            <div className={"side-panel-title-container"}>
                <div className={"side-panel-title"} >
                    Tentative Courses
                </div>
            </div>
            <Results
                response={tentativeCourses.courses}
                panel={true}
                onCourseClick={props.onCourseClick}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
                switchAction={tentativeToActive}
                button={<HiOutlinePlus />}
                schedule="tentative" />


        </div>
    )
}
export default CoursePanel