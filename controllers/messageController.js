import { Message } from "../database/model/mesaageModel.js";
import  User  from "../database/model/userModel.js";

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate("user", "username email");

    return res.status(200).json({
      messages,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const newMessage = async (req, res) => {
  try {
    const { message, id } = req.body;

    if (!message || !id) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const newMsg = await Message.create({
      message,
      user: id,
    });

    return res.status(201).json({
      message: "Message sent successfully",
      success: true,
      data: newMsg,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const MarkAsComplete = async (req, res)=>{
  try {
    const {id} = req.body;

    if(!id){
      return res.status(400).json({
        message:"Id Required",
        success: false
      })
    }

    const message = await Message.findById(id);

    if(!message){
      return res.status(400).json({
        message: "No Message Found",
        success: false
      })
    }

    message.isSolved = true;
    await message.save();

    return res.status(200).json({
      message: "Marked As Completed",
      success: true,
      message
    })
  } catch (error) {
    console.log(error);
  }
}