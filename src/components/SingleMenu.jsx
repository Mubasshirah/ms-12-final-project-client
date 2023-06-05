

const SingleMenu = ({singleMenu}) => {
    const {name,recipe,image,price}=singleMenu;
    return (
        <div className="flex space-x-5 items-center">
            <img src={image} alt="" className="w-[100px] h-[100px]" style={{borderRadius:'0px 200px 200px 200px'}}/>
            <div>
                <h3>{name}</h3>
                <p className="">{recipe}</p>
            </div>
            <p className="text-yellow-500">{price}</p>
        </div>
    );
};

export default SingleMenu;