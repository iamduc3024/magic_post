const { DataTypes } = require("sequelize");
const { sequelize } = require("../configdb/db");

const Delivery = sequelize.define(
    "deliveries",
    {
        deliver_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'orders', // name of Target model
                key: 'order_id'  // key in Target model
            }
        },
        from_id: {
            type: DataTypes.STRING(5),
            allowNull: false,
        },
        to_id: {
            type: DataTypes.STRING(5),
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        delver_status: {
            type: DataTypes.TINYINT(5),
            allowNull: false,
        }
    },
    {
        timestamps: false, // Enable timestamps
      }
);

Delivery.sync({ force: false }).then(() => {
    console.log("Delivery đã được đồng bộ hóa với cơ sở dữ liệu.");
});

module.exports = { Delivery };