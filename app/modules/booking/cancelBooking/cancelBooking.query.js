const { ticket, user_tickets } = require('../../../../models/index');
const cancelBookingQuery = async(ticketdetail) => {
    return user_tickets.destroy({
        where: {
            id: ticketdetail.id
        }
    })
}
module.exports = cancelBookingQuery;