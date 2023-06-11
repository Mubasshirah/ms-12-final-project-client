import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const AllUser = () => {
    const [axiosSecure]=useAxiosSecure()
    const {data:users=[],refetch}=useQuery(['users'],async ()=>{
const res=await axiosSecure.get('/users')
return res.data;
    })
    const handleDelete=user=>{
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
              fetch(`http://localhost:5000/users/${user._id}`,{
                method: "DELETE"
              })
              .then(res=>res.json())
              .then(data=>{
                if(data.deletedCount>0){
                    refetch();
                    Swal.fire(
                        'Deleted!',
                        'this user has been deleted.',
                        'success'
                      )
                }
              })
            }
          })
    }
    const handleRoleChange=user=>{
        fetch(`http://localhost:5000/users/admin/${user._id}`,{
            method: 'PATCH'
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.modifiedCount){
                // refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is admin now!`,
                    showConfirmButton: false,
                    timer: 1500
                  })  
            }
        })
    }
    return (
        <div>
            <h1 className="text-3xl">Total User: {users.length}</h1>
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user,index)=>
         <tr key={user._id}>
         <td>{index+1}</td>
         <td>{user.name}</td>
         <td>{user.email}</td>
         <td>{user.role ==='admin' ? 'admin' :   
         <button onClick={()=>handleRoleChange(user)} className="btn btn-ghost btn-xs">user</button>}
         </td>
         <td><button onClick={()=>handleDelete(user)} className="btn btn-ghost btn-xs">Delete</button>
                             </td>
       </tr>
        )}
     
      
     
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default AllUser;