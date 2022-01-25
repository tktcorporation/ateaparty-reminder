import { request } from './repository'
describe('repo', () => {
    it('should get all events', async () => {
        const events = await request()
        expect(events).toHaveLength(4)
    })
})