import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiListPlus } from "react-icons/bi";
import Results from "../../components/CourseComponents/Results/Results";
import { ScheduleContext, ScheduleContextType } from "../../context/ScheduleContext";
import AddToActiveButton from "../../styles/globals/AddToActiveButton";
import AddToTentativeButton from "../../styles/globals/AddToTentativeButton";
import ICourse from "../../types/course.type";

const CoursePanel = (props: any) => {
    const navigate = useNavigate();
    // const [schedule, setSchedule] = useState<ISchedule>( {activeCourses : active, tentativeCourses : tentative})
    // GET BOTH THE ACTIVE AND TENTATIVE COURSE LIST FROM THE DATABASE
    const { name, activeCourses, setActiveCourses, tentativeCourses, setTentativeCourses, calcActiveCredits, calcTentativeCredits } = useContext(ScheduleContext) as ScheduleContextType

    const activeToTentative = (course: ICourse) => {
        setTentativeCourses({ course: course, type: "add", unshift: true })
        setActiveCourses({ course: course, type: "remove" })
    }
    const tentativeToActive = (course: ICourse) => {
        setActiveCourses({ course: course, type: "add" })
        setTentativeCourses({ course: course, type: "remove" })
    }

    return (

        <div className={"side-panel left-panel"}>
            <div className={"side-panel-title-container"}>
                <div className={"side-panel-title"}>
                    Current Courses
                </div>
                <div className={"side-panel-title credits"}>{calcActiveCredits()} cr.</div>
            </div>

            {
                calcActiveCredits() === 0 && (
                    name === "" ?
                        (
                            <div className={"no-courses"}>
                                No Schedule! Add Schedule <div className="auth-link" onClick={() => {navigate("/ScheduleSelection")}}>here.</div>
                            </div>
                        )
                        :
                        (
                            <div className={"no-courses"}>
                                No courses! Add courses <a href={"/Search"}>here.</a>
                            </div>
                        )
                )
            }
            <Results
                response={activeCourses.courses}
                panel={true}
                onCourseClick={props.onCourseClick}
                switchAction={activeToTentative}
                button={<AddToTentativeButton/>}
                schedule="active"/>
            <div className={"side-panel-title-container"}>
                <div className={"side-panel-title"}>
                    Tentative Courses
                </div>
            </div>
            {
                calcTentativeCredits() === 0 && (
                    <div className={"no-courses"}>
                        Tentative courses are courses that you want to possibly include in schedule, or keep in the background.
                        These courses can be added from the search page with the <BiListPlus /> button. <br /><br /> Courses can also
                        be added to tentative by removing them from the active schedule with the <AddToTentativeButton /> button.
                    </div>
                )
            }
            <Results
                response={tentativeCourses.courses}
                panel={true}
                onCourseClick={props.onCourseClick}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
                switchAction={tentativeToActive}
                button={<AddToActiveButton/>}
                schedule="tentative"/>


        </div>
    );
}
export default CoursePanel