const valid=({name, email, password, cf_password})=>{
    const err= {}
    // check name 
    // if(!name) {
    //     err.name="Please add your name."
    // } else 
    if(name.length>25){
        err.name="Name is up to 25 characters."
    }
    // check email
    // if(!email) {
    //     err.email="Please add your email."
    // } else 
    if(!validateEmail){
        err.email= "Email format is incorrect."
    }

    // check password and confirm_password
    // if(!password){
    //     err.password= "Please add your password."
    // } else 
    if(password.length<6){
        err.password= "Password must be at least 6 characters."
    } 
    if(cf_password!== password){
        err.cf_password="Confirm password did not match."
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length
    }
}

const validateEmail=(email)=>{
    //eslint-disable-next-line
    const re=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

export default valid
