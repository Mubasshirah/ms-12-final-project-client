import Swal from "sweetalert2";
import useCart from "../../hooks/useCart";
import { Link } from "react-router-dom";


const MyCart = () => {
    const [cart,refetch] = useCart();
    const total = cart.reduce((sum, item) => item.price + sum, 0);
    const handleDelete=item=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              fetch(`http://localhost:5000/carts/${item._id}`,{
                method: "DELETE"
              })
              .then(res=>res.json())
              .then(data=>{
                if(data.deletedCount>0){
                    refetch();
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                }
              })
            }
          })
    }
    return (
        <div className="w-full ">
            <div className="flex justify-evenly items-center py-10 text-1xl font-semibold">
                <h3>total product: {cart.length}</h3>
                <h3>total price: {total}</h3>
                <Link to="/dashboard/payment" className="btn btn-info">pay</Link>
            </div>
            <div className="">
                <table className="table w-full ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Food</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((row,index)=>
                             <tr key={row._id}>
                             <td>
                                {index+1}
                             </td>
                             <td>
                                 <div className="flex items-center space-x-3">
                                     <div className="avatar">
                                         <div className="mask mask-squircle w-12 h-12">
                                             <img src={row.image} alt="Avatar Tailwind CSS Component" />
                                         </div>
                                     </div>
                                    
                                 </div>
                             </td>
                             <td>
                                {row.name}
                             </td>
                             <td >${row.price}</td>
                             <td>
                                 <button onClick={()=>handleDelete(row)} className="btn btn-ghost btn-xs">Delete</button>
                             </td>
                         </tr>
                            )}
                       
                        
                    </tbody>
                  
                  
                </table>
            </div>
        </div>
    );
};

export default MyCart;