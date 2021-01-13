import React from 'react'
import {connect} from 'react-redux'
import {indexCardType} from '../../commons/state/action/cardTypeAction'
import HorizontalLoading from '../../commons/loading/HorizontalLoading'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import LoadingButton from '../../commons/LoadingButton';
import {indexPaymentTypes} from '../../commons/state/action/paymentTypeAction'
import PaymentTypes from '../../commons/PaymentTypes';
import {indexCardPrice} from '../../commons/state/action/cardPriceAction'
import ReceiptWidget from '../../commons/ReceiptWidget';
class SendCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            formData:{
                card_type_id:'',
                requester_id:'',
                amount:'',
            },
            cardType:'',
            cardTypeSelected:'',
            isMediaSelected:false,
            mediaTypeValue: '',
            acceptMediaType: '',
            submitted: false,
            loading: false,
            finished: false,
            paymentType:false
        }
        
    }

    handleChange = event=>{
        const {formData} = this.state
        formData[event.target.name] = event.target.value
        this.setState(formData)
    }

    handleMediaSelect = () => {
        this.setState({
            isMediaSelected: false
        })
    }

    handleMediaSelectOpen = () => {
        this.setState({
            isMediaSelected: true
        })
    }

    handleMediaSelectChange = (event) => {
        this.setState({
            mediaTypeValue: event.target.value,
        })

        const {formData} = this.state
        formData[event.target.name] = event.target.value.id;
        this.setState(formData)
        this.setState({cardType:event.target.value})

        console.log(this.state.cardType)
    }

    handleSubmit = (event)=>{
        this.setState({paymentType:true})
        console.log(this.state.cardType)

    }

    componentDidMount(){
            this.props.indexCardType()
            this.props.indexPaymentTypes()
            this.props.indexCardPrice()
            const {formData} = this.state
            formData['requester_id'] = this.props.user.id
            this.setState(formData)
    }
    
    render() {
        const {formData} = this.state
        const { loading } = this.state;
        const finished = false
        const setLoading = !finished && loading;
        const isEnabled = formData.card_type_id>0&&formData.amount.length>0

        return (
            <div>
                {
                    this.props.loading&&this.props.paymentTypeLoading&&this.props.cardPriceLoading
                    ?
                        (<HorizontalLoading height={50}/>)
                    :
                        (
                            <div>
                                {
                                    this.state.paymentType
                                    ?
                                        (
                                            
                                            <PaymentTypes 
                                             formData={this.state.formData}
                                             cardType={this.state.cardType}
                                             user={this.props.user} 
                                             cardPrice={this.props.cardPrice}
                                             paymentTypes={this.props.paymentTypes}
                                             />
                                        )
                                    :
                                        (
                                            <ValidatorForm onSubmit={this.handleSubmit} style={{display:"flex",flexDirection:'column',alignItems:'center'}}>
                                <FormControl style={{width:"80%"}}>
                                <InputLabel
                                     htmlFor="demo-controlled-open-select">{`Select card type you want to send ${this.props.user.first_name}`}</InputLabel>
                                        <Select
                                               name='card_type_id'
                                               value={this.state.mediaTypeValue}
                                               open={this.state.isMediaSelected}
                                               onClose={this.handleMediaSelect}
                                               onOpen={this.handleMediaSelectOpen}
                                               onChange={this.handleMediaSelectChange}
                                           
                                            >
                                            {
                                             this.props.cardType.map(items => (
                                             <MenuItem key={items.name} value={items}
                                                name={items.name}>{`${items.value} Birr card`}
                                                </MenuItem>
                                                ))
                                             }
                                        </Select>                                          
                                 </FormControl>
                                 {
                                     this.state.mediaTypeValue!==''
                                     ?
                                        (
                                            <div style={{width:'80%'}}>
                                                 <TextValidator
                                                    onChange={this.handleChange}
                                                    label={`Enter how many card you want to send`}
                                                    name={'amount'}
                                                    type={'text'}
                                                    style={{width:'100%',marginTop:20}}
                                                    value={this.state.formData.amount}
                                                    validators={['required']}
                                                    errorMessages={[`Please enter amount`]}       
                                                 />

                                                <LoadingButton
                                                    style={{width:'100%',marginTop:25}}
                                                    color="primary"
                                                    variant="contained"
                                                    type="submit"
                                                    loading={setLoading}
                                                    done={finished}
                                                    text={'Send cards'}
                                                    disabled={!isEnabled ||this.state.submitted}
                                                >
                                                    {
                                                        'Send cards'
                                                    }
                                                </LoadingButton>

                                            </div>
                                        )
                                     :(null)
                                 }
                            </ValidatorForm>

                                        )
                                }
                            </div>
                            
                        )
                }
            </div>
        )
    }
}

const mapStateToProps = state=>({
    cardType:state.authReducer.commonReducer.cardTypeReducer.cardType,
    loading:state.authReducer.commonReducer.cardTypeReducer.loading,
    paymentTypes:state.authReducer.commonReducer.paymentTypesReducer.paymentTypes,
    paymentTypeLoading:state.authReducer.commonReducer.paymentTypesReducer.loading,
    cardPrice:state.authReducer.commonReducer.cardPriceReducer.cardPrice,
    cardPriceLoading:state.authReducer.commonReducer.cardPriceReducer.loading
})

export default connect(mapStateToProps,{indexCardType,indexPaymentTypes,indexCardPrice})(SendCard)