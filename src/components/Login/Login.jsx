import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import auth from "../../firebase/firebase.config";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

    const [logInError, setLogInError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState('');
    const emailRef = useRef(null);


    const handleLogIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        setLogInError('');
        setSuccess('');

    signInWithEmailAndPassword(auth, email, password)
  .then((result) => {

    const user = result.user;
    console.log(user);
    if(user.emailVerified){
        setSuccess('Log In successful');
    } else {
        setLogInError('Please verify your email first');
    }
  })
  .catch((error) => {
    console.log(error);
    setLogInError('Log In failed check your email and password carefully');
  });
    }

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if(email === '' || !email){
        console.log('forget password clicked', emailRef.current.value);
            return; 
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)){
        console.log("need valid email");
        setLogInError('Please enter a valid email address');
        return;
    }

    sendPasswordResetEmail(auth, email)
  .then((result) => {
    console.log(result);
    setSuccess('Reset password email sent successfully');
  })
  .catch((error) => {
        console.log(error);
    
  });
        
    }

    return (
        <div>
            <h1 className='text-3xl font-bold text-center pt-10 underline'> Log In from here </h1>
         
           <section className="flex justify-center items-center mt-10">
        <form onSubmit={handleLogIn}>
          <input
            type="email"
            name="email"
            ref={emailRef}
            placeholder="enter your email"
            className="input input-bordered input-accent w-full max-w-xs"
            required
          />{" "}
          <br /> <br />
          <div className="flex items-center relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="enter your password"
            className="input input-bordered input-accent w-full max-w-xs"
          /><span className="absolute right-1" onClick={()=> setShowPassword(!showPassword)}>
            {
            showPassword? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
            }
          </span>{" "}
          </div> 
          <br />

          <label className="label">
            <a href="#" className="label-text-alt link link-hover" onClick={handleForgetPassword}>Forgot password?</a>
          </label>
          <br />
          <div className="flex justify-center">
            <input
              className="btn btn-outline btn-accent"
              type="submit"
              value="Log In"
            />
          </div>
        </form>
      </section>
      {
            logInError && <p className="text-red-500 text-center mt-2">{logInError}</p>
      }
      {
            success && <p className="text-green-500 text-center mt-2">{success}</p>
      }
      <p className="flex justify-center items-center mt-2"> New to this website? Please <Link className="ml-1 underline hover:text-red-600" to='/register'> Register </Link></p>
      </div>
    
    );
};

export default Login;