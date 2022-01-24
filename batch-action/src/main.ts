import { sendDiscordMessage } from './infrastructure/discord';
import { SortedNotStartedEvents } from './domain/reminder';
import { EventRepository } from './repository/eventRepository';
import { DiscordWebhookUrl } from './domain/discordWebhookUrl';

/**
 * 当番通知用のメッセージを生成する
 */
const createRemindMessage = (
  sortedNotStartedEvents: SortedNotStartedEvents,
): string => {
  const firstEvent = sortedNotStartedEvents.getNextEvent();
  const secondEvent = sortedNotStartedEvents.getNextNextEvent();
  return `
    **お茶会の司会当番のお知らせです**
    今週: 
    メイン: ${
      firstEvent?.host.member.mention() ?? 'まだ決まってないよ！やゔぁいよ！'
    }
    サブ: ${
      firstEvent?.sub.map((staff) => staff.member.mention()).join(', ') ??
      'まだ決まってないよ！やゔぁいよ！'
    }

    次週:
    メイン: ${
      secondEvent?.host.member.mention() ?? 'まだ決まってないよ！やゔぁいよ！'
    }
    サブ: ${
      secondEvent?.sub.map((staff) => staff.member.mention()).join(', ') ??
      'まだ決まってないよ！やゔぁいよ！'
    }

    担当日の都合が悪いときはサブの人に相談してね！
    よろしくおねがいします！
    `;
};

const main = async () => {
  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!discordWebhookUrl) {
    throw new Error('DISCORD_WEBHOOK_URL environment variable is not set');
  }
  sendDiscordMessage(
    createRemindMessage(
      await new EventRepository().getAllSortedNotStartedEvents(),
    ),
    new DiscordWebhookUrl(discordWebhookUrl),
  );
};

main();
