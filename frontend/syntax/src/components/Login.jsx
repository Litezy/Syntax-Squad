import './Register.scss'
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import image from "./../assets/images/students.jpg"
import trustedimage from "./../assets/images/studentstrust.png"



function Register() {
  return (
    <div className='signup-container'>
        <div>
        {/* Form content */}
     <div className='form'>
        <div>
            <h1 className='font-Grotesk heading-register'>Log In</h1>
        </div>
        <div className='form-buttons'>
            <div className='form-google'>
                  <button className='button-google'>Sign up with Google <span><FcGoogle size={30} />
                  </span></button>
            </div>
            <div>
               <button className='button-apple'>Sign up with Apple <span><BsApple size={30} />
               </span></button>
            </div>

        </div>



<div className='option'>
    <p className='option-or'>Or</p>
</div>
<div className='form-inputs'>
 
    <div className='form_second-row'>
        <label>Email</label><br/>
        <input className='email-input' type='email' name='email'  placeholder='Enter your Email'/>  
    </div>
    <div className='form_second-row'>
        <label>Password</label><br/>
        <input className='password-input' type='password' name='password'  placeholder='Enter your Password'/>
    </div>

</div>
</div>
<div className='form-checkbox'>
    <input type="checkbox"  />
    <span className='checkbox-text'>By checking this box, you agree with our terms and conditions</span>
</div>
<div className='form-submit'>
    <button className='signup-button'>Sign Up</button>
    <div className='form-login'>
<p className='login-text'>Already have an account ? <span><a>Login</a></span></p>
</div>
</div>

</div>
<div className='image-container'>
     {/* Image Content */}
     <div className='image'>
        <div>
      <img src={image} alt='Educonnect'/>
      </div>
      <div className='text-overlay'>
        <h1 className='heading-image font-Grotesk'>Ask.Learn.Grow Together.</h1>
        <p className='first-paragraph'>A platform for Africa students to ask questions and share knowledge.</p>
        <p className='second-paragraph'>Create a free account and get access to free eductional resource from peers.</p>
      

      </div>
     </div>
     <img src={trustedimage} alt='trusted image' width={250}/>

    </div>

    </div>

  )
}

export default Register
