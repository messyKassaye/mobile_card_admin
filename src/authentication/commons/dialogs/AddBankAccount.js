import React from 'react'
import {connect} from 'react-redux'
import {indexBanks} from '../state/action/banksAction'
import {showMainDialog} from '../../commons/state/action/dialogAction'
import HorizontalLoading from '../loading/HorizontalLoading';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import LoadingButton from '../LoadingButton';
import {storeBankAccount,updateBankAccount} from '../state/action/bankAccountAction'
import { green } from '@material-ui/core/colors';
class AddBankAccount extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            formData:{
                bank_id:'',
                account_number:'',
                holder_full_name:''
            },
            isMediaSelected:false,
            mediaTypeValue: '',
            acceptMediaType: '',
            submitted: false,
            loading: false,
            finished: false,
        }
        
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
        formData[event.target.name] = event.target.value;
        this.setState(formData)
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

        if(this.props.form.type==='Edit'){
            const {formData} = this.state
        this.props.updateBankAccount(this.props.form.data.id,formData)
        }else{
        const {formData} = this.state
        this.props.storeBankAccount(formData)
        }

    }
    
    componentDidMount(){
        this.props.indexBanks()
        if(this.props.form.type==='Edit'){
            const {formData} = this.state
            formData['account_number'] = this.props.form.data.account_number
            formData['bank_id'] = this.props.form.data.bank.id
            formData['holder_full_name'] = this.props.form.data.holder_full_name
            this.setState({
                formData,
                mediaTypeValue:this.props.form.data.bank.id
            })
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
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
    render() {
        const {formData} = this.state
        const { loading } = this.state;
        const finished = false
        const setLoading = !finished && loading;
        const isEnabled = formData.bank_id>0&&formData.account_number.length>0&&
                         formData.holder_full_name.length>0
        return (
            <div style={{paddingLeft:25,paddingRight:25}}>
                {
                    this.props.loading
                    ?
                        <HorizontalLoading height={30}/>
                    :
                        (
                            <ValidatorForm onSubmit={this.handleSubmit}>
                                <Typography style={{color:green[500]}}>
                                    {this.props.message}
                                </Typography>
                                <FormControl style={{width:"80%"}}>
                                <InputLabel
                                     htmlFor="demo-controlled-open-select">{'Select your bank'}</InputLabel>
                                        <Select
                                               name='bank_id'
                                               value={this.state.mediaTypeValue}
                                               open={this.state.isMediaSelected}
                                               onClose={this.handleMediaSelect}
                                               onOpen={this.handleMediaSelectOpen}
                                               onChange={this.handleMediaSelectChange}
                                           
                                            >
                                            {
                                             this.props.banks.map(items => (
                                             <MenuItem key={items.name} value={items.id}
                                                name={items.name}>{items.name}</MenuItem>
                                                ))
                                             }
                                        </Select>                                          
                                 </FormControl>

                                 <TextValidator
                                    onChange={this.handleChange}
                                    label={`Accunt number`}
                                    name={'account_number'}
                                    type={'text'}
                                    style={{width:'80%',marginTop:20}}
                                    value={this.state.formData.account_number}
                                    validators={['required']}
                                    errorMessages={[`Please enter your account number`]}       
                                    />

                                 <TextValidator
                                    onChange={this.handleChange}
                                    label={`Accunt holder full name`}
                                    name={'holder_full_name'}
                                    type={'text'}
                                    style={{width:'80%',marginTop:20}}
                                    value={this.state.formData.holder_full_name}
                                    validators={['required']}
                                    errorMessages={[`Please enter account holder name`]}       
                                    />

                            <LoadingButton
                            style={{width:'80%',marginTop:25}}
                            color="primary"
                            variant="contained"
                            type="submit"
                            loading={setLoading}
                            done={finished}
                            text={'Set my account'}
                            disabled={!isEnabled ||this.state.submitted}
                        >
                            {
                                'Set my account'
                            }
                        </LoadingButton>
                            </ValidatorForm>
                            
                        )
                }
            </div>
        )
    }
}

const mapStateToProps = state=>({
    banks:state.authReducer.commonReducer.banksReducer.banks,
    loading:state.authReducer.commonReducer.banksReducer.loading,
    response:state.authReducer.commonReducer.bankAccountReducer.response
})

export default connect(mapStateToProps,{indexBanks,showMainDialog,storeBankAccount,updateBankAccount})(AddBankAccount)