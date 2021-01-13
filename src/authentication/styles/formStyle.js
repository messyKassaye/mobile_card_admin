
const  formStyle = theme=>({
    form:{
        paddingLeft: 150,
        paddingRight: 150,
        [theme.breakpoints.down('xs')]:{
            marginTop: -40,
            paddingLeft: 0,
            paddingRight: 0,
        }
    },
    text_input:{
        width:'80%',
        marginBottom:20,
        textTransform:'none'
    }
})

export default formStyle

