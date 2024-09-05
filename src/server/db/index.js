import { Sequelize, DataTypes } from 'sequelize';

// Using this to access the environment variables
import dotenv from 'dotenv';
dotenv.config();

const HOST = process.env.DB_HOST || 'localhost'; // RDS endpoint goes here
const USERNAME = process.env.DB_USERNAME || 'root';
const PASSWORD = process.env.DB_PROD_PASSWORD || process.env.DB_DEV_PASSWORD;
const DATABASE = 'nelsonDesign';

const db = new Sequelize({
  host: HOST,
  port: 3306,
  dialect: 'mysql',
  username: USERNAME,
  password: PASSWORD,
  database: DATABASE,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Use this if you're having SSL certificate issues
    }
  }
});

db.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));

const Clients = db.define('client', {
  clientID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    defaultValue: null,
    allowNull: true,
  },
  numberOfSales: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  }
});

const Blueprints = db.define('blueprint', {
  bluePrintID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  dateAdded: {
    type: DataTypes.DATE,
    allowNull: true,
  }
});

// need to keep track of the sales => join table
const Sales = db.define('sale', {
  saleID: {
    type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  clientID: {
    type: DataTypes.INTEGER,
    references: Clients.clientID,
  },
  bluePrintID: {
    type: DataTypes.INTEGER,
    references: Blueprints.bluePrintID,
  },
  saleDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  }
});

const ContactInquiries = db.define('ContactInquiry', {
  inquiryID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// CREATE ANY JOIN TABLES FOR POTENTIAL DIFFERENT FORMATS
// OR CATEGORIES OF DESIGNS

db.sync()
.then(() => {
  console.log('Database synchronized');
})
.catch((err) => {
  console.error('Database synchronization error: ', err);
});

export default {
  sequelize: db,
  Clients,
  Blueprints,
  Sales,
  ContactInquiries
}