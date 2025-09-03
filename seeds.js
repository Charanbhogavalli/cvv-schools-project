 const mongoose = require('mongoose');
const School = require('./models/School');
const Staff = require('./models/Staff');

mongoose.connect('mongodb://localhost:27017/cvvschools')
  .then(async () => {
    console.log('Connected to MongoDB for seeding');

    // Clear existing schools and staff
    await School.deleteMany({});
    await Staff.deleteMany({});

    // Seed schools
    const schools = [
      { name: 'CVV Institute of Science and Technology', logo: '/images/computerscience.png', description: 'Focuses on advanced computing and technology education.' },
      { name: 'Vedic Knowledge Systems', logo: '/images/vedic.png', description: 'Explores ancient Vedic sciences and their modern applications.' },
      { name: 'Linguistics & Literary Studies', logo: '/images/linguistics.png', description: 'Studies languages, literature, and communication.' },
      { name: 'Ethics, Governance, Culture & Social Systems', logo: '/images/ethics.png', description: 'Examines ethical frameworks, governance, and cultural dynamics.' },
      { name: 'Philosophy, Psychology & Scientific Heritage', logo: '/images/philosophy.png', description: 'Integrates philosophy, psychology, and scientific traditions.' },
      { name: 'Contemporary Knowledge Systems', logo: '/images/contemporary.png', description: 'Covers modern interdisciplinary knowledge areas.' },
      { name: 'Kalayoga', logo: '/images/kalayoga.png', description: 'Combines arts, yoga, and holistic practices.' }
    ];
    const savedSchools = await School.insertMany(schools);

    // Seed sample staff
    const staff = [
      { name: 'John Doe', role: 'Teacher', email: 'john@example.com', phone: '1234567890', school: savedSchools[0]._id },
      { name: 'Jane Smith', role: 'Admin', email: 'jane@example.com', phone: '0987654321', school: savedSchools[1]._id },
      { name: 'Alice Johnson', role: 'Coordinator', email: 'alice@example.com', phone: '1112223333', school: savedSchools[2]._id }
    ];
    await Staff.insertMany(staff);

    console.log('Schools and staff seeded successfully');
    mongoose.connection.close();
  })
  .catch(err => console.error('Seeding error:', err));