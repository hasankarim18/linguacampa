import Banner from "./Banner";
import PopularClasses from "./PopularClasses";


const Home = () => {
    return (
        <div className="relative z-0">
            <div className="my-3 siteContainer">
                <Banner />
                <PopularClasses />
            </div>
        </div>
    );
};

export default Home;