import { DiscordMember } from './member';

export class Staff {
  constructor(public readonly member: DiscordMember) {}
}

export class Event {
  constructor(
    public readonly host: Staff,
    public readonly sub: Staff[],
    public readonly date: Date,
  ) {}
}

export class NotStartedEvent extends Event {
  constructor(host: Staff, sub: Staff[], date: Date) {
    super(host, sub, date);
  }
}

export class SortedNotStartedEvents {
  constructor(private readonly values: NotStartedEvent[]) {}
  public getNextEvent(): NotStartedEvent | undefined {
    if (this.values.length < 1) {
      return;
    }
    return this.values[0];
  }
  public getNextNextEvent(): NotStartedEvent | undefined {
    if (this.values.length < 2) {
      return;
    }
    return this.values[1];
  }
}
