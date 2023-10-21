const { Op } = require("sequelize");
const { Property, PropertyImage, Room, RoomEvent, RoomImage, sequelize } = require("../../../models");
const {propertyUtils} = require("../../services");

const getAvailableProperties = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const defaultSortBy = 'price';
    const defaultSort = 'asc'
    const { start_date, end_date, property_category_id, page, per_page, sort = defaultSort, sortBy = defaultSortBy, keyword } = req.query;

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

    const roomIds = await propertyUtils.getRoomIds(properties);

    if (roomIds.length > 0 && start_date && end_date) {
      const availableRoomIds = await propertyUtils.getAvailableRoomIds(roomIds, start_date, end_date);

      const availableProperties = await Property.findAll({
        where: {
          property_id: {
            [Op.in]: properties.map(property => property.property_id),
          },
        },
        include:[{
          model: PropertyImage,
          attributes: ['path'],
          required: false,
        },
        {
          model: Room,
          include:[
            {model: RoomImage}
          ]
        }
      ],
        offset: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage,
      });

      const roomPricesMap = {};
      for (const property of availableProperties) {
        try {
          const rooms = await Room.findAll({
            where: {
              property_id: property.property_id,
              room_id: availableRoomIds
            },
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
          });
      
          if (rooms.length > 0) {
            let cheapestRoomPrice = Infinity;
            for (const room of rooms) {
              const matchingRoomEvents = room.RoomEvents || [];
              const roomPrice = propertyUtils.calculateCheapestPrice(room, matchingRoomEvents);
              if (roomPrice < cheapestRoomPrice) {
                cheapestRoomPrice = roomPrice;
              }
              const roomPrices = propertyUtils.calculateRoomPrices(room, matchingRoomEvents, start_date, end_date);
              roomPricesMap[room.room_id] = roomPrices;
            }
            property.dataValues.price = cheapestRoomPrice;
          }
            for (const room of rooms) {
              const matchingRoomEvents = room.RoomEvents || [];
              const roomPrices = propertyUtils.calculateRoomPrices(room, matchingRoomEvents, start_date, end_date);
  
              room.dataValues.prices = roomPrices;
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      }

      const responseProperties = availableProperties.map(property => ({

        property_id: property.property_id,
        name: property.name,
        description: property.description,
        address: property.address,
        property_category_id: property.property_category_id,
        tenant_id: property.tenant_id,
        createdAt: property.createdAt,
        updatedAt: property.updatedAt,
        price: property.dataValues.price,
        image: property.PropertyImages.map(image => ({
          path: image.path
        })),
        rooms: property.Rooms.map(room => ({
          room_id: room.room_id,
          name: room.type,
          description: room.description,
          base_price: room.base_price,
          image: room.RoomImages.map(image => ({
            path: image.path
          })),
          prices: roomPricesMap[room.room_id]
        }))
      }));

      responseProperties.sort((a, b) => {
        if (sortBy === "name") {
          return sort === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortBy === "price") {
          return sort === "asc" ? a.price - b.price : b.price - a.price;
        }
      });

      const totalCount = availableProperties.length;
      const totalPages = Math.ceil(totalCount / itemsPerPage)

      await t.commit();

      return res.status(200).json({
        message: "Available properties retrieved successfully",
        totalRows: totalCount,
        totalPages: totalPages,
        currentPage: currentPage,
        itemsPerPage: itemsPerPage,
        properties: responseProperties,
      });

    } else {
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
    await t.rollback();
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAvailableProperties };