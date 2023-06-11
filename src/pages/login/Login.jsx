import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SocialLogin from '../../shared/SocialLogin';

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/'

  const handleLogin = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: 'user login successful',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      })
      navigate(from, { replace: true })
  }
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, [])
  //     const handleValidateCapcha=()=>{
  // const value=captchaRef.current.value;
  // if(validateCaptcha(value)){
  //   setDisabled(false);
  // }
  //   else{
  //     setDisabled(true);
  //   }

  // console.log(value);
  //     }

  const handleValidateCapcha = (e) => {
    const value = e.target.value;
    if (validateCaptcha(value)) {
      setDisabled(false);
    }
    else {
      setDisabled(true);
    }

    console.log(value);
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col  md:w-1/2">
        <div className="text-center  lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>

        </div>
        <div className="card flex-shrink-0 md:w-full max-w-lg shadow-2xl bg-base-100">
          <form onSubmit={handleLogin}>

            <div className="card-body ">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  < LoadCanvasTemplate />
                </label>
                <input type="text" onBlur={handleValidateCapcha} placeholder="please enter above captcha" className="input input-bordered" />
                {/* <input  type="text"  ref={captchaRef}  placeholder="please enter above captcha" className="input input-bordered" /> */}
                {/* <button onClick={handleValidateCapcha} className='btn btn-outline p-5 m-5'>Validate</button> */}

              </div>
              <div className="form-control mt-6">
                <input className='btn btn-primary' type="submit" value="Login" disabled={false} />
              </div>
            </div>
          </form>
          <div className="text-center mb-5 ">
            <p>New here! <Link className='text-primary' to='/register'>Register</Link></p>
          </div>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;