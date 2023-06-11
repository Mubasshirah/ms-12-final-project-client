import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useCart from "../hooks/useCart";



const FoodCard = ({ item }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [,refetch ]=useCart();
  const location = useLocation();
  const { _id, name, recipe, image, price } = item;
  const handleAddToCart = item => {
    console.log(item)
    if (user && user.email) {
      const orderedItem={foodId:_id,name,image,price,email:user.email};
      console.log(orderedItem)
      fetch('http://localhost:5000/carts', {
        method: "POST",
        headers: {
          'content-type':'application/json'
          },
          body:JSON.stringify(orderedItem)
      })
        .then(res => res.json())
        .then(data => {
          
          if (data.insertedId) {
          refetch();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Added to cart',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
    }
    else {
      Swal.fire({
        title: 'please login!',

        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK!'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } })
        }
      })
    }
  }
  return (
    <div className="card  bg-base-100 shadow-xl">
      <figure><img src={image} alt="Shoes" className="image-full" /></figure>
      <p className="bg-black mx-5 my-5 px-4 py-2 rounded-md text-white absolute right-0">{price}</p>
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title ">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button onClick={() => { handleAddToCart(item) }} className="btn btn-outline border-0 bg-slate-100 border-orange-400 border-b-4 mt-4 mb-8">Add to cart</button>
        </div>
      </div>

    </div>
  );
};

export default FoodCard;