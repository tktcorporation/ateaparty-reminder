import { Event } from '../domain/reminder';
import { DiscordMember } from '../domain/member';

export class EventRepository {
  getAll = async (): Promise<Event[]> => {
    const events: Event[] = [
      new Event(
        new DiscordMember('502486808211357707'),
        new Date(2020, 1, 1, 10, 0, 0),
      ),
      new Event(
        new DiscordMember('798137406946934784'),
        new Date(2020, 1, 1, 11, 0, 0),
      ),
    ];
    return events;
  };
}
