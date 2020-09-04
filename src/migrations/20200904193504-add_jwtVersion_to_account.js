'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.addColumn('Accounts', 'jwtVersion', {
            type: Sequelize.INTEGER,
            after: 'password',
            defaultValue: 0,
            allowNull: false
        });
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Accounts', 'jwtVersion');
    }
};