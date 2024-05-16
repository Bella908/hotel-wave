import { Link } from "react-router-dom";


const Room = ({ room }) => {

  const { category, RoomImage, RoomDescription, PricePerNight, _id } = room;

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
          <Link to={`/rooms/${_id}`}>
            <div className="card-actions">
              <button className="btn btn-outline rounded-none mt-8">Find Out More</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Room;