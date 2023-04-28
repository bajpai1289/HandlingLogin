const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data){ this.users = data}
};
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async(req, res)=>{
    const {user, pwd} = req.body;
    if(!user||!pwd) return res.status(400).json({"message": "username and password are required"});
    const duplicate = usersDB.users.find(person=>person.username===user);
    if(duplicate) return res.status(409).json({"message": "this user already exists"}) ;
    try {
        const hasedPwd = await bcrypt.hash(pwd, 10);
        // storing the new user
        const newUser = {"username": user, "password": hasedPwd};
        usersDB.setUsers([...usersDB.users, newUser])
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        res.status(201).json({"message": "created"})
    } catch (err) {
        res.status(500).json({"message": err.message})
    }
}

module.exports = {handleNewUser}