const User = require('../model/userModel');

async function getUserDetails (req, res) {
    try {
        console.log("User:"+req.body);
        const user = await User.findById(req.user.id);
        // console.log(user);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ data: user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
async function updateUserDetails (req, res) {
    try {
        const { name, email, phone, address } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { name, email, phone, address },
            { new: true, runValidators: true }
        );

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User updated successfully', data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports={getUserDetails,updateUserDetails};