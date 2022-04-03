import { EventRepository, EventDataMapDummy } from './eventRepository';
import MockDate from 'mockdate';

describe('eventRepository', () => {
  let eventRepository: EventRepository;
  beforeAll(() => {
    MockDate.set('2022-01-23T00:00:00.000Z');
    eventRepository = new EventDataMapDummy();
  });
  it('should get all events', async () => {
    const events = await eventRepository.getAll();
    expect(events).toHaveLength(10);
  });
  it('should get all not started events', async () => {
    const events = await eventRepository.getAllNotStartedEvents();
    expect(events).toHaveLength(9);
  });
  it('should get all sorted not started events', async () => {
    const events = await eventRepository.getAllSortedNotStartedEvents();
    expect(events.getNextEvent()).toBeDefined();
    expect(events.getNextNextEvent()).toBeDefined();
  });
});
