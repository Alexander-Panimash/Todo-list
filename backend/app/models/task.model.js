import {default as DataTypes} from 'sequelize';

export const tasks = (sequelize) => {
    return  sequelize.define("task", {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            field: 'name'
        },
        date: {
            type: DataTypes.DATE,
            field: 'date'
        },
        finished: {
            type: DataTypes.BOOLEAN,
            field: 'finished'
        }
    });
};