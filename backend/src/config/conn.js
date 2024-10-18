import { Sequelize } from 'sequelize';

const conn = new Sequelize ('prep_ade', 'root', 'Sen@iDev77!.', {
    host: "localhost",
    dialect: "mysql",
});

export default conn;