import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";


const RoomDetails = () => {
    const room = useLoaderData();
    const {user} = useContext(AuthContext);


    console.log(user)
    const{category , RoomImage ,RoomDescription , PricePerNight , RoomSize} = room;
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
                    <div className=" flex gap-10 text-xl">

                <p>price : {PricePerNight}</p>
                <p> size : {RoomSize}</p>
               
                    </div>

                </div>
            </div>
                    <div className=" my-10 ml-20">
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>Book Now</button>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">{category}</h3>
    <p className="py-4"><p>price : {PricePerNight}</p></p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
                    </div>



            <div className="ml-20">
                <h4 className="text-3xl font-Briem text-center">Reviews</h4>

            <textarea className="textarea textarea-primary mt-10 w-[500px]" placeholder={`Post a review as ${user.displayName}`}></textarea>
            </div>

           
            </div>
        </div>
    );
};

export default RoomDetails;