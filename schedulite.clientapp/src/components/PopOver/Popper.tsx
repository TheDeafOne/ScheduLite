import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import CourseCard from "../CourseComponents/CourseCard";
import Typography from "@mui/material/Typography";

export default function TransitionsPopper( props : any ) {

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;

    return (
        <div>
            {/*<button aria-describedby={id} type="button" onClick={handleClick}>*/}
            <Typography
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                {props.children}
            </Typography>
            {/*</button>*/}
            <Popper id={id} open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        {/*<Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>*/}
                            <CourseCard course={props.course} />
                        {/*</Box>*/}
                    </Fade>
                )}
            </Popper>
        </div>
    );
}