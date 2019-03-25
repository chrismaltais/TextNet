const {help} = require('../controllers');

describe('News Controller: ', () => {
    describe('Function: getResponse()', () => {
        it('should return a formatted help message including syntax help', async () => {
            let results = await help.getResponse();
            expect(results.length).toBeGreaterThan(600);
        });
    });
});