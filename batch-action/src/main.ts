import { sendDiscordMessage } from './infrastructure/discord';
import { Reminder } from './domain/reminder';
import { EventRepository } from './repository/eventRepository';
import { DiscordWebhookUrl } from './domain/discordWebhookUrl';

/**
 * 当番通知用のメッセージを生成する
 */
const createRemindMessage = (reminder: Reminder): string => {
  const firstEvent = reminder.nextEvent;
  const secondEvent = reminder.nextNextEvent;
  return `
    **お茶会の司会当番のお知らせです**
    今週: ${firstEvent?.member.mention() ?? 'まだ決まってないよ！やゔぁいよ！'}
    次週: ${secondEvent?.member.mention() ?? 'まだ決まってないよ！やゔぁいよ！'}
    よろしくおねがいします！
    `;
};

const main = async () => {
  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!discordWebhookUrl) {
    throw new Error('DISCORD_WEBHOOK_URL environment variable is not set');
  }
  sendDiscordMessage(
    createRemindMessage(new Reminder(await new EventRepository().getAll())),
    new DiscordWebhookUrl(discordWebhookUrl),
  );
};

main();
