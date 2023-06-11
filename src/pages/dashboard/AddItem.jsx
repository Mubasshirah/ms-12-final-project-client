import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const imgHostingKey=import.meta.env.VITE_img_hosting_key;

const AddItem = () => {
    const [axiosSecure]=useAxiosSecure();
    const { register, handleSubmit, watch, formState: { errors },reset } = useForm();
    const imgHostingURL=`https://api.imgbb.com/1/upload?key=${imgHostingKey}`
    const onSubmit = data => {
        const formData= new FormData();
        formData.append('image',data.image[0])
        fetch(imgHostingURL,{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(imgResponse=>{
            if(imgResponse.success){
                const imgURL=imgResponse.data.display_url;
                const {name,category,price,recipe}=data;
                const newItem={name,category,price:parseFloat(price),recipe,image:imgURL}
                console.log(newItem);
                axiosSecure.post('/menu', newItem)
                .then(data=>{
                    console.log('after posting new menu item',data.data)
                    if(data.data.insertedId){
                        reset();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                })
            }
        })
    };
  
    console.log(watch("example")); 
    console.log(imgHostingKey)
    return (
        <div className="w-full px-10">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full max-w-lg">
                    <label className="label">
                        <span className="label-text">Recipe name</span>

                    </label>
                    <input {...register("name", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-lg" />

                </div>
                <div className="form-control w-full max-w-lg">
                    <label className="label">
                        <span className="label-text">Category</span>

                    </label>
                    <select defaultValue='Select One' {...register("category", { required: true })} className="select select-bordered">
                        <option disabled >Pick One</option>
                        <option>pizza</option>
                        <option>salad</option>
                        <option>soup</option>
                        <option>dessert</option>
                        <option>drinks</option>
                    </select>

                </div>
                <div className="form-control w-full max-w-lg">
                    <label className="label">
                        <span className="label-text">Price</span>

                    </label>
                    <input {...register("price", { required: true })} type="number" placeholder="Type here" className="input input-bordered w-full max-w-lg" />

                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your bio</span>
                        
                    </label>
                    <textarea {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
              </div>
              <div>
              <input {...register("image", { required: true })}  type="file" className="file-input file-input-bordered w-full max-w-lg" />
              </div>

              <div>
                <input className="btn btn-ghost" type="submit" value="Add Item" />
              </div>
            </form>
        </div>
    );
};

export default AddItem;