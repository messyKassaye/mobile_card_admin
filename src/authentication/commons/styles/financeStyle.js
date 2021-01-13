const financeStyle = theme=>({
    finance:{
        display:'flex',
        [theme.breakpoints.down('xs')]:{
            display:'none'
        }
    }
})

export default financeStyle