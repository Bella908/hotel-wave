import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useLoaderData, useParams } from 'react-router-dom';

const Update = () => {

    const{id} = useParams();
    console.log(id);
     const[spot , setSpot] = useState({});
    const {user} = useContext(AuthContext);
    const room = useLoaderData();
    const { category, RoomImage, RoomDescription, PricePerNight, RoomSize , _id } = room;
    console.log(room)


    useEffect(() =>{
        fetch(`https://hotel-wave-server.vercel.app/myBooking/update/${id}`)
       .then(res => res.json())
       .then(data =>{
           setSpot(data)
         
       })
   },[id])




    if (!room) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0 bg-cover   " style={{backgroundImage: 'url(https://images.unsplash.com/photo-1551016043-06ec2173531b?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}}>
             <div className=''>
                <p className=" text-4xl text-center text-white ">Update your {category} <br />Deadline</p>
            </div>
            <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form  className="card-body">
                <div className="px-4">
                    <label className="label">
                                <span className="label-text text-[15px]">Room Name</span>
                            </label>
                            <input type="text" placeholder="Name" name="name" defaultValue={category} className="input w-full max-w-xs"/>
                    <label className="label">
                                <span className="label-text text-[15px]">Photo URL:</span>
                            </label>
                            <input type="text" placeholder="Photo URL" name="photoURL" className="input w-full max-w-xs" />
                </div>
                <div>
                <button className="bg-[#e0bc75] text-white font-bold py-2 px-4 w-full rounded hover:bg-[#7f7f7f]" type="submit">Update Profile</button>
                </div>
                </form>
               </div>
               </div>
               </div>
        </div>
    );
};

export default Update;