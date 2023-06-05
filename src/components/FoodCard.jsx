

const FoodCard = ({item}) => {
    const {name,recipe,image,price}=item;
    return (
        <div className="card  bg-base-100 shadow-xl">
  <figure><img src={image} alt="Shoes" className="image-full"/></figure>
  <p className="bg-black mx-5 my-5 px-4 py-2 rounded-md text-white absolute right-0">{price}</p>
  <div className="card-body text-center">
    <h2 className="card-title text-center">{name}</h2>
    <p>{recipe}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-ghost border-0 border-b-2">Add to cart</button>
    </div>
  </div>
  
</div>
    );
};

export default FoodCard;