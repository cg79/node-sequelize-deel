// Mock Sequelize module
// const Sequelize = jest.genMockFromModule("sequelize");

// Mock Sequelize constructor
class MockSequelize {
  constructor() {
    // Any necessary initialization mock
  }

  // Mock any Sequelize methods you're using
  // For example:
}

// Replace the Sequelize constructor with the mocked version
// Sequelize.Sequelize = MockSequelize;

module.exports = MockSequelize;
