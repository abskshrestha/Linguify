import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";s

export async function getRecommendedUsers(req, res){
  try {
    const currentUserId  = req.user.id;
    const currentUser = req.user;

    const recommendedUSers = await User.find({
      $and: [
        {_id: { $ne: currentUserId}}, //exxclude current user
        {$_id: { $nin: currentUser.friends}}, //eclude current user's friends
        {isOnBoarded: true}
      ] 
    })
    res.status(200).json(recommendedUSers)
  }
  catch (error) {
    console.error("Error in getRecommenededUers controller", error.message);
    res.status(500).json({message: "Internal Server Error"});
  }
}

export async function getMyFriends(req, res){
  try {
    const user = await User.findById(req.user.id)
    .select("friends")
    .populate("friends","fullName profilePic nativeLanguage learningLanguage");

    res.status(200).json(user.friends);
    
  }
  catch (error){
    console.error("Error in getMyFriends controller", error.message);
    res.status(500).json({message:"Internal Server Error"});
  }
}

export async function sendFriendRequest(req, res){

  try{

    const myId = req.user.id;
    const { id: recipientId } = req.params;

    //prevent sending req to yourself

    if (myId = recipientId){
      return res.status(400).json({message: "You can't send friend request to yourelf"})
    }

    const recipient = await User.findById(recipientId);   
    
    if (!recipient) {
      return res.status(404).json({message: "Reciepient not found"});
    }

    //chceck if user is already friends

    if (recipient.friends.includes.myId) {
      return res.status(400).json({message:"You are already firends with this user"});
    }

    //chekc if a req already exists

    const existingRequest = await FriendRequer.findOne({
      $or:[
        {
          sender:myId, recipient:recipientId
        },
        {
          sender:recipienrId, recipient:myId
        },
      ],
    });

    if (existingRequest){
      return res
      .status(400)
      .json({message:"A firnde request alreaedy exist between yo uand the user"});
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient:recipientId,
    });

    res.status(201).json(friendRequest)

  } 
  catch (error) {

    console.error("Error in sendFriendReque t controller", error.message);
    res.status(500).json({message:"Internak Server Error"});

  }

}