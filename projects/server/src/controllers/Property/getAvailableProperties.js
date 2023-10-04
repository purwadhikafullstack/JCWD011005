const { Op, Sequelize } = require("sequelize");
const { Property, PropertyImage, Room, RoomEvents, TransactionItem, sequelize } = require("../../../models");

const getAvailableProperties = async (req, res) => {
  try {
    const { start_date, end_date, property_category_id, page, per_page, sort, sortBy, keyword } = req.query;

    const currentPage = parseInt(page) || 1;
    const itemsPerPage = parseInt(per_page) || 10;

    const whereCondition = {};

    if (property_category_id) {
      whereCondition.property_category_id = property_category_id;
    }

    if (keyword) {
      whereCondition.name = {
        [Op.like]: `%${keyword}%`,
      };
    }

    // Find all properties with the specified category and include rooms
    const properties = await Property.findAll({
      attributes: ['property_id'],
      where: whereCondition,
      include: [
        {
          model: Room,
          as: 'Rooms',
          required: false,
          include: [
            {
              model: RoomEvents,
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

    // Extract room IDs from the properties
    const roomIds = properties.reduce((roomIds, property) => {
      if (property.Rooms) {
        roomIds.push(...property.Rooms.map(room => room.room_id));
      }
      return roomIds;
    }, []);

    // Exclude booked rooms based on TransactionItems using room IDs and date range
    if (roomIds.length > 0 && start_date && end_date) {
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

      const availableRoomIds = roomIds.filter(roomId => {
        return !excludedRoomIds.some(excluded => excluded.room_id === roomId);
      });

      // Fetch room events by room_id and date range
      const roomEvents = await RoomEvents.findAll({
        where: {
          room_id: {
            [Op.in]: availableRoomIds,
          },
          date: {
            [Op.between]: [start_date, end_date],
          },
        },
      });

      // Calculate room prices based on room events and retrieve available properties
      const availableProperties = await Property.findAll({
        where: {
          property_id: {
            [Op.in]: properties.map(property => property.property_id),
          },
        },
        // Order criteria can be added here if needed
        offset: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage,
      });

      for (const property of availableProperties) {
        if (property.Rooms) {
          let cheapestRoomPrice = Infinity; // Initialize with a high value
          for (const room of property.Rooms) {
            const matchingRoomEvents = room.RoomEvents || [];
            const roomPrice = calculateCheapestPrice(room, matchingRoomEvents);
            if (roomPrice < cheapestRoomPrice) {
              cheapestRoomPrice = roomPrice;
            }
          }
          property.cheapest_price = cheapestRoomPrice;
        }
      }

      const totalCount = availableProperties.length;
      const totalPages = Math.ceil(totalCount / itemsPerPage);

      return res.status(200).json({
        message: "Available properties retrieved successfully",
        totalRows: totalCount,
        totalPages: totalPages,
        currentPage: currentPage,
        itemsPerPage: itemsPerPage,
        properties: availableProperties,
      });
    } else {
      // If no room IDs or date range provided, return an empty result
      return res.status(200).json({
        message: "No available properties found",
        totalRows: 0,
        totalPages: 0,
        currentPage: currentPage,
        itemsPerPage: itemsPerPage,
        properties: [],
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

function calculateCheapestPrice(room, roomEvents) {
  let cheapestPrice = room.base_price;

  for (const event of roomEvents) {
    if (event.is_percentage === 1) {
      const adjustedPrice = room.base_price + (room.base_price * event.value / 100);
      if (adjustedPrice < cheapestPrice) {
        cheapestPrice = adjustedPrice;
      }
    } else {
      if (event.value < cheapestPrice) {
        cheapestPrice = event.value;
      }
    }
  }

  return cheapestPrice;
}

module.exports = { getAvailableProperties };
