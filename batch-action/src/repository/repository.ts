import { GraphQLClient, gql } from 'graphql-request';

export const request = async () => {
  const client = new GraphQLClient('http://localhost:8080/v1/graphql');

  const query = gql`
  {
      event {
        id
        host
        datetime
        event_sub_staffs {
          id
          staff_id
          created_at
          updated_at
          staff {
            id
            updated_at
            user {
              id
              name
              discord_id
              created_at
              updated_at
            }
            user_id
            created_at
          }
        }
        created_at
      }
  }`;

  const data = await client.request(query);

  console.log(data);
  return data;
};
