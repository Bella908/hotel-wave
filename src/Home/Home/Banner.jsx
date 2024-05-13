import main2 from '../../../src/assets/main2.mp4'


const Banner = () => {
    return (
        <div className='relative'>
         <video src={main2} autoPlay loop></video>
        
        </div>
    );
};

export default Banner;