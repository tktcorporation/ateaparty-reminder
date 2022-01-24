import { EventRepository } from './eventRepository';

describe('eventRepository', () => {
  it('should get all events', async () => {
    const eventRepository = new EventRepository();
    const events = await eventRepository.getAll();
    expect(events).toHaveLength(4);
  });
  it('should get all not started events', async () => {
    const eventRepository = new EventRepository();
    const events = await eventRepository.getAllNotStartedEvents();
    expect(events).toHaveLength(3);
  });
  it('should get all sorted not started events', async () => {
    const eventRepository = new EventRepository();
    const events = await eventRepository.getAllSortedNotStartedEvents();
    expect(events.getNextEvent()).toBeDefined();
    expect(events.getNextNextEvent()).toBeDefined();
  });
});
