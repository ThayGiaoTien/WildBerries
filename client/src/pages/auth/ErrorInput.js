import { Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'

const ErrorInput = ({alert}) => {
    const classes= useStyles()
    return (
        <Typography className={classes.errorAlert}>{alert}</Typography>
    )
}

export default ErrorInput
