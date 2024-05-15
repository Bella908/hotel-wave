import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";


const FeatureRooms = ({room}) => {
    const{category , RoomImage ,RoomDescription , PricePerNight ,_id} = room;

    const [isOpen, setIsOpen] = useState(false); // Changed initial state to false
    const [startDate, setStartDate] = useState(new Date());
    const { user } = useContext(AuthContext);


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





    return (
        <div>
            <div className="card w-[580px]  ring-1 ring-slate-400  mx-20 mt-10 rounded-none ">
  <figure className="px-10 pt-10">
    <img src={RoomImage} alt="Shoes" className="" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{category}</h2>
    <p>{PricePerNight}</p>
  <p>{RoomDescription}</p>
  
    <div className="card-actions">
    <button className="btn bg-[#043BD4] text-white" onClick={() => setIsOpen(true)}>Book Now</button>
    </div>

  </div>
</div>


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
                                <DatePicker className="border p-2 rounded-md" selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect={false} 
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

export default FeatureRooms;