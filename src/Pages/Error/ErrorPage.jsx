import { Link, useRouteError } from "react-router-dom";
import Lottie from "lottie-react";
import error2 from "../../../public/animation/error.json";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      className="w-screen h-screen flex justify-center items-center text-center "
      id="error-page"
    >
      <div className="flex flex-col gap-4 ">
        
        <div className="">
          <Lottie animationData={error2} />
          {/* <SentimentVeryDissatisfiedIcon
            sx={{ fontSize: 140 }}
            color="secondary"
          /> */}
        </div>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <div>
          <Link
            to="/"
            className="py-4 px-12 inline-block bg-darkNavyBlue  text-white text-xl rounded-lg border-4 border-darkNavyBlue hover:bg-transparent transition-all hover:text-black "
          >
            {" "}
            Back To Home{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
