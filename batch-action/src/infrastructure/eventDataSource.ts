import { GraphQLClient, gql } from 'graphql-request';

// define guard of events result
interface EventsResult {
  event: Array<{
    datetime: string;
    staff: {
      user: {
        discord_id: string;
        name: string;
      };
    };
    event_sub_staffs: Array<{
      staff: {
        user: {
          name: string;
          discord_id: string;
        };
      };
    }>;
  }>;
}
const isEventsResult = (result: any): result is EventsResult =>
  result &&
  Array.isArray((result as EventsResult).event) &&
  (result as EventsResult).event.every(
    (e) =>
      typeof e.datetime === 'string' &&
      e.staff &&
      e.staff.user &&
      typeof e.staff.user.discord_id === 'string' &&
      Array.isArray(e.event_sub_staffs) &&
      e.event_sub_staffs.every(
        (eventSubStaff) =>
          eventSubStaff.staff &&
          eventSubStaff.staff.user &&
          typeof eventSubStaff.staff.user.name === 'string' &&
          typeof eventSubStaff.staff.user.discord_id === 'string',
      ),
  );

export class EventDataSource {
  constructor(private readonly client: GraphQLClient) {}
  queryAllEvents = async () => {
    const result = await this.client.request(gql`
      {
        event {
          datetime
          created_at
          staff {
            user {
              name
              discord_id
            }
          }
          event_sub_staffs {
            staff {
              user {
                name
                discord_id
              }
            }
          }
          updated_at
        }
      }
    `);
    if (!isEventsResult(result)) {
      throw new Error('invalid events result: ' + JSON.stringify(result));
    }
    return result.event;
  };
}
