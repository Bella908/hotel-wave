import { useEffect, useState } from "react";
import FeatureRooms from "./FeatureRooms";


const FeatureRoom = () => {
    const [rooms , setRoom] = useState([]);


 useEffect(() =>{
    fetch('http://localhost:5000/feature')
    .then(res => res.json())
    .then(data => setRoom(data));

 },[])
    return (

        <div>
            <div className="text-center  mt-40">
                <h5 className="font-Briem text-4xl mb-6"> Featured Rooms</h5>
                <h2> Our rooms, furnished with taste and attention to detail, are ready to welcome you to give you moments of relaxation and pleasure. Every corner of Hotel Paradiso is designed to offer you maximum comfort. You will enjoy bright spaces, refined furnishings and high quality services that will make your stay unforgettable.</h2>
            </div>
              <div className='grid grid-cols-2 gap-1 justify-center'>

{
   rooms.map(room => <FeatureRooms key={rooms._id} room ={room} ></FeatureRooms>)
}

     </div>
            
        </div>
    );
};

export default FeatureRoom;