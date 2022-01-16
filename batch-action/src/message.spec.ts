import { message } from './message';

describe('message', () => {
  it('should return "Hello World!"', () => {
    expect(message()).toBe('Hello World!');
  });
});
