import { DiscordWebhookUrl } from './discordWebhookUrl';
import { DiscordMember } from './member';

export class Event {
  constructor(
    public readonly member: DiscordMember,
    public readonly date: Date,
  ) {}
}

export class Reminder {
  constructor(public readonly events: Event[]) {}

  /**
   * get sorted events by date
   */
  get sortedEvents(): Event[] {
    return this.events.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  /**
   * 次回のイベントを取得する
   */
  get nextEvent(): Event | undefined {
    if (this.events.length < 1) {
      return undefined;
    }
    return this.sortedEvents[0];
  }

  /**
   * 次次回のイベントを取得する
   */
  get nextNextEvent(): Event | undefined {
    if (this.events.length < 2) {
      return undefined;
    }
    return this.sortedEvents[1];
  }
}
