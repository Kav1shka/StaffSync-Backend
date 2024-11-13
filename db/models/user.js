'use strict';
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
console.log("came here 8");
const sequelize = require('../../config/database');
const AppError = require('../../utils/appError');
const product = require('./product');
// const project = require('./project');
console.log("came here 9");
const user = sequelize.define(
    'user',
    {
        id: {
            allowNull: true,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        userType: {
            type: DataTypes.ENUM('0', '1', '2'),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'firstName cannot be null',
                },
                notEmpty: {
                    msg: 'firstName cannot be empty',
                },
            },
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'firstName cannot be null',
                },
                notEmpty: {
                    msg: 'firstName cannot be empty',
                },
            },
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'lastName cannot be null',
                },
                notEmpty: {
                    msg: 'lastName cannot be empty',
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'email cannot be null',
                },
                notEmpty: {
                    msg: 'email cannot be empty',
                },
                isEmail: {
                    msg: 'Invalid email id',
                },
            },
        },
        NIC: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'NIC cannot be null',
                },
                notEmpty: {
                    msg: 'NIC cannot be empty',
                }
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'password cannot be null',
                },
                notEmpty: {
                    msg: 'password cannot be empty',
                },
            },
        },
        confirmPassword: {
            type: DataTypes.VIRTUAL,
            set(value) {
                if (this.password.length < 7) {
                    throw new AppError(
                        'Password length must be grater than 7',
                        400
                    );
                }
                if (value === this.password) {
                    const hashPassword = bcrypt.hashSync(value, 10);
                    this.setDataValue('password', hashPassword);
                } else {
                    throw new AppError(
                        'Password and confirm password must be the same',
                        400
                    );
                }
            },
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        deletedAt: {
            type: DataTypes.DATE,
        },
    },
    {
        paranoid: true,
        freezeTableName: true,
        modelName: 'user',
    }
);
console.log("cam here 10");
user.hasMany(product, { foreignKey: 'createdBy' });
product.belongsTo(user, {
    foreignKey: 'createdBy',
});

module.exports = user;