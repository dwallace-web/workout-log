module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define('Log', {
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        definition: {
            type: DataTypes.STRING,
            allowNull: true
        },
        result: {
            type: DataTypes.STRING,
            allowNull: true
        },
        owner: {
            type: DataTypes.INTEGER,
        }
    });
    return Log
};