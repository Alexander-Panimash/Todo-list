import moment, { Moment } from 'moment';
import React from 'react';
import { ITask } from '../components/common/models/ITask';
import { TimeFilters } from '../enum/TimeFilters.enum';

class DateFilterService extends React.Component {

  public filterTasks(filterName: string, tasks: ITask[]) {
    const startFilterDate: Moment = moment().startOf('day');
    const endFilterDate: Moment = DateFilterService.getEndFilterDate(filterName);
    return filterName === TimeFilters.all
      ? tasks
      : tasks.filter((task) => moment(task.date).isBetween(startFilterDate, endFilterDate));
  }

  private static getEndFilterDate(filterName: string): Moment {
    switch (filterName) {
      case TimeFilters.tomorrow:
        return moment().endOf('day').add(1, 'days');
      case TimeFilters.next7days:
        return moment().endOf('day').add(7, 'days');
      case TimeFilters.next30days:
        return moment().endOf('day').add(30, 'days');
      case TimeFilters.today:
      default:
        return moment().endOf('day');
    }
  }

}

export const dateFilterService = new DateFilterService({});
