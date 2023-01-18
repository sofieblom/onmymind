const User = require("./models/UserModel")
const bcrypt = require("bcryptjs");


const seedUser = async () => {
    console.log("seeding user..")
     User.findOne({ email: "johndoe@test.com"}).then(user => {
      if(user) {
        return user
      }else {
        const newUser = new User({
          firstname: "John",
          lastname: "Doe",
          email: "johndoe@test.com", 
          password: "test123",
        });
        bcrypt.genSalt(7, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
            })
        })
      }
    
    })
}

module.exports = { seedUser }