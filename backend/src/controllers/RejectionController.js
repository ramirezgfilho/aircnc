const Booking = require('../models/Booking');

module.exports = {
    async store(req, res) {
        const {booking_id} = req.params;

        const booking = await Booking.findById(booking_id).populate('spot');

        booking.approved = false;

        const bookingUserSocket = req.connectedUsers[booking.user];

        if(bookingUserSocket) {
            req.io.to(bookingUserSocket).emit('booking_response', booking);
        }

        await booking.save();
        
        return res.json(booking);
    }
}