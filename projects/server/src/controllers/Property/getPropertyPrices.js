const { Op } = require("sequelize");
const { Property, Room, RoomEvent, TransactionItem } = require("../../../models");

async function getAvailableRoomIds(roomIds, start_date, end_date) {
  const excludedRoomIds = await TransactionItem.findAll({
    attributes: ['room_id'],
    where: {
      room_id: {
        [Op.in]: roomIds,
      },
      date: {
        [Op.between]: [start_date, end_date],
      },
    },
  });

  const unavailableRoomIds = excludedRoomIds.map((item) => item.room_id);

  const availableRoomIds = roomIds.filter((roomId) => !unavailableRoomIds.includes(roomId));
  return availableRoomIds;
}

function calculatePriceForDate(room, roomEvents, date) {
  const roomBasePrice = room.base_price;

  const eventsForDate = roomEvents.filter(event =>
    new Date(event.date).toDateString() === new Date(date).toDateString()
  );

  let roomPrice = roomBasePrice;

  for (const event of eventsForDate) {
    if (event.is_percentage === false) {
      roomPrice = event.value;
    } else if (event.is_percentage === true) {
      const percentageAdjustment = (roomPrice * event.value) / 100;
      roomPrice = roomPrice + percentageAdjustment;
    }
  }

  return roomPrice;
}

const getPropertyPrices = async (req, res) => {
  const property_id = req.params.id;
  const { start_date, end_date } = req.query;

  try {
    const properties = await Property.findAll({
      where: { property_id },
      include: [
        {
          model: Room,
          as: 'Rooms',
          required: false,
          include: [
            {
              model: RoomEvent,
              as: 'RoomEvents',
              where: {
                date: {
                  [Op.between]: [start_date, end_date],
                },
              },
              required: false,
            },
          ],
        },
      ],
    });

    const propertyPrices = [];
    
    for (const property of properties) {
      const propertyPrice = {
        property_id: property.property_id,
        name: property.name,
        prices: [],
      };

      for (let date = new Date(start_date); date < new Date(end_date); date.setDate(date.getDate() + 1)) {
        const roomPrices = [];
        
        for (const room of property.Rooms) {
          const roomEvents = room.RoomEvents || [];
          const availableRoomIds = await getAvailableRoomIds([room.room_id], date, date);
          
          if (availableRoomIds.length > 0) {
            const roomPrice = calculatePriceForDate(room, roomEvents, date);
            roomPrices.push({
              room_id: room.room_id,
              price: roomPrice,
            });
          } else {
            roomPrices.push({
              room_id: room.room_id,
              price: null,
            });
          }
        }
        
        const displayedPrice = roomPrices
          .filter((room) => room.price !== null)
          .reduce((minPrice, room) => {
            if (room.price < minPrice) {
              return room.price;
            }
            return minPrice;
          }, Infinity);

        propertyPrice.prices.push({
          date: date.toISOString().split('T')[0],
          displayed: displayedPrice,
          roomPrices,
        });
      }

      propertyPrices.push(propertyPrice);
    }

    res.json({ price: propertyPrices });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getPropertyPrices
};
