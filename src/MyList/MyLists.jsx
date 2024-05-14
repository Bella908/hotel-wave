import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";


const MyLists = () => {
    const { user } = useContext(AuthContext);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios(`http://localhost:5000/room/${user?.email}`);
                setRooms(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getData();
    }, [user]);

  console.log(rooms)
    return (

        <div>
            <div className="relative">
    <img  src="https://images.unsplash.com/photo-1560801142-cc7133998a71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
    <h3 className="absolute top-52 left-0 w-full text-center text-white mt-24 font-Briem text-7xl">My Booking</h3>
</div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            
                            <th>Room Name</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    {/* {
                            rooms?.map(room => <tr key={room._id}>
                               
                                <td>{room.name}</td>
                                <td>{room.deadline}</td>
                                <td>
                                    <div className='my-2'>
                                        <Link>

                                            <button className="btn bg-orange-300 text-white ">Update</button>
                                        </Link>
                                        </div>

                                        <button  className="btn bg-red-500 text-white">Delete</button>
                                    
                                </td>
                            </tr>)
                        } */}

                            
                        

                    </tbody>
                </table>
            </div>
        
        </div>
    );
};

export default MyLists;