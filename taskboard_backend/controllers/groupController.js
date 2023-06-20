const Group = require("../models/group");
const Member = require("../models/member");
const Permission = require("../models/permission");

exports.allGroups = async (req, res) => {
  try {
    const permissions = await Permission.find({ user: req.member.id });
    const permissionGroups = permissions.map((per) => per.group);
    const allGroups = await Group.find({ _id: { $in: permissionGroups } })
      .populate({
        path: 'permissions',
        select: 'user role',
        populate: {
          path: 'user',
          model: 'Member',
          select: 'name email',
        },
      })
      .exec();
    res.json(allGroups);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
};


exports.createGroup = async (req, res) => {
    try {
      const { name, description, creator} = req.body;
  
      // Create a new group
      const group = new Group({
        name,
        description,
        creator,
        color: Math.floor(Math.random() * 4),
      });
  
      // Create a new permission for the group
      const permission = await Permission.create({
        group: group._id,
        user: req.member.id,
        role: "admin",
      });
  
      // Retrieve the member logged in
      const member = await Member.findById(req.member.id, "permissions");
  
      // Adding the new Permission into the member logged in and the new group
      await Member.updateOne({ _id: req.member.id }, { permissions: [...member.permissions, permission._id] });
      group.permissions.push(permission._id);
  
      // Save the group
      await group.save();
  
      // Populate the 'permissions' field of the group before sending the response
      const populatedGroup = await Group.findById(group._id).populate('permissions');
  
      res.json(populatedGroup);
    } catch (err) {
      console.log(err);
    }
  };
  
  exports.groupById = async (req, res) => {
    try {
      let newGroup = await Group.findById(req.params.id).populate({
        path: 'permissions',
        select: 'user role',
        populate: {
          path: 'user',
          model: 'Member',
          select: 'name email'
        }
      });
      res.json(newGroup);
    } catch (err) {
      console.log(err);
    }
  };

exports.groupDelete = async (req, res) => {
    try {
      const permission = await Permission.findOne({ group: req.params.id, user: req.member.id });
      if (permission.role !== 'admin') {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      console.log('body', req.body);
      const group = await Group.findByIdAndDelete(req.params.id);
      console.log(group);
      res.json({ message: `Group ${group.name} deleted successfully` });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  exports.groupUpdate = async (req, res) => {
    try {
      const permission = await Permission.findOne({ group: req.params.id, user: req.member.id });
      if (permission.role !== 'admin') {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      console.log('body', req.body);
      await Group.findByIdAndUpdate(req.params.id, req.body);
      res.send("Group updated successfully");
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Server Error' });
    }
  };