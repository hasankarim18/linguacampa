import { Box, Skeleton } from "@mui/material";
import useDataProvider from "../../Hooks/useDataProvider";
import HeadLine from "../../Utils/HeadLine";
import { motion } from "framer-motion";

const PopularInstructor = () => {

    const { PopularInstructor,
      popularInstructorLoading} = useDataProvider()


    return (
      <div className="mt-16">
        <div className="siteConainer">
          <HeadLine>Our Most Popular Insturctors</HeadLine>
        </div>
        <div>
          <div>
            {popularInstructorLoading ? (
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {PopularInstructor.splice(0,6).map((item) => {
                    return (
                      <motion.div                         
                        transition={{
                          ease: "linear",
                          duration: 1,
                          y: { duration: 1 },
                        }}
                        initial={{ y: 300, opacity: 0.3 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        key={item.info._id}
                        className="card bg-base-100 shadow-xl"
                      >
                        <figure>
                          <img
                            src={item.info.photo}
                            className="h-64 w-full"
                            alt="Shoes"
                          />
                        </figure>
                        <div className="card-body">
                          <h2 className="card-title">
                            Instructor Name: {item.info.name}
                          </h2>
                          <p className="mt-2 font-semibold">
                            Number Of Students: {item.totalEnrolledStudents}
                            <span className="font-bold">
                              {/* {item.seats - item.enrolledStudents} */}
                            </span>
                          </p>
                          
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
};

export default PopularInstructor;