import { Schedule } from '../../schedule/entity/schedule.entity';
import { Session } from '../entity/session.entity';

export function setStartTimeDefault(schedule: Schedule): Date {
  if (schedule.sessions.length === 0) {
    const oldDate = new Date(`${schedule.date}`);
    return new Date(oldDate.getTime() + 1000 * 60 * 600);
  }

  const last: Session = schedule.sessions[schedule.sessions.length - 1];
  const oldDate = new Date(`${last.endTime}`);

  const cleanTime: number = 20;

  return new Date(oldDate.getTime() + 1000 * 60 * cleanTime);
}

export function setEndTime(schedule: Schedule, startTime: Date): Date {
  const advertiseTime = 20;
  return new Date(
    startTime.getTime() + 1000 * 60 * (advertiseTime + schedule.movie.duration),
  );
}
