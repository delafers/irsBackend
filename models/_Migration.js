import { DataTypes, Model } from 'sequelize';

import db from '../db.js';

class Migration extends Model {
}

const model = Migration.init({
    filename: { type: DataTypes.STRING(255), primaryKey: true },
    appliedAt: { type: DataTypes.DATE, allowNull: false }
}, {
    sequelize: db,
    tableName: '_migrations'
});
export default model;
