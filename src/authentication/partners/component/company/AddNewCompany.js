import {Typography } from '@material-ui/core'
import React from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import withStyles from '@material-ui/core/styles/withStyles'
import {connect} from 'react-redux'
import {storeCompany,updateCompany} from '../../state/action/companiesAction'
import companyStyle from './styles/companyStyle'
import {showMainDialog} from '../../../commons/state/action/dialogAction'
import LoadingButton from '../../../commons/LoadingButton';
class AddNewCompany extends React.Component{
    constructor(props){
        super(props)
        this.state={
            formData:{
                name:"",
                email:"",
                phone:""
            },
            submitted:false,
            loading:false,
            message:"",
            company:null,
            registrationDone:false

        }
    }
    handleChange = (e)=>{
        const {formData} = this.state
         formData[e.target.name]=e.target.value
         this.setState(formData)
     }

    componentDidMount() {

        if(this.props.type==='edit'){
            const {formData} = this.state
            formData['name'] = this.props.data.name
            formData['email'] = this.props.data.email
            formData['phone'] = this.props.data.phone
            this.setState(formData)
        }
        ValidatorForm.addValidationRule('isEmail',(value)=>{
            if(!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
                return false
            }
            return true
        })
        ValidatorForm.addValidationRule('isPasswordMatch',(value)=>{
            const {formData}= this.state
            if(value !== formData.password){
                return false
            }
            return  true
        })
    }

    handleSumbit = ()=>{
        this.setState({
            submitted:true,
            loading:true
        })
        const {formData} = this.state
        if(this.props.type==='edit'){
            this.props.updateCompany(formData,this.props.data.id)
        }else{
            this.props.storeCompany(formData)
        }

        setTimeout(()=>{
            this.props.showMainDialog({
                show:false,
                page:null,
                title:'',
                actions:{

                }
            })
        },2000)

    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
            this.setState({
                loading: false,
                finished: false,
                submitted: false,
                message:'Your company is registered successfully.',
                company:nextProps.response.company,
                registrationDone:true
            })
            
        }

        if(nextProps.updateResponse.status){
            this.setState({
                loading: false,
                finished: false,
                submitted: false,
                message:'Your company is updated successfully',
                company:nextProps.response.company,
                registrationDone:true
            })
        }
    }
    render(){
        const {classes} = this.props
        const {formData} = this.state
         const { loading } = this.state;
         const finished = false
         const setLoading = !finished && loading;
         const isEnabled = formData.name.length>0&&formData.phone.length>0 && formData.email.length>0
        return <ValidatorForm className={classes.form} onSubmit={this.handleSumbit}>
                    <Typography color={'primary'}>
                        {this.state.message}
                    </Typography>
                    <TextValidator
                    className={classes.text_input}
                    name='name'
                    label='Company name'
                    onChange={this.handleChange}
                    value={this.state.formData.name}
                    validators={['required']}
                    errorMessages={['Enter company name']}
                    />

                    <TextValidator
                    className={classes.text_input}
                    name='phone'
                    label='Company phone number'
                    onChange={this.handleChange}
                    value={this.state.formData.phone}
                    validators={['required']}
                    errorMessages={['Enter company phone number']}
                    />

                <TextValidator
                    className={classes.text_input}
                    name='email'
                    label='Company email address'
                    onChange={this.handleChange}
                    value={this.state.formData.email}
                    validators={['required','isEmail']}
                    errorMessages={['Enter your email address','Incorrect email address']}       
                    />

                    <LoadingButton
                        className={classes.text_input}
                        color="primary"
                        variant="contained"
                        type="submit"
                        loading={setLoading}
                        done={finished}
                        text={'Register company'}
                        disabled={!isEnabled ||this.state.submitted}
                        >
                        {
                            'Register company'
                        }             
                    </LoadingButton>
                </ValidatorForm>
    }
}

const mapStateToProps = state=>({
    response:state.authReducer.partnerReducer.companyReducer.response,
    updateResponse:state.authReducer.partnerReducer.companyReducer.updateResponse
})
export default connect(mapStateToProps,{storeCompany,updateCompany,showMainDialog})(withStyles(companyStyle)(AddNewCompany))