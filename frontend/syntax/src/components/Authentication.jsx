import './Authentication.scss'
function Authentication() {
  return (
    <div className='authentication-container'>
        <div>
       <div> 
      <h1 className="font-Grotesk authentication-heading">Enter Aunthentication Code</h1>
      <p className='email-message'>We have sent the verification code to your email 
      tolubammy04@gmail.com</p>
      </div>
      <div>
        <h2 className="font-Grotesk code-heading">Enter Verification Code</h2>
      </div>
      <div>
        <div>
        <p>Numbers</p>
        </div>
        <div>
            <p>Didnt Receive Code? <span>Resend</span></p>
        </div>
       
    
      </div>
      <div>
            <button className='verification-button'>Verify Account</button>
        </div>
        </div>
    </div>
  )
}

export default Authentication
