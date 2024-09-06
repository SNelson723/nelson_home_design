import db from './db/index.js'; // Import your database models

const { Blueprints } = db; // Destructure to get the Blueprints model

const seedBlueprints = async () => {
  try {
    const blueprintsData = [
      {
        name: 'Blueprint 10',
        bedrooms: 3,
        bathrooms: 2,
        area: '2600 sqft',
        price: 6000.00,
      },
      {
        name: 'Blueprint 11',
        bedrooms: 2,
        bathrooms: 2,
        area: '1700 sqft',
        price: 800.00,
      },
      {
        name: 'Blueprint 12',
        bedrooms: 4,
        bathrooms: 3,
        area: '4200 sqft',
        price: 9000.00,
      },
      // Add more blueprint entries as needed
    ];

    // Use bulkCreate to insert the sample data
    await Blueprints.bulkCreate(blueprintsData);
    console.log('Blueprints seeded successfully');
  } catch (error) {
    console.error('Error seeding blueprints:', error);
  }
};

// Execute the seed function
seedBlueprints();