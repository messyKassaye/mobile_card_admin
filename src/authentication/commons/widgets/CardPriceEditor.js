import React from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import LoadingButton from '../LoadingButton';
import {updateCardPrice,} from '../state/action/cardPriceAction'
import {connect} from 'react-redux'
import { Typography } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import {showMainDialog} from '../../commons/state/action/dialogAction'
class CardPriceEditor extends React.Component{

    constructor(props) {
        super(props);
        
        this.state ={
            formData:{
                id:'',
                price:''
            }
        }
    }

    componentDidMount(){
        const {formData} = this.state
        formData['id'] = this.props.cardPrice.id
        formData['price'] =this.props.cardPrice.price
        this.setState(formData)
    }

    handleChange = event=>{
        const {formData} = this.state
        formData[event.target.name] = event.target.value
        this.setState(formData)
    }

    handleSubmit=()=>{
        this.setState({
            submitted:true,
            loading:true
        })
        const {formData} = this.state
        this.props.updateCardPrice(this.props.cardPrice.id,formData)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
            this.setState({
                loading: false,
                finished: false,
                submitted: false,
            })
            setTimeout(()=>{
                this.props.showMainDialog({'show':false,'page':null,'title':'',actions:{on:false,path:'',id:''}})
            },2000)

        }
    }
    
    render(){

        const {formData} = this.state
        const { loading } = this.state;
        const finished = false
        const setLoading = !finished && loading;
        const isEnabled = formData.price>0

        return <ValidatorForm 
                        onSubmit={this.handleSubmit}
                        style={{marginLeft:50,marginRight:50}}>
                            <Typography style={{color:green[500]}}>{this.props.response.message}</Typography>
                    <TextValidator
                        onChange={this.handleChange}
                        label={`Price`}
                        name={'price'}
                        type={'number'}
                        style={{marginTop:-10}}
                        value={this.state.formData.price}
                        validators={['required']}
                        errorMessages={[`Please enter price for ${this.props.cardPrice.card_type.value} Birr card`]}
                        style={{width:"100%"}}
                        />

                    <LoadingButton
                            style={{width:'100%',marginTop:15}}
                            color="primary"
                            variant="contained"
                            type="submit"
                            loading={setLoading}
                            done={finished}
                            text={'Update price'}
                            disabled={!isEnabled ||this.state.submitted}
                        >
                            {
                                'Update price'
                            }
                        </LoadingButton>
        </ValidatorForm>
    }
}

const mapStateToProps = state=>({
    response:state.authReducer.commonReducer.cardPriceReducer.updateResponse
})

export default connect(mapStateToProps,{updateCardPrice,showMainDialog})(CardPriceEditor)