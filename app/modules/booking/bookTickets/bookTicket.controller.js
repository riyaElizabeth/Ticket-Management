const bookTicketQuery = require('./bookTicket.query')
const { validationResult } = require('express-validator')
const bookTicket = async(req, res) => {
    try {
        console.log("book controller");
        let validation = validationResult(req);
        if (!validation.isEmpty())
            return res.send(validation)
        const result = await bookTicketQuery(req);
        return res.send(result);
    } catch (e) {
        res.send({ status: 400, error: true });
        console.log(e)
    }


}

module.exports = bookTicket;