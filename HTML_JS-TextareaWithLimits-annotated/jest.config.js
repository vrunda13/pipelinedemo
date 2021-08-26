const path = require('path');

module.exports = {
    "testRegex": "((\\.|/test/*.)(test))\\.js?$",
    "testTimeout": 2000,
    "moduleNameMapper": {
        "\\.scss$": path.resolve(__dirname, 'src/test/__mocks__/styleMock.js')
    }
}