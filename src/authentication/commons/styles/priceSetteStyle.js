const priceSetterStyle = theme=>(
    {
        container:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            marginBottom:15,
            [theme.breakpoints.down('xs')]:{
                display:'flex',
                flexDirection:'column'
            }
        },
        text_input:{
            width:'70%',
            [theme.breakpoints.down('xs')]:{
                width:'90%'
            }
        },
        label:{
            marginTop:15,
            marginRight:50
        }
    }
)

export default priceSetterStyle