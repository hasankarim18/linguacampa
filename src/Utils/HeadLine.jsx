

const HeadLine = ({children}) => {
    return (
        <div className="my-8">
            <h2 className="text-3xl md:text-5xl text-center">{children}</h2>
        </div>
    );
};

export default HeadLine;