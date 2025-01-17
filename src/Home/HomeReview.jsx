import axios from "axios";
import { useEffect, useState } from "react";


const HomeReview = () => {


    const [review, setReviews] = useState([]);



    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`https://hotel-wave-server.vercel.app/review`);
                setReviews(response.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        fetchReviews();
    }, []);

    console.log(review)
    
    
    return (
        <div>
         {
            review.map(r => r.username)
         }
        </div>
    );
};

export default HomeReview;