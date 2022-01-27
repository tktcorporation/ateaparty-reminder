import { Event, NotStartedEvent } from '../domain/reminder';
import { DiscordMember } from '../domain/member';
import { Staff } from '../domain/reminder';
import { SortedNotStartedEvents } from '../domain/reminder';
import { EventDataSource } from 'src/infrastructure/eventDataSource';

const tkt = new Staff(new DiscordMember('502486808211357707'));
const shabeko = new Staff(new DiscordMember('798137406946934784'));
const anoko = new Staff(new DiscordMember('599187907705700363'));
const konadd = new Staff(new DiscordMember('526574190858338314'));
const kaiz = new Staff(new DiscordMember('600276691708805133'));

export interface EventRepository {
  getAll(): Promise<Event[]>;
  getAllNotStartedEvents(): Promise<NotStartedEvent[]>;
  getAllSortedNotStartedEvents(): Promise<SortedNotStartedEvents>;
}

export class EventDataMapDummy implements EventRepository {
  getAll = async (): Promise<Event[]> => {
    return [
      new Event(anoko, [], new Date(2022, 0, 23, 0, 0)),
      new Event(konadd, [anoko, kaiz], new Date(2022, 0, 30, 0, 0)),
      new Event(konadd, [anoko, kaiz], new Date(2022, 1, 6, 0, 0)),
      new Event(konadd, [anoko, kaiz], new Date(2022, 1, 13, 0, 0)),
    ];
  };
  getAllNotStartedEvents = async (): Promise<NotStartedEvent[]> => {
    const events = await this.getAll();
    return events.filter(
      (event) => event.date.getTime() > new Date().getTime(),
    );
  };
  getAllSortedNotStartedEvents = async (): Promise<SortedNotStartedEvents> => {
    const events: NotStartedEvent[] = await this.getAllNotStartedEvents();

    return new SortedNotStartedEvents(
      events.sort((a, b) => a.date.getTime() - b.date.getTime()),
    );
  };
}

export class EventDataMap implements EventRepository {
  constructor(private readonly dataSource: EventDataSource) {}
  getAll = async (): Promise<Event[]> => {
    const events = await this.dataSource.queryAllEvents();
    return events.map((event) => {
      const staff = new Staff(
        new DiscordMember(event.staff.user.discord_id),
      );
      const sub: Staff[] = event.event_sub_staffs.map(
        (eventSubStaff) =>
          new Staff(new DiscordMember(eventSubStaff.staff.user.discord_id)),
      );
      return new Event(staff, sub, new Date(event.datetime));
    });
  }
  getAllNotStartedEvents = async (): Promise<NotStartedEvent[]> => {
    const events = await this.getAll();
    return events.filter(
      (event) => event.date.getTime() > new Date().getTime(),
    );
  }
  getAllSortedNotStartedEvents = async (): Promise<SortedNotStartedEvents> => {
    const events: NotStartedEvent[] = await this.getAllNotStartedEvents();
    return new SortedNotStartedEvents(
      events.sort((a, b) => a.date.getTime() - b.date.getTime()),
    );
  }
}