import {default as DataTypes} from 'sequelize';

export const tasks = (sequelize) => {
    return sequelize.define("task", {
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