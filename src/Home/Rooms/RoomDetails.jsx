import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const RoomDetails = () => {
    const [isOpen, setIsOpen] = useState(false); // Changed initial state to false
    const [startDate, setStartDate] = useState(new Date());
    const room = useLoaderData();
    const { user } = useContext(AuthContext);
    const [reviewContent, setReviewContent] = useState(""); 
    const [rating, setRating] = useState(0);

    const { category, RoomImage, RoomDescription, PricePerNight, RoomSize , _id } = room;

    const handleBooking = async e => {
        e.preventDefault();
        const form = e.target;
        const name = form.roomName.value;
        const email = form.email.value;
        const deadline = startDate;
        const roomId = {_id} 
        const bookData ={
            name , email,deadline , roomId
        }
        try {
            const response = await axios.post('http://localhost:5000/booking', bookData);
            console.log(response.data);
        } catch (error) {
            console.error("Error occurred during booking:", error);
        }
         setIsOpen(false);
    }

    // review
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const reviewData = {
            content: reviewContent,
            rating: rating,
           
            roomId: room._id, 
            userId: user.email, 
        };

        try {
            const response = await axios.post("http://localhost:5000/review", reviewData);
            console.log(response.data);
            // Optionally, you can update UI to show the review has been submitted successfully
        } catch (error) {
            console.error("Error occurred during review submission:", error);
        }
    };

    return (
        <div>
            <div className="bg-slate-300 h-[450px] ">
                <h4 className="text-9xl text-slate-300">ho</h4>
                <h4 className="font-Briem text-7xl pt-20 pl-20 pb-11">{category}</h4>
                <img className="h-[500px] w-[1200px] ml-20 bg-cover" src={RoomImage} alt="" />

                <div>
                    <div className="space-y-3 ml-20 mt-32">
                        <h4 className="text-4xl">{category}</h4>
                        <p className="text-xl">{RoomDescription}</p>
                        <div className="flex gap-10 text-xl">
                            <p>price : {PricePerNight}</p>
                            <p> size : {RoomSize}</p>
                        </div>
                    </div>
                </div>

                <div className="my-10 ml-20">
                    {/* Modal Trigger Button */}
                    <button className="btn bg-[#043BD4] text-white" onClick={() => setIsOpen(true)}>Book Now</button>
                </div>

              {/* Room details rendering code goes here */}

            {/* Review section */}
            <div className="ml-20">
    <h4 className="text-3xl font-Briem text-center mb-4">Post a Review</h4>
    <div className="flex items-center mb-4">
        <h4 className="mx-2">Rating : </h4>
        <input
            type="number"
            className="input input-primary w-16 mr-4"
            placeholder="Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
        />
        <textarea
            className="textarea textarea-primary w-15"
            placeholder="Write your review here..."
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
        ></textarea>
    <button className="btn btn-outline border-rose-400 text-rose-400 ml-4" onClick={handleReviewSubmit}>
        Submit Review
    </button>
    </div>
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
                                <input type="text" value= {category} className="flex-1 block h-10 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" name="roomName" />
                        
                                <input type="email" defaultValue={user.email} className="flex-1 block h-10 mt-2 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" name="email" />
                                <div className=" mt-3 ml-3">
                                    <h3>Pick a date</h3>
                                    <DatePicker
    className="border p-2 rounded-md"
    selected={startDate}
    onChange={(date) => setStartDate(date)}
    dateFormat="dd/MM/yyyy" // Set the date format here
/>

                                </div>
                            </div>
                            <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
                                <button onClick={() => setIsOpen(false)} className="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
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
    );
};

export default RoomDetails;
