

import Room from './Room';
import { useEffect } from "react";
import { useState } from "react";


const Rooms = () => {
    const [roomss , setRoom] = useState([]);


 useEffect(() =>{
    fetch('http://localhost:5000/rooms')
    .then(res => res.json())
    .then(data => setRoom(data));

 },[])
    return (
        <div className=''>
         <div className="relative">
    <img src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
    <h3 className="absolute top-52 left-0 w-full text-center text-black mt-24 font-Briem text-7xl">Rooms</h3>
</div>

            <div className="text-center  mt-24">
                <h5 className="font-Briem text-4xl mb-6">Rooms</h5>
                <h2>With 50 comfortable and well-furnished rooms, we offer you a welcoming <br /> and refined environment for your stay. Ease of access is guaranteed thanks to <br /> the lift that connects all floors, making our hotel an accessible place even for <br /> those with mobility difficulties</h2>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-1 justify-center'>

       {

          roomss.filter(r => r.status === 'true')
          .map(room => <Room key={roomss._id} room ={room} ></Room>)
       }

            </div>
        </div>
    );
};

// 

export default Rooms;