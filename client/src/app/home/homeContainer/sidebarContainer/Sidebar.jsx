import React from 'react'
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import { NavLink } from 'react-router-dom'
import "./sidebar.scss"

function Sidebar({ classes, open, theme, handleDrawerClose }) {
    return (
        <div>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })
                }}
                open={open}
            >
                <div className="sidebar-toolbar">
                    <PersonOutlinedIcon />
                    <span>
                        User Dashboard
                    </span>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtl" ? (
                            <ChevronRightIcon />
                        ) : (
                                <ChevronLeftIcon />
                            )}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {["Inbox", "Starred", "Send email", "Drafts"].map((item, index) => (
                        <NavLink to={item} className="sidebar-link" activeClassName="sidebar-link-active" key={index}>
                            <ListItem button >
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={item} />
                            </ListItem>
                        </NavLink>
                    ))}
                </List>
            </Drawer>
        </div>
    )
}

export default Sidebar
