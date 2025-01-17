import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Swal from "sweetalert2";

const RoomDetails = () => {
    const [isOpen, setIsOpen] = useState(false); // Changed initial state to false
    const [startDate, setStartDate] = useState(new Date());

    const [booking, setBookings] = useState([]);
    const [review, setReviews] = useState([]);
    const room = useLoaderData();
    const { user } = useContext(AuthContext);
   
    const { category, RoomImage, RoomDescription, PricePerNight, RoomSize, _id, status
    } = room;






    // booking
    const handleBooking = async e => {
        e.preventDefault();
        const form = e.target;
        const name = form.roomName.value;
        const email = form.email.value;
        const deadline = startDate;
        const roomId = { _id }
        const bookData = {
            name, email, deadline, roomId
        }
        try {
            const response = await axios.post('https://hotel-wave-server.vercel.app/booking', bookData);
            console.log(response.data);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Booking Confirmed",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error("Error occurred during booking:", error);
        }
        setIsOpen(false);


    }

    // status
    const handleStatus = async (id, prevStatus, status) => {
        const { data } = await axios.patch(
            `https://hotel-wave-server.vercel.app/booking/${id}`, { status }
        )
        console.log(data)
    }


   




    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`https://hotel-wave-server.vercel.app/review?roomId=${_id}`);
                setReviews(response.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        fetchReviews();
    }, [_id]);

    console.log(review)


    return (
        <div>
            <div className="bg-slate-300 h-[450px] ">
                <h4 className="text-9xl text-slate-300">ho</h4>
                <h4 className="font-Briem text-7xl pt-20 pl-20 pb-11">{category}</h4>
                <img className="h-[500px] w-[1200px] ml-20 bg-cover" src={RoomImage} alt="" />

                <div>
                    <div className="space-y-3 ml-20 mt-32">
                        <div className="flex gap-2">
                            <h4 className="text-4xl">{category}</h4>
                            {
                                status === 'flase' ? (
                                    <button className="btn bg-red-500 text-white">
                                        Unavailable
                                    </button>
                                ) : (
                                    <button className="btn bg-green-400 text-white" >
                                        Available
                                    </button>
                                )
                            }


                        </div>
                        <p className="text-xl">{RoomDescription}</p>
                        <div className="flex gap-10 text-xl">
                            <p>price : {PricePerNight}</p>
                            <p> size : {RoomSize}</p>
                        </div>
                    </div>
                </div>

                <div className="my-10 ml-20">
                    {/* Modal Trigger Button */}
                    {
                        user ?
                            <>
                                <button className="btn bg-[#043BD4] text-white" onClick={() => setIsOpen(true)} disabled={status === 'flase'} >Book Now</button>

                            </> :

                            <>
                                <Link to="/login">

                                    <button className="btn bg-[#043BD4] text-white">Book Now</button>
                                </Link>
                            </>

                    }
                </div>

                {/* Room details rendering code goes here */}

                {/* Review section */}
 
                <div className="mb-10">
                    <div>
                        <h4 className="text-3xl font-Briem text-center">Reviews</h4>
                        <h5 className="text-center ">To add a review please Book a room first </h5>
                    </div>
                    {
                        review.map(reviews => <div key={reviews.id}>
                            <div className="card w-[500px]  ring-1 ring-slate-400  mx-20 mt-3 rounded ">

                                <div className="flex">

                                    <div className="" >


                                        <h4 className=" m-4">{reviews.userName}</h4>

                                    </div>
                                </div>
                                <div className=" m-4">

                                    <p>Rating : {reviews.rating}</p>
                                    <p>Comment: {reviews.content}</p>



                                </div>
                            </div>
                        </div>

                        )
                    }
                </div>
            
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-10 overflow-y-auto" id="my_modal_4">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="relative inline-block p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:max-w-sm rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6">
                            <div className="flex items-center justify-center mx-auto">
                                <img className="h-full rounded-lg" src={RoomImage} alt="" />
                            </div>
                            <div className="mt-5 text-center">
                                <h3 className="text-lg font-medium text-gray-800 dark:text-white" id="modal-title">
                                    {category}
                                </h3>
                                <p className="mt-2 text-gray-500 dark:text-gray-400">
                                    {RoomDescription}
                                </p>
                            </div>
                            <form onSubmit={handleBooking}>
                                <div className=" items-center justify-between w-full mt-5 gap-x-2">
                                    <input type="text" value={category} className="flex-1 block h-10 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" name="roomName" />

                                    <input type="email" defaultValue={user.email} className="flex-1 block h-10 mt-2 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" name="email" />
                                    <div className=" mt-3 ml-3">
                                        <h3>Pick a date</h3>
                                        <DatePicker
                                            className="border p-2 rounded-md"
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            dateFormat="dd/MM/yyyy"
                                            showTimeSelect={false}
                                        />

                                    </div>
                                </div>
                                <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
                                    <button onClick={() => setIsOpen(false)} className="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                        Cancel
                                    </button>
                                    <button type="submit" onClick={() => handleStatus(_id, status, 'flase')}
                                        className="px-4 sm:mx-2 w-full py-2.5 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                        Confirm
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomDetails;
