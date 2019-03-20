const {app} = require('./../server');
const {message} = require('./../controllers');

describe('Message Controller:', () => {
    describe('Function: parse()', () => {
        describe('Invalid Queries', () => {
            it('should return INVALID_QUERY if no keywords detected', async () => {
                let testMessage = 'hello';
                let responseMessage = 'INVALID_QUERY';
                let response = await message.parse(testMessage);
                expect(response).toBe(responseMessage);
            });
        });

        describe('Translate Queries', () => {
            it('should return TRANSLATE_QUERY if message begins with \'translate\'', async () => {
                let testMessage = 'translate hello to french';
                let responseMessage = 'TRANSLATE_QUERY';
                let response = await message.parse(testMessage);
                expect(response).toBe(responseMessage);
            });
        })
        
        describe('Wolfram Queries', () => {
            it('should return WOLFRAM_QUERY if message begins with \'who\'', async () => {
                let testMessage = 'who is cory crowley';
                let responseMessage = 'WOLFRAM_QUERY';
                let response = await message.parse(testMessage);
                expect(response).toBe(responseMessage);
            });
    
            it('should return WOLFRAM_QUERY if message begins with \'what\'', async () => {
                let testMessage = 'what is the meaning of life';
                let responseMessage = 'WOLFRAM_QUERY';
                let response = await message.parse(testMessage);
                expect(response).toBe(responseMessage);
            });
    
            it('should return WOLFRAM_QUERY if message begins with \'when\'', async () => {
                let testMessage = 'when is the last time the Toronto Raptors won an NBA championship?';
                let responseMessage = 'WOLFRAM_QUERY';
                let response = await message.parse(testMessage);
                expect(response).toBe(responseMessage);
            });
    
            it('should return WOLFRAM_QUERY if message begins with \'where\'', async () => {
                let testMessage = 'where is the city ottawa?';
                let responseMessage = 'WOLFRAM_QUERY';
                let response = await message.parse(testMessage);
                expect(response).toBe(responseMessage);
            });
    
            it('should return WOLFRAM_QUERY if message begins with \'why\'', async () => {
                let testMessage = 'why is the sky blue?';
                let responseMessage = 'WOLFRAM_QUERY';
                let response = await message.parse(testMessage);
                expect(response).toBe(responseMessage);
            });
    
            it('should return WOLFRAM_QUERY if message begins with \'how\'', async () => {
                let testMessage = 'how tall is the CN tower?';
                let responseMessage = 'WOLFRAM_QUERY';
                let response = await message.parse(testMessage);
                expect(response).toBe(responseMessage);
            });
    
            it('should return WOLFRAM_QUERY if message begins with \'query\'', async () => {
                let testMessage = 'query is the sky blue?';
                let responseMessage = 'WOLFRAM_QUERY';
                let response = await message.parse(testMessage);
                expect(response).toBe(responseMessage);
            });
        })
 
        describe('News Queries', () => {
            it('should return NEWS_QUERY if message begins with \'news\'', async () => {
                let testMessage = 'news';
                let responseMessage = 'NEWS_QUERY';
                let response = await message.parse(testMessage);
                expect(response).toBe(responseMessage);
            });
        });

        describe('TextNet Queries', () => {
            it('should return TEXTNET_HELP_QUERY if message begins with \'textnet\'', async () => {
                let testMessage = 'textnet help';
                let responseMessage = 'TEXTNET_HELP_QUERY';
                let response = await message.parse(testMessage);
                expect(response).toBe(responseMessage);
            });
        });

        describe('Directions Queries', () => {
            it('should return DIRECTIONS_QUERY if message begins with \'directions\'', async () => {
                let testMessage = 'directions from Queens University to Mars';
                let responseMessage = 'DIRECTIONS_QUERY';
                let response = await message.parse(testMessage);
                expect(response).toBe(responseMessage);
            });
        });

        describe('Recommendations Queries', () => {
            it('should return RECOMMEND_QUERY if message begins with \'recommend\'', async () => {
                let testMessage = 'recommend a better internet interface';
                let responseMessage = 'RECOMMEND_QUERY';
                let response = await message.parse(testMessage);
                expect(response).toBe(responseMessage);
            });
        });    
    });
});
