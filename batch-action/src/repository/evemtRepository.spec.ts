import { EventRepository, EventDataMapDummy } from './eventRepository';

describe('eventRepository', () => {
  let eventRepository: EventRepository;
  beforeAll(() => {
    eventRepository = new EventDataMapDummy();
  });
  it('should get all events', async () => {
    const events = await eventRepository.getAll();
    expect(events).toHaveLength(4);
  });
  it('should get all not started events', async () => {
    const events = await eventRepository.getAllNotStartedEvents();
    expect(events).toHaveLength(3);
  });
  it('should get all sorted not started events', async () => {
    const events = await eventRepository.getAllSortedNotStartedEvents();
    expect(events.getNextEvent()).toBeDefined();
    expect(events.getNextNextEvent()).toBeDefined();
  });
});
