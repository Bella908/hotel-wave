import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link, json } from "react-router-dom";
import Swal from "sweetalert2";
import { update } from "firebase/database";
import axios from "axios";



const MyLists = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [control, setControl] = useState(false);
    const [review, setReviews] = useState([]);
    const [reviewContent, setReviewContent] = useState("");
    const [rating, setRating] = useState(0);
    const [isOpens, setIsOpens] = useState(false);
    const [isOpen, setIsOpen] = useState(null); // Changed initial state to false
    const [startDate, setStartDate] = useState(new Date());


    const url = `http://localhost:5000/myBooking?email=${user.email}`;

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setBookings(data))
    }, [url])

    const handleDelete = async (id) => {
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

            const { data } = await axios.patch(
                `http://localhost:5000/booking/${id}`, { status : 'true' }
            )
            console.log(data)
        
    
    
    };


// review
const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
        content: reviewContent,
        rating: rating,
        roomId: bookings._id,
        userId: user.email,
        userName: user.displayName,
    };

    try {
        const response = await axios.post("http://localhost:5000/review", reviewData);
        console.log(response.data);

        // Add the newly submitted review to the existing reviews
        setReviews([...review, response.data]);
        setReviewContent(""); // Clear the review content input field
        setRating(0); // Reset the rating input field

        Swal.fire({
            icon: 'success',
            title: 'Thank you for your review',
            showConfirmButton: false,
            timer: 1500 // Close the alert after 1.5 seconds
        });

    } catch (error) {
        console.error("Error occurred during review submission:", error);
    }
    setIsOpens(false);
};




    const handleBooking = async e => {
        e.preventDefault();
        const deadline = startDate;
        const bookData = { deadline }; // Only include the deadline field
        try {
            const response = await axios.put(`http://localhost:5000/myBooking/update/${isOpen._id}`, bookData);
            console.log(response.data);
            // Notify the user of the update using SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Booking Updated Successfully',
                showConfirmButton: false,
                timer: 1500 // Close the alert after 1.5 seconds
            });
        } catch (error) {
            console.error("Error occurred during booking:", error);
            // Notify the user of the error using SweetAlert
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while updating the booking. Please try again later.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            });
        }
        setIsOpen(false);
    }
    
    


    return (

        <div>
            <div className="relative">
                <img src="https://images.unsplash.com/photo-1560801142-cc7133998a71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <h3 className="absolute top-52 left-0 w-full text-center text-white mt-24 font-Briem text-7xl">My Booking</h3>
            </div>

            <div>
                <h3 className="text-3xl text-center my-11 font-Briem">Bookings : {bookings.length}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-[15px]">

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
                                        {/* <Link to={`/myBooking/update/${book._id}`}> */}
                                        {/* 
                                            <button onClick={() => handleUpdate(book._id)} className="btn btn-outline btn-info ">Update</button> */}
                                        <button className="btn bg-[#455d9f] text-white" onClick={() => setIsOpen(book)}>Update</button>
                                        {isOpen && (
                                            <div className="fixed inset-0 z-10 overflow-y-auto" id="my_modal_4">
                                                <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                                                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                                                    <div className="relative inline-block p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:max-w-sm rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6">
                                                        <form onSubmit={handleBooking}>
                                                            <div className=" items-center justify-between w-full mt-5 gap-x-2">
                                                                <input defaultValue={isOpen.name} className="flex-1 block h-10 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" name="roomName" readOnly />
                                                                <input type="email" defaultValue={user.email} className="flex-1 block h-10 mt-2 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" name="email" readOnly />
                                                                <h3>Previous Date :</h3>
                                                                <input type="email" defaultValue={isOpen.deadline} className="flex-1 block h-10 mt-2 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" name="date" readOnly />
                                                                <div className=" mt-3 ml-3">
                                                                    <h3>Pick a New date</h3>
                                                                    <DatePicker className="border p-2 rounded-md" selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect={false}  />
                                                                </div>
                                                            </div>
                                                            <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
                                                                <button onClick={() => setIsOpen(null)} className="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                                                    Cancel
                                                                </button>
                                                                <button type="submit" className="px-4 sm:mx-2 w-full py-2.5 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                                                    Confirm
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* </Link> */}
                                    </div>

                                    <button onClick={() => handleDelete(book._id)} className="btn btn-outline btn-error">Cancel</button>
                                    <div className="mt-3">

                                    <button className="btn bg-[#043BD4] text-white" onClick={() => setIsOpens(true)}>Post a review</button>
                                    {isOpens && (
                <div className="fixed inset-0 z-10 overflow-y-auto" id="my_modal_4">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="relative inline-block p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:max-w-sm rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6">
                            <div className="flex items-center justify-center mx-auto">
                            </div>
                                <form onSubmit={ handleReviewSubmit}>
                            <div className=" items-center justify-between w-full mt-5 gap-x-2">
                            <input
                            type="number"
                            className="input input-primary w-16 mr-4"
                            placeholder="Rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        />
                                <input type="email" defaultValue={user.email} className="flex-1 block h-10 mt-2 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" name="email" />
                                <div className=" mt-3 ml-3">
                                <textarea
                            className="textarea textarea-primary w-15"
                            placeholder="Write your review here..."
                            value={reviewContent}
                            onChange={(e) => setReviewContent(e.target.value)}
                        ></textarea>
                                </div>
                            </div>
                            <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
                            <button onClick={() => setIsOpens(false)} className="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                        Cancel
                                    </button>
                              
                                    <button  type="submit" className="px-4 sm:mx-2 w-full py-2.5 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                    Confirm
                                </button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
                      
                                    </div>

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