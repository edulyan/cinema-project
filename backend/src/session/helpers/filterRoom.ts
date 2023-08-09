import { Schedule } from '../../schedule/entity/schedule.entity';
import { Room } from '../../room/entity/room.entity';
import { Session } from '../entity/session.entity';

export function findAvailableRooms(
  schedule: Schedule,
  startTime: Date,
): Room[] {
  const availableRooms = schedule.cinema.rooms.filter((room: Room) => {
    return filtering(schedule, room.sessions, startTime);
  });

  if (availableRooms.length === 0) {
    return;
  }

  return availableRooms;
}

function filtering(
  schedule: Schedule,
  session: Session[],
  startTime: Date,
): boolean {
  if (session.length === 0) {
    return true;
  }

  const nextDay = new Date(schedule.date.getTime() + 1000 * 60 * 1800);

  nextDay.setUTCHours(1, 0, 0, 0);

  if (session[session.length - 1].endTime < startTime && startTime < nextDay) {
    return true;
  }

  return false;
}
