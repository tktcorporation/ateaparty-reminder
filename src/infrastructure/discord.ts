import axios from 'axios';
import { DiscordWebhookUrl } from 'src/domain/discordWebhookUrl';

export const sendDiscordMessage = async (
  message: string,
  discordWebhookUrl: DiscordWebhookUrl,
) => {
  // send message to Discord webhook
  await axios.post(discordWebhookUrl.url, {
    content: message,
    allowed_mentions: {
      parse: ['users'],
    },
  });
};
