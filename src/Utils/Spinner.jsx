import classes from './Spinner.module.css'

const Spinner = () => {
    return (
      <div className="w-full h-screen -mt-20 flex items-center justify-center">
        <div className={classes.loader}>Loading...</div>
      </div>
    );
};

export default Spinner;