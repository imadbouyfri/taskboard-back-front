const Group = require("../models/group");

exports.allGroups = async (req, res) => {
    try {
        const groups = await Group.find().populate({
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
        const { name, description } = req.body;
        const newGroup = new Group({
            name,
            description,
        });
        await newGroup.save();
        res.status(201).json({ message: "Group created successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to create group." });
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