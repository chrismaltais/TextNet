const {app} = require('./../server');
const {message} = require('./../controllers');

describe('Function: parse()', () => {
    it('should return a value of all capitals', async () => {
        let testMessage = 'hello';
        let response = await message.parse(testMessage);

        expect(response).toBe(testMessage.toUpperCase());
    })
})