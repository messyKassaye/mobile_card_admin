import { Card, CardContent, CardHeader, Container, Divider, Typography } from '@material-ui/core'
import React from 'react'
import BusinessIcon from '@material-ui/icons/Business';
import LogoComponent from '../../commons/LogoComponent';
import { green } from '@material-ui/core/colors';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import withStyles from '@material-ui/core/styles/withStyles'
import {connect} from 'react-redux'
import {storeCompany} from '../state/action/companiesAction'
import formStyle from '../../styles/formStyle'
import LoadingButton from '../../commons/LoadingButton';
import AddressRegistration from './AddressRegistration';
import {indexRegionCity} from '../../commons/state/action/RegionCityAction'

class CompanyRegistration extends React.Component{
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
            message:"Now tell us your company name and it's location",
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
        this.props.indexRegionCity()

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
        this.props.storeCompany(formData)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
            this.setState({
                loading: false,
                finished: false,
                submitted: false,
                message:'Your company is registered successfully.Now tell us where your company is found',
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
        return <Container maxWidth={'md'}>
            <Card>
                <CardHeader
                 title={'Company registration'}
                 avatar={<BusinessIcon/>}
                />
                <Divider/>
                <CardContent className={classes.form}>
                    <Typography style={{color:green[500],marginBottom:25}} variant={'h6'}>
                        {`Hello ,${this.props.name} welcome to ECard and we thank you for choosing us.`}
                    </Typography>
                    <Typography>
                        {this.state.message}
                    </Typography>
                    {
                        this.state.registrationDone
                        ?
                            (<AddressRegistration regions={this.props.regions} company={this.state.company}/>)
                        :
                            (
                                <ValidatorForm onSubmit={this.handleSumbit}>

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
                            )
                    }
                    
                </CardContent>
            </Card>
        </Container>
    }
}

const mapStateToProps = state=>({
    response:state.authReducer.partnerReducer.companyReducer.response,
    regions:state.authReducer.commonReducer.regionReducer.regions,
    loading:state.authReducer.commonReducer.regionReducer.loading
})
export default connect(mapStateToProps,{storeCompany,indexRegionCity})(withStyles(formStyle)(CompanyRegistration))