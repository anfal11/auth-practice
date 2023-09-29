import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const acceptedTerms = e.target.terms.checked;
    console.log(name, email, password);
    if (password.length < 6) {
      setRegisterError("Password must be at least 6 characters long");
      return;
    } else if (!/^(?=.*[A-Z])(?=.*[0-9])/.test(password)) {
      setRegisterError(
        "Password must contain at least one uppercase letter and one number"
      );
      return;
    } else if (!acceptedTerms) {
      setRegisterError("You must accept our terms and conditions");
      return;
    }
    setRegisterError("");
    setSuccess("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess("Account created successfully");

        // update profile
        updateProfile(result.user, {
          displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {
          console.log("profile updated");
        }).catch((error) => {
          console.log(error);
        });


        // send verification email

        sendEmailVerification(result.user)
        .then(() => {
          console.log("email sent");
          Swal.fire({
            title: 'Please verify your account and check your email',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        });
      })
      .catch((error) => {
        console.log(error.message);
        setRegisterError(error.message);
      });
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10 underline">
        {" "}
        Register from here
      </h1>
      <section className="flex justify-center items-center mt-10">
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="enter your name"
            className="input input-bordered input-accent w-full max-w-xs"
            required
          />{" "}
          <input
            type="email"
            name="email"
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
            />
            <span
              className="absolute right-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>{" "}
          </div>
          <br />
          <div>
            <input type="checkbox" name="terms" id="terms" />
            <label className="ml-2" htmlFor="terms">
              Accept our<a href="">terms and conditions</a>
            </label>
          </div>
          <br />
          <div className="flex justify-center">
            <input
              className="btn btn-outline btn-accent"
              type="submit"
              value="Register"
            />
          </div>
        </form>
      </section>
      {registerError && (
        <p className="text-center text-xl font-serif font-medium italic text-red-800">
          {registerError}
        </p>
      )}
      {success && (
        <p className="text-center text-xl font-serif font-medium italic text-emerald-800">
          {success}
        </p>
      )}
      <p className="flex justify-center items-center mt-2">
        {" "}
        Already have an account? Please{" "}
        <Link className="ml-1 underline hover:text-red-600" to="/login">
          {" "}
          Log In{" "}
        </Link>
      </p>
    </div>
  );
};

export default Register;
