const { Op } = require("sequelize");
const { TransactionItem } = require("../../models")

async function getRoomIds(properties) {
    const roomIds = properties.reduce((roomIds, property) => {
      if (property.Rooms) {
        roomIds.push(...property.Rooms.map(room => room.room_id));
      }
      return roomIds;
    }, []);
  
    return roomIds;
  }

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
  
    const availableRoomIds = roomIds.filter(roomId => {
      return !excludedRoomIds.some(excluded => excluded.room_id === roomId);
    });
  
    return availableRoomIds;
  }

  async function calculateRoomPricesMap(availableProperties, start_date, end_date) {
    const roomPricesMap = await properyUtils.calculateRoomPricesMap(availableProperties, start_date, end_date);
  }
function calculateCheapestPrice(room, roomEvents) {
    let maxPercentageAdjustedPrice = room.base_price;
    let maxNonPercentageValue = room.base_price;
    
    for (const event of roomEvents) {
      if (event.is_percentage === true) {
        const adjustedPrice = room.base_price + ((room.base_price * event.value) / 100);
  
        if (adjustedPrice > maxPercentageAdjustedPrice) {
          maxPercentageAdjustedPrice = adjustedPrice;
        }
      } else if (event.is_percentage === false) {
        if (event.value > maxNonPercentageValue) {
          maxNonPercentageValue = event.value;
        }
      }
    }
    return Math.max(maxPercentageAdjustedPrice, maxNonPercentageValue);
    }

    function calculateRoomPrices(room, roomEvents, startDate, endDate) {
      const prices = [];
      const roomBasePrice = room.base_price;
    
      try {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
    
        if (isNaN(startDateObj) || isNaN(endDateObj)) {
          throw new Error('Invalid date format');
        }
    
        let currentDate = new Date(startDate);
    
        while (currentDate < endDateObj) { // Use < instead of <= to exclude the check-out date
    
          const eventsForCurrentDay = roomEvents.filter(event =>
            new Date(event.date).toDateString() === currentDate.toDateString()
          );
    
          let roomPrice = roomBasePrice;
    
          for (const event of eventsForCurrentDay) {
            if (event.is_percentage === false) {
              roomPrice = event.value;
            }
          }
    
          for (const event of eventsForCurrentDay) {
            if (event.is_percentage === true) {
              const percentageAdjustment = (roomPrice * event.value) / 100;
              roomPrice = roomPrice + percentageAdjustment;
            }
          }
    
          prices.push(roomPrice);
    
          currentDate.setDate(currentDate.getDate() + 1);
        }
      } catch (error) {
        console.error(error);
      }
    
      return prices;
    }

      module.exports = { calculateCheapestPrice, calculateRoomPrices, getRoomIds, getAvailableRoomIds, calculateRoomPricesMap };