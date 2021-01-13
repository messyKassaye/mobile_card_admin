import React,{Component} from 'react'
import { Typography } from '@material-ui/core'

class LogoComponent extends React.Component{

    render(){

        return <div style={{display:"flex",flexDirection:'row',justifyContent:'center',margin:this.props.margin}}>
            <Typography variant={this.props.variant} style={{color:this.props.firstColor,}}>E</Typography>
            <Typography variant={this.props.variant} style={{color:this.props.secondColor}}>Card</Typography>
        </div>
    }
}

export default LogoComponent;