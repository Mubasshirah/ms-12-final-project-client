
import { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const {googleSignIn}=useContext(AuthContext);
    const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/'
    const handleGoogleSignIn=()=>{
        googleSignIn()
        .then(result=>{
            const loggedUser=result.user;
            const newUser={name:loggedUser.displayName, email:loggedUser.email}
            fetch('http://localhost:5000/users',{
             method:'POST',
             headers:{
               'content-type':'application/json',
             },
             body:JSON.stringify(newUser)
            })
            .then(res=>res.json())
            .then(()=>{
               

                    navigate(from, { replace: true })
                }
            )
            console.log(loggedUser);
        })
    }
    return (
        <div>
            <div className='divider'></div>
            <div className='text-center my-5'>
            <button onClick={()=>handleGoogleSignIn()} className="btn btn-circle btn-outline">
               <FaGoogle></FaGoogle>
            </button>
            </div>
        </div>
    );
};

export default SocialLogin;