import Chat from "../models/chatModel.js";
import User from "../models/user.model.js";
import fs from "fs";
import path from "path";

// create chats
export const createChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  try {
    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user.id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "firstName lastName",
    });

    if (isChat.length > 0) {
      return res.status(200).send(isChat[0]);
    } else {
      const chatData = {
        chatName: "dm",
        isGroupChat: false,
        users: [req.user.id, userId],
      };

      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      return res.status(200).send(fullChat);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user.id } },
    })
      .populate("users")
      .populate("groupAdmin")
      .populate("latestMessage")
      .populate({
        path: "latestMessage",
        populate: {
          path: "sender",
          model: "User",
        },
      })
      .sort({ updatedAt: -1 });

    res.status(200).json({ chats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const uploadGroupImage = async (req, res) => {
  try {
    const { groupImage } = req.files;

    if (!groupImage) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const imageName = `${Date.now()}-${groupImage.name}`;
    const mediaUploadPath = path.join(
      path.resolve(),
      `public/groups/${imageName}`
    );
    groupImage.mv(mediaUploadPath);
    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imageName,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all the fields" });
  }

  let users;
  try {
    users = req.body.users;
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid users format" });
  }

  if (users.length < 1) {
    return res.status(400).json({
      success: false,
      message: "More than 2 users are required to form a group chat",
    });
  }

  users.push(req.user.id);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      isGroupChat: true,
      users,
      groupAdmin: req.user.id,
      groupImage: req.body.groupImageName,
    });
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json({
      success: true,
      message: "Group chat created successfully",
      chat: fullGroupChat,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      return res
        .status(400)
        .json({ success: false, message: "Chat not found" });
    }
    res.status(200).send(updatedChat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: {
          users: userId,
        },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!added) {
      return res
        .status(400)
        .json({ success: false, message: "Chat not found" });
    }
    res.status(200).send(added);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res
        .status(400)
        .json({ success: false, message: "Chat not found" });
    }

    if (chat.groupAdmin.toString() === userId) {
      return res
        .status(400)
        .json({ success: false, message: "Admin cannot be removed" });
    }

    chat.users = chat.users.filter((user) => user.toString() !== userId);
    const removed = await chat.save();

    res.status(200).send(removed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const leaveFromGroup = async (req, res) => {
  const { chatId } = req.body;

  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res
        .status(400)
        .json({ success: false, message: "Chat not found" });
    }

    if (chat.groupAdmin.toString() === req.user.id) {
      const nextAdmin = chat.users.find((u) => u.toString() !== req.user.id);
      if (nextAdmin) {
        chat.groupAdmin = nextAdmin;
      }
    }

    chat.users = chat.users.filter(
      (user) => user.toString() !== req.user.id.toString()
    );

    const removed = await chat.save();
    res.status(200).json({ message: "You have left the group", data: removed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateGroup = async (req, res) => {
  const { chatId, newName } = req.body;

  try {
    const updated = await Chat.findByIdAndUpdate(
      chatId,
      { chatName: newName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updated) {
      return res
        .status(400)
        .json({ success: false, message: "Chat not found" });
    }
    res.status(200).send(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateGroupImage = async (req, res) => {
  const { chatId, imageName } = req.body;

  try {
    const updated = await Chat.findByIdAndUpdate(
      chatId,
      { groupImage: imageName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updated) {
      return res
        .status(400)
        .json({ success: false, message: "Chat not found" });
    }
    res.status(200).send(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
