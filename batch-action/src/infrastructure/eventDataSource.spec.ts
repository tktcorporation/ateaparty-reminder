import { EventDataSource } from './eventDataSource'
import { GraphQLClient } from 'graphql-request'

describe('repo', () => {
    let repo: EventDataSource;
    beforeAll(() => {
        const endpoint = process.env.GRAPHQL_ENDPOINT;
        // throw error if GRAPHQL_ENDPOINT is not defined
        if (!endpoint) {
            throw new Error('GRAPHQL_ENDPOINT is not defined');
        }
        repo = new EventDataSource(new GraphQLClient(endpoint));
    });
    it('should get all events', async () => {
        const events = await repo.queryAllEvents();
        expect(events).toBeDefined();
        // check if events is array
        expect(Array.isArray(events)).toBeTruthy();
    })
})