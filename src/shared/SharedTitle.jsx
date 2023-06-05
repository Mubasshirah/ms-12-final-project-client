

const SharedTitle = ({heading,subHeading}) => {
    return (
        <div className="md:w-4/12 w-1/2 my-8 mx-auto">
           <p className="text-yellow-500 text-center">--- {subHeading} ---</p> 
           <h3 className="text-4xl uppercase text-center border-y-2 py-4">{heading}</h3>
        </div>
    );
};

export default SharedTitle;