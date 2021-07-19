import { Container, Typography, Grid, Paper, Button, Avatar } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import GoogleLogin from 'react-google-login';
import Input from '../auth/Input'
import Icon from './Icon'
import React, {useState} from 'react';
import useStyles from './styles'


import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom'; //change direct immediately


const initialState={
    name:'', email:'', password: '', address:'', telephone_number:''
}
const Auth=()=>{
    // const dispatch= useDispatch()
    // const history=useHistory()
    const classes= useStyles()

    const [isSignup, setIsSignup]= useState(false)
    const [formData, setFormData]= useState(initialState)
    const [showPassword, setShowPassword]= useState(false)

    const handleChangeInput=e=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit=e=>{
        e.preventDefault()

    }
    const handleShowPassword=()=>{
        setShowPassword(prevShowPassword=>!prevShowPassword)
    }
    const googleSuccess=()=>{

    }
    const googleFailure=()=>{

    }
    const switchMode=()=>{
        setIsSignup(prevIsSignup=>!prevIsSignup)
    }

    return (
        <Container component= 'main' minWidth= 'xs' maxWidth="sm">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography variant='h5' >
                    {isSignup? 'Sign up': 'Sign in'}
                </Typography>

                <form className={classes.form} onSubmit= {handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name='name' label='Username' onChange={handleChangeInput} autoFocus />
                                </>
                            )
                        }
                        <Input name='email' label='Email' onChange={handleChangeInput} type='email'  />
                        <Input name='password' label='Password' handleChange={handleChangeInput} type={showPassword ? 'text': 'password'} handleShowPassword={handleShowPassword}/>
                        {
                            isSignup && (
                                <Input name='confirmPassword' label='Repeat your password' onChange={handleChangeInput} type={showPassword ? 'text': 'password'} handleShowPassword={handleShowPassword}/>
                            )
                        }    
                    </Grid>
                    
                    <Button className={classes.submit}
                        type='submit' fullWidth variant='contained' color='primary' >
                        {isSignup ? 'Sign up': 'Sign in'}
                    </Button>

                    <GoogleLogin 
                        clientId='121685091599-rsvndn81vhvcfoblo5d6vf6va8vv4vhs.apps.googleusercontent.com'
                        render={(renderProps)=>(
                            <Button color= 'primary'
                            variant='contained'
                            fullWidth 
                            onClick={renderProps.onClick}
                            disable={renderProps.disable}
                            startIcon={<Icon/>}
                            className={classes.googleButton}
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />

                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {
                                    isSignup ? 'Already have an account? Sign in': "Don't have an account? Sign up"
                                }
                            </Button>
                            
                        </Grid>
                    </Grid>
                </form>
            </Paper>

        </Container>

    )

}

export default Auth

