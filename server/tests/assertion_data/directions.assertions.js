let parseHTMLDirections = {
    origin: '199 William Street, Kingston, ON',
    destination: '331 Brock Street, Kingston, ON',
    transportationMode: 'Driving',
    result: 'Head west on William St toward Barrie St (61 m)\n\nTurn right onto Barrie St (0.2 km)\n\nTurn left onto Brock St Destination will be on the right  (0.1 km)'
}

let correctQuery = 'Directions walking from 199 William Street, Kingston, ON to 331 Brock Street, Kingston, ON'

let getResponse = {
    result: 'Walking directions to 331 Brock Street, Kingston, ON\nHead west on William St toward Barrie St (61 m)\n\nTurn right onto Barrie St (0.2 km)\n\nTurn left onto Brock St Destination will be on the right  (0.1 km)'
}

module.exports = {
    parseHTMLDirections,
    correctQuery,
    getResponse
}