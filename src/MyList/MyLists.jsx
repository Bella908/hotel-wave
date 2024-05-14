import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";



const MyLists = () => {
 const {user} = useContext(AuthContext);
 const [bookings , setBookings] = useState([]);
 const [control, setControl] = useState(false);


 const url =`http://localhost:5000/myBooking?email=${user.email}`;

 useEffect(() =>{
    fetch(url)
    .then(res => res.json())
    .then(data => setBookings(data))
 },[url])

 const handleDelete = (id) => {
    // Display SweetAlert confirmation dialog
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            // If confirmed, proceed with deletion
            fetch(`http://localhost:5000/myBooking/delete/${id}`, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        // Update the bookings state after deletion
                        setBookings(prevBookings => prevBookings.filter(book => book._id !== id));
                        // Show success message after deletion
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                });
        }
    });
};




    return (

        <div>
            <div className="relative">
    <img  src="https://images.unsplash.com/photo-1560801142-cc7133998a71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
    <h3 className="absolute top-52 left-0 w-full text-center text-white mt-24 font-Briem text-7xl">My Booking</h3>
</div>

<div>
    <h3 className="text-3xl text-center my-11 font-Briem">Bookings : {bookings.length}</h3>
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
                        
                    {
                            bookings?.map(book => <tr key={book._id}>
                               
                                <td>{book.name}</td>
                                <td>{book.deadline}</td>
                              
                                <td>
                                    <div className='my-2'>
                                        <Link>

                                            <button className="btn btn-outline btn-info ">Update</button>
                                        </Link>
                                        </div>

                                        <button onClick={() => handleDelete(book._id)}  className="btn btn-outline btn-error">Cancel</button>
                                    
                                </td>
                            </tr>)
                        }

                            
                        

                    </tbody>
                </table>
            </div>
        
        </div>
    );
};

export default MyLists;