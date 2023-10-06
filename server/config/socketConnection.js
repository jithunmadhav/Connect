export const socketConnection=(io,activeusers)=>{
    io.on("connection",(socket)=>{
        //adding new user to the connection
        socket.on('new-user-add',(newUserId)=>{
          console.log(newUserId);
          if(!activeusers[newUserId]){
            socket.emit('socketId',socket.id)
            activeusers[newUserId]={userId:newUserId,socketId:socket.id}
          }
          io.emit('get-user',activeusers)
        })
      //disconnecting the specific user from the connection
      socket.on('disconnection',()=>{
        Object.keys(activeusers).forEach((key) => {
          if(activeusers[key].socketId === socket.id) {
               delete activeusers[key] 
          }  io.emit('get-user',activeusers)
      })
      })
      //send a message to a specific client
      socket.on("send-message", (data) => {
        console.log('data: ',data);
        console.log('ACTIVE : ',activeusers);
        const { recieverId } = data;
        const user = activeusers[recieverId]
        console.log('IF-OUT');
        if (user) {
          console.log('IF-IN');
          console.log('USER : ',user);
          io.to(user.socketId).emit("recieve", data);
        }
      });
      console.log(activeusers);
      
      // Video call
      socket.on("callUser", (data) => {
        console.log('CALL USER',data);
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
      })
}