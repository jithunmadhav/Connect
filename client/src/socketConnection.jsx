import { io } from 'socket.io-client'
const socket=io.connect('https://connect.autoaid.online')
export default socket;