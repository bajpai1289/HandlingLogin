const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data){ this.users = data}
};
const bcrypt = require('bcrypt');

const handleLogin = async(req, res)=>{
    const {user, pwd} = req.body;
    if(!user||!pwd) return res.status(400).json({"message": "username and password are required"});
    const foundUser = usersDB.users.find(person=>person.username===user);
    if(!foundUser) return res.status(401).json({"message": "user not found"});
    // evalueing the password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match){
        res.json({"success": `User ${user} is logged in!`});
    }else{
        return res.status(401).json({"message": "user unauthorized"});
    }
}


module.exports = { handleLogin }


//hanfdl login is not wokin ht efd wedefe