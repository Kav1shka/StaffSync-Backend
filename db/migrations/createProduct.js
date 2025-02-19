'use strict';
// {import('sequelize-cli').Migration} 

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('product', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            isFeatured: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: true,
            },
            productImage: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                allowNull: true,
            },
            price: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            shortDescription: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            // productUrl: {
            //     type: Sequelize.STRING,
            //     allowNull: true,
            // },
            category: {
                type: Sequelize.ARRAY(Sequelize.STRING),
            },
            tags: {
                type: Sequelize.ARRAY(Sequelize.STRING),
            },
            createdBy: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'user',
                    key: 'id',
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deletedAt: {
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, _Sequelize) {
        await queryInterface.dropTable('product');
    },
};