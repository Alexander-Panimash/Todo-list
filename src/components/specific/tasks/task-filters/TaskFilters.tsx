import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DateRangeIcon from '@material-ui/icons/DateRange';
import EventIcon from '@material-ui/icons/Event';
import EventNoteIcon from '@material-ui/icons/EventNote';
import TodayIcon from '@material-ui/icons/Today';
import React, { useState } from 'react';
import { TimeFilters } from '../../../../enum/TimeFilters.enum';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      backgroundColor: 'red'
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3)
    }
  })
);

export interface ITaskFiltersProps {
  filterTasks: (filterName: string) => void
}

export const TaskFilters = (props: ITaskFiltersProps) => {
  const classes = useStyles();
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  const dateFilterTabs = [
    {
      name: TimeFilters.today,
      icon: <TodayIcon/>
    },
    {
      name: TimeFilters.tomorrow,
      icon: <EventIcon/>
    },
    {
      name: TimeFilters.next7days,
      icon: <DateRangeIcon/>
    },
    {
      name: TimeFilters.next30days,
      icon: <DateRangeIcon/>
    },
    {
      name: TimeFilters.all,
      icon: <EventNoteIcon/>
    }
  ];

  const selectFilter = (filterName: string) => {
    setSelectedFilter(filterName);
    props.filterTasks(filterName);
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <div className={classes.toolbar}/>
        <List>
          {dateFilterTabs.map((dateFilterTab) => (
            <ListItem selected={selectedFilter === dateFilterTab.name}
                      button key={dateFilterTab.name}
                      onClick={() => selectFilter(dateFilterTab.name)}>
              <ListItemIcon> {dateFilterTab.icon} </ListItemIcon>
              <ListItemText primary={dateFilterTab.name}/>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};