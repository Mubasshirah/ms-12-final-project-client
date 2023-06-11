import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";


const Register = () => {
  const navigate=useNavigate();
    const {createUser ,updateUserPofile}=useContext(AuthContext);
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
        createUser(data.email,data.password)
        .then(result=>{
            const createdUser=result.user;
            console.log(createdUser);
           updateUserPofile(data.name,data.photourl) 
           .then(()=>{
            const newUser={name:data.name, email:data.email}
             fetch('http://localhost:5000/users',{
              method:'POST',
              headers:{
                'content-type':'application/json',
              },
              body:JSON.stringify(newUser)
             })
             .then(res=>res.json())
             .then(data=>{
              if(data.insertedId){

                reset();
                Swal.fire({
                 position: 'top-end',
                 icon: 'success',
                 title: 'A new user has been added',
                 showConfirmButton: false,
                 timer: 1500
               })
              }
             })
             navigate('/');
           })
           .catch(error=>console.log(error))
        })
        }
   
    // const handleSignUp=event=>{
    //     event.preventDefault();
    //     const form=event.target;
    //     const name=form.name.value;
    //     const email=form.email.value;
    //     const password=form.password.value;
    //     console.log(email,password);
    // }
    return (
       <>
        <Helmet>
                <title>Bistro Boss | Register</title>

            </Helmet>
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col  md:w-1/2">
    <div className="text-center  lg:text-left">
      <h1 className="text-5xl font-bold">Register now!</h1>
      
    </div>
    <div className="card flex-shrink-0 md:w-full max-w-lg shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)}> 

      <div className="card-body ">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name="name" {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
          {errors.name && <span>This field is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">photoURL</span>
          </label>
          <input type="text" name="photourl" {...register("photourl", { required: true })} placeholder="photourl" className="input input-bordered" />
          {errors.photourl && <span>This field is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
          {errors.email && <span>This field is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" {...register("password", { required: true ,
            minLength:6,
            pattern:/(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
            })} 
            placeholder="password" className="input input-bordered" />
          {errors.password?.type==='required' && <span>This field is required</span>}
          {errors.password?.type==='minLength' && <span>This field has 6 character</span>}
          {errors.password?.type==='pattern' && <span>This field has 6 character and uppercase</span>}
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
      
        <div className="form-control mt-6">
        <input className='btn btn-primary' type="submit" value="Register"   />
        </div>
      </div>
      </form>
      <div className="text-center mb-5 ">
        <p>Already a member!<Link className="text-primary" to='/login'>Login</Link></p> 
      </div>
    </div>
  </div>
</div>
       </>
    );
};

export default Register;