const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Employee = require("../models/Employee");

module.exports = {
    Query: {
        login: async (_, { usernameOrEmail, password }) => {
            const user = await User.findOne({
                $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
            });

            if (!user) throw new Error("User not found");

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new Error("Invalid credentials");

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

            return { token, user };
        },

        getAllEmployees: async () => Employee.find(),

        getEmployeeById: async (_, { id }) => Employee.findById(id),

        searchEmployee: async (_, { designation, department }) =>
            Employee.find({
                $or: [{ designation }, { department }],
            }),
    },

    Mutation: {
        signup: async (_, { username, email, password }) => {
            const hashed = await bcrypt.hash(password, 10);
            await User.create({ username, email, password: hashed });
            return { success: true, message: "User created successfully" };
        },

        addEmployee: async (_, args) => Employee.create(args),

        updateEmployee: async (_, { id, ...updates }) =>
            Employee.findByIdAndUpdate(id, updates, { new: true }),

        deleteEmployee: async (_, { id }) => {
            await Employee.findByIdAndDelete(id);
            return { success: true, message: "Employee deleted" };
        },
    },
};