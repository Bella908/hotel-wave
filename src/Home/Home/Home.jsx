
import NewsLatter from "../NewsLatter";
import Banner from "./Banner";
import FeatureRoom from "./FeatureRoom";
import Map from "./Map";




const Home = () => {
    
    return (
        <div>
            <Banner></Banner>
            <FeatureRoom></FeatureRoom>
           
            <NewsLatter></NewsLatter>
            <Map></Map>
            
        </div>
    );
};

export default Home;