import { EventRepository } from './eventRepository';
import MockDate from 'mockdate';

describe('eventRepository', () => {
  it('should get all events', async () => {
    const eventRepository = new EventRepository();
    const events = await eventRepository.getAll();
    expect(events).toHaveLength(10);
  });
  it('should get all not started events', async () => {
    MockDate.set('2022-01-23T00:00:00.000Z');
    const eventRepository = new EventRepository();
    const events = await eventRepository.getAllNotStartedEvents();
    expect(events).toHaveLength(9);
  });
  it('should get all sorted not started events', async () => {
    MockDate.set('2022-01-23T00:00:00.000Z');
    const eventRepository = new EventRepository();
    const events = await eventRepository.getAllSortedNotStartedEvents();
    expect(events.getNextEvent()).toBeDefined();
    expect(events.getNextNextEvent()).toBeDefined();
  });
});
