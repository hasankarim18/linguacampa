import { Box, Skeleton } from "@mui/material";
import useDataProvider from "../../Hooks/useDataProvider";
import HeadLine from "../../Utils/HeadLine";
import { Helmet } from "react-helmet-async";

const Instructors = () => {
  const { PopularInstructor, popularInstructorLoading } = useDataProvider();

  return (
    <div className="mt-16 siteContainer ">
      <Helmet>
        <title>Instructors | LinguaCampa</title>
      </Helmet>
      <div className="">
        <HeadLine>Our Most Popular Insturctors</HeadLine>
      </div>
      <div>
        <div className="mt-16">
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
              <div className="grid text-darkNavyBlue dark:bg-darkNavyBlue dark-text-white grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {PopularInstructor.map((item) => {
                  return (
                    <div
                      key={item.info._id}
                      className="card bg-base-100 shadow-xl dark:bg-darkNavyBlue dark:border dark:text-white"
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
                        <h2 className="card-title">
                          Instructor Email: {item.info.email}
                        </h2>
                        <p className="mt-2 font-semibold">
                          Number Of Students: {item.totalEnrolledStudents}
                          <span className="font-bold">
                            {/* {item.seats - item.enrolledStudents} */}
                          </span>
                        </p>
                      </div>
                    </div>
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

export default Instructors;
