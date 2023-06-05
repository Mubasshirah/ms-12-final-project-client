import Banner from "./Banner";
import BistroAbout from "./BistroAbout";
import OrderCategory from "./OrderCategory";
import PopularMenu from "./PopularMenu";
import Testimonial from "./Testimonial";
import { Helmet } from 'react-helmet-async';


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>

            </Helmet>
            <Banner></Banner>
            <OrderCategory></OrderCategory>
            <BistroAbout></BistroAbout>
            <PopularMenu></PopularMenu>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;