const app=require("./app");
const dotenv=require("dotenv");
const { connectDB } = require("./config/database");
const User = require("./models/user");

dotenv.config({path: "./config/config.env"});

connectDB();

const initializeUsers = async () => {
  const users = ['Rahul', 'Kamal', 'Sanak', 'Priya', 'Amit', 'Neha', 'Vikram', 'Sneha', 'Rohan', 'Anjali'];
  const existingUsers = await User.find();
  if (existingUsers.length === 0) {
    await User.insertMany(users.map(name => ({ name })));
    console.log('Initialized 10 users');
  }
};

initializeUsers();

app.listen(process.env.PORT , ()=>{
    console.log(`Server is UP on port ${process.env.PORT}`);
});

