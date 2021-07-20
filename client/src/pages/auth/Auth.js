import React, {useState} from 'react';
import useStyles from './styles'

import { Container, Typography, Grid, Paper, Button, Avatar } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import GoogleLogin from 'react-google-login';
import Input from '../auth/Input'
import Icon from './Icon'
import ErrorInput from './ErrorInput';

import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'; //change direct immediately

import {login} from '../../redux/actions/authAction'
import {register} from '../../redux/actions/authAction'
import { GLOBAL_TYPES } from '../../redux/actions/globalTypes';


const initialState={
    name:'', email:'', password: '', address:'', telephone_number:''
}
const Auth=()=>{
    const dispatch= useDispatch()
    const history=useHistory()
    const classes= useStyles()

    const [isSignup, setIsSignup]= useState(false)
    const [formData, setFormData]= useState(initialState)
    const [showPassword, setShowPassword]= useState(false)

    const {alert}= useSelector(state=>state)
    

    const handleChangeInput=e=>{
        const {name, value}= e.target
        setFormData({...formData, [name]: value})
        
    }

    const handleSubmit=e=>{
        e.preventDefault()
        console.log(formData)
        if(isSignup){
            dispatch(register(formData, history))
        } else{
            dispatch(login(formData, history))
        }
        //history.push('/') we send history to action to make sure that login/register successful

    }
    const handleShowPassword=()=>{
        setShowPassword(prevShowPassword=>!prevShowPassword)
    }
    const googleSuccess=async(res)=>{
        const result= res?.profileObj;
        const token= res?.tokenId
        console.log(token, result)
        try{
            dispatch({type: GLOBAL_TYPES.AUTH, payload: {result, token}})
            history.push('/')
        } catch(err){
            dispatch({type: GLOBAL_TYPES.ALERT, payload:{error: err.response.data.msg}})
        }
    }

    const googleFailure=(err)=>{
        dispatch({type: GLOBAL_TYPES.ALERT, 
            payload: {
                err, 
                msg: "Google sign in was unsuccessful! Try again."
            }    
        })
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
                                    <Input name='name' label='Username' handleChangeInput={handleChangeInput} autoFocus color={alert.name?'secondary':'primary'}/>
                                    {alert.name? <ErrorInput alert={alert.name}/> : ''}
                                </>
                            )
                        }
                        <Input name='email' label='Email' handleChangeInput={handleChangeInput} type='email' color={alert.email?'secondary':'primary'} />
                            {alert.email ? <ErrorInput alert={alert.email}/> : ''}
                        <Input name='password' label='Password' handleChangeInput={handleChangeInput} type={showPassword ? 'text': 'password'} handleShowPassword={handleShowPassword}
                        color={alert.password?'secondary':'primary'}
                        />
                            {alert.password ? <ErrorInput alert={alert.password}/> : ''}
                        {
                            isSignup && (
                                <>
                                    <Input name='confirmPassword' label='Repeat your password' handleChangeInput={handleChangeInput} type={showPassword ? 'text': 'password'} 
                                    handleShowPassword={handleShowPassword}
                                    color={alert.cf_password?'secondary':'primary'}
                                    />
                                    {alert.cf_password ? <ErrorInput alert={alert.cf_password}/> : ''}
                                </>
                                
                                
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

