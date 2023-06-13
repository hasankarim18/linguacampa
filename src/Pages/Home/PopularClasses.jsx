import useDataProvider from "../../Hooks/useDataProvider";
import HeadLine from "../../Utils/HeadLine";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import {motion} from 'framer-motion'





const PopularClasses = () => {

    const { popularClasses, popularClasesLoading } = useDataProvider();

      console.log(popularClasses);
      console.log('loading',popularClasesLoading);
  
    
    return (
      <div className="mt-16">
        <div className="">
          <div className="h-full w-full flex items-center justify-center">
            <HeadLine>Most Popular Classes</HeadLine>
          </div>
          <div>
            {popularClasesLoading ? (
              <>
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Box>
                      <Skeleton sx={{ height: 300 }} />
                      <Skeleton />
                      <Skeleton width="60%" />
                    </Box>
                    <Box>
                      <Skeleton sx={{ height: 300 }} />
                      <Skeleton />
                      <Skeleton width="60%" />
                    </Box>
                    <Box>
                      <Skeleton sx={{ height: 300 }} />
                      <Skeleton />
                      <Skeleton width="60%" />
                    </Box>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" >
                 {
                    popularClasses.map((item) => {                    
                        return (
                          <motion.div
                            transition={{
                              ease: "linear",
                              duration: 1,
                              y: { duration: 1 },
                            }}
                            initial={{y  : 300, opacity: 0.3 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            key={item._id}
                            className="card bg-base-100 shadow-xl"
                          >
                            <figure>
                              <img
                                src={item.classImage}
                                className="h-64 w-full"
                                alt="Shoes"
                              />
                            </figure>
                            <div className="card-body">
                              <h2 className="card-title">
                                {item.className}
                                <div className="badge badge-secondary">
                                  Popular
                                </div>
                              </h2>
                              <p>
                                Instructor Name:{" "}
                                <span className="font-semibold">
                                  {item.instructorName}
                                </span>
                              </p>
                              <p className="mt-2">
                                Total Seats:{" "}
                                <span className="font-bold">{item.seats}</span>
                              </p>
                              <p className="mt-2">
                                Seats Left:{" "}
                                <span className="font-bold">
                                  {item.seats - item.enrolledStudents}
                                </span>
                              </p>
                              <p className="mt-2">
                                Price:{" "}
                                <span className="font-bold">{item.price}</span>
                              </p>
                              <div className="card-actions justify-end">
                                {/* <div className="badge badge-outline">
                                  Fashion
                                </div>
                                <div className="badge badge-outline">
                                  Products
                                </div> */}
                              </div>
                            </div>
                          </motion.div>
                        );
                    })
                 }
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
};

export default PopularClasses;