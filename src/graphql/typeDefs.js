const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    employee_photo: String
  }

  type AuthResponse {
    token: String!
    user: User!
  }

  type MessageResponse {
    success: Boolean!
    message: String!
  }

  type Query {
    login(usernameOrEmail: String!, password: String!): AuthResponse
    getAllEmployees: [Employee]
    getEmployeeById(id: ID!): Employee
    searchEmployee(designation: String, department: String): [Employee]
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): MessageResponse
    addEmployee(
      first_name: String!
      last_name: String!
      email: String!
      gender: String
      designation: String!
      salary: Float!
      date_of_joining: String!
      department: String!
      employee_photo: String
    ): Employee
    updateEmployee(id: ID!, designation: String, salary: Float): Employee
    deleteEmployee(id: ID!): MessageResponse
  }
`;