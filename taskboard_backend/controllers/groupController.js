const Group = require("../models/group");
const Member = require("../models/member");
const Permission = require("../models/permission");

exports.allGroups = async (req, res) => {
    try {
        const groups = await Group.find({ creator: req.member.id }).populate({
            path: 'members',
            model: 'Member',
            select: 'name',
        });
        res.json(groups);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to retrieve groups." });
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
      const group = await Group.findByIdAndDelete(req.params.id);
      if (!group) {
        return res.status(404).json({ error: "Group not found" });
      }
      console.log(group);
      res.json({ message: `Group ${group.name} deleted successfully` });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  exports.groupUpdate = async (req, res) => {
    try {
      console.log('body', req.body);
      await Group.findByIdAndUpdate(req.params.id, req.body);
      res.send("Group updated successfully");
    } catch (err) {
      console.log(err);
    }
  };