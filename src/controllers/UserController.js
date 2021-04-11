const bcrypt = require("bcryptjs");
const User = require("../models/User");
class UserController {
    async create(req, res) {
        let { name, email, password } = req.body;
        try {
            const selectedUser = await User.findOne({ email }).exec();
            if(!selectedUser) {
                password = await bcrypt.hash(password, 10);
    
                const newUser = await User.create({ name, email, password });
                await newUser.save()
    
                newUser.password = undefined;
                return res.json({ user: newUser })
            } else return res.sendStatus(401)
            
        } catch (error) {
            res.status(503);
            return res.json({ error })
        }
    }

    async auth(req, res) {
        let { email, password } = req.body;
        try {
            const selectedUser = await User.findOne({ email });
            if(selectedUser) {
                if (await bcrypt.compare(password, selectedUser.password)) {
                    return res.json({ id: selectedUser._id })
                } else {
                    return res.sendStatus(401);
                }
            } else return res.sendStatus(404);
        } catch (error) {
            res.status(503)
            return res.json({ error })
        }

    }
}

module.exports = new UserController();