const viewBookingsQuery = require('./viewBookings.query')
const { validationResult } = require('express-validator');
const viewBookings = async(req, res) => {
    try {
        const validation = validationResult(req);
        if (validation.isEmpty())
            return res.send(validation);

        const result = await viewBookingsQuery(req.query.search_key, req.query.sort_key || 'firstName', req.query.sort_order || 'asc');

        if (!result)
            return res.send("No bookings found");

        return res.send(result);
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
}
module.exports = viewBookings;