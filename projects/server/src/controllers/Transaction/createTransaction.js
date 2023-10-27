const { Transaction, TransactionItem, sequelize } = require("../../../models");
const { format } = require("date-fns"); // Import the format function from date-fns

const createTransactionAndItems = async (req, res) => {
  try {
    const user = req.user;
    const user_id = user.user_id;
    const {
      start_date,
      end_date,
      total_price,
      room_id,
    } = req.body;
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const dates = [];

    // Generate an array of formatted dates within the range (excluding end_date)
    while (startDate < endDate) {
      dates.push(format(startDate, "yyyy-MM-dd")); // Format as 'YYYY-MM-DD' using date-fns
      startDate.setDate(startDate.getDate() + 1); // Increment date by one day
    }

    await sequelize.transaction(async (t) => {
      // Create a Transaction
      const transaction = await Transaction.create(
        {
          start_date,
          end_date,
          user_id,
          total_price,
          transfer_receipt: null,
          status_id: 1,
          is_reviewed: 0,
        },
        { transaction: t }
      );

      // Create TransactionItem instances from the dates array
      for (const date of dates) {
        await TransactionItem.create(
          {
            date,
            transaction_id: transaction.transaction_id,
            room_id,
          },
          { transaction: t }
        );
      }
      console.log({
        start_date,
        end_date,
        user_id,
        total_price,
        transfer_receipt: null,
        status_id: 1,
        is_reviewed: 0,
        transaction_id: transaction.transaction_id,
      })
      return res.status(200).json({
        message: 'Transaction and TransactionItems created successfully.',
        data: transaction,
      });
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json(err.message);
  }
}

module.exports = { createTransactionAndItems };
