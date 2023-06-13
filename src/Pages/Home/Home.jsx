
import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import PopularClasses from "./PopularClasses";
import PopularInstructor from "./PopularInstructor";
import Testimonials from "./Testimonials";


const Home = () => {
   
    return (
        <div className="relative z-0">
            <Helmet> 
                <title>Home | LinguaCampa</title>
            </Helmet>
            <div className="my-3 siteContainer">
                <Banner />
                <PopularClasses />
                <PopularInstructor />
                <Testimonials />
            </div>
        </div>
    );
};

export default Home;