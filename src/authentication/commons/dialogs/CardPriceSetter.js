import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import {connect} from 'react-redux'
import HorizontalLoading from '../loading/HorizontalLoading'
import LoadingButton from '../LoadingButton'
import {indexCardType} from '../state/action/cardTypeAction'
import withStyles from '@material-ui/core/styles/withStyles'
import priceSetterStyle from '../styles/priceSetteStyle'
import {showMainDialog} from '../../commons/state/action/dialogAction'
import {storeCardPrice,updateCardPrice} from '../state/action/cardPriceAction'
import { green } from '@material-ui/core/colors'
class CardPriceSetter extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            formData:{
                'percentage':''
            },
        }
    }
    
    componentDidMount(){
        if(this.props.form.type==='edit'){
            const {formData} = this.state
            formData['percentage'] = this.props.form.data.percentage
            this.setState(formData)
        }

    }

    handleChange = event=>{
        const {formData} = this.state
        formData[event.target.name] = event.target.value
        this.setState(formData)
    }

    handleSubmit = ()=>{
        this.setState({
            submitted:true,
            loading:true
        })
       if(this.props.form.type==='edit'){
        const {formData} = this.state
        this.props.updateCardPrice(this.props.cardPrice.id,formData)
       }else{
        const {formData} = this.state
        this.props.storeCardPrice(formData)
       }
        
    }

    

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status||nextProps.updateResponse.status){
            this.setState({
                loading: false,
                finished: false,
                submitted: false,
            })
            setTimeout(()=>{
                window.location.reload()
                this.props.showMainDialog({'show':false,'page':null,'title':'',actions:{on:false,path:'',id:''}})
            },2000)

        }
    }

    render(){
        const {classes} = this.props
        const {formData} = this.state
        const { loading } = this.state;
        const finished = false
        const setLoading = !finished && loading;
        const isEnabled = formData.percentage>0

        return <div>
             <ValidatorForm onSubmit={this.handleSubmit}>
                 <Typography style={{color:green[500],marginBottom:15}}>
                     {`${this.props.response.message} ${this.props.updateResponse.message}`}
                 </Typography>
                            <TextValidator
                             onChange={this.handleChange}
                             label={`Enter your  gaining percentage E.g 90 ,86`}
                             name={'percentage'}
                             type={'number'}
                             style={{marginTop:-10}}
                             value={this.state.formData.percentage}
                             validators={['required']}
                             errorMessages={[`Please enter how much percent do you gain`]}
                             className={classes.text_input}        
                             />
                           

                        <LoadingButton
                            style={{width:'100%',marginTop:15}}
                            color="primary"
                            variant="contained"
                            type="submit"
                            loading={setLoading}
                            done={finished}
                            text={'Set price'}
                            disabled={!isEnabled ||this.state.submitted}
                        >
                            {
                                'Set price'
                            }
                        </LoadingButton>
                        </ValidatorForm>
        </div>
    }
}

const mapStateToProps = state=>({
    response:state.authReducer.commonReducer.cardPriceReducer.response,
    updateResponse:state.authReducer.commonReducer.cardPriceReducer.updateResponse,
    
})
export default withStyles(priceSetterStyle)(connect(mapStateToProps,{showMainDialog,storeCardPrice,updateCardPrice})(CardPriceSetter))