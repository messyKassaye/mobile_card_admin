import React, {Component} from 'react';
import {ValidatorForm,TextValidator} from 'react-material-ui-form-validator'
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import {set,get} from "../../TokenService";
import LoadingButton from "./LoadingButton";
import {Typography} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData:{
                password:'',
                password_confirmation:'',
                email:'',
                token:''
            },
            showChangePassword:false,
            successMessage:'',
            submitted: false,
            loading: false,
            finished: false,
        }
    }
    changePassword = ()=>{
        this.setState({
            showChangePassword:true
        })
    }

    componentDidMount() {
        const {formData} = this.state
        formData['token'] = get()
        formData['email'] = this.props.user.attribute.email

    }
    handleChange = event=>{
        const {formData} = this.state
        formData[event.target.name] = event.target.value;
        this.setState(formData)
    }

    handleSubmit = event=>{
        event.preventDefault()
        this.setState({
            loading:true,
            submitted:true
        })
        const {formData} = this.state
        this.props.resetPassword(formData)

    }

    componentWillReceiveProps(nextProps, nextContext) {
        /* if(nextProps.response.status==='ok'){
            set(nextProps.response.token)
            setTimeout(()=>{
                this.setState({
                    loading:false,
                    submitted:false,
                    showChangePassword:false
                })
            },2000)
            this.setState({
                successMessage:'Password is changed successfully'
            })
        } */
    }

    render() {
        const {classes} = this.props
        const {formData} = this.state
        const {loading} = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        const isEnabled = formData.password.length > 0 && formData.password_confirmation.length > 0&&
            formData.token.length>0&&formData.email.length>0
        return (
            <div>
                <Typography style={{color:green[500]}}>{this.state.successMessage}</Typography>
                {
                    this.state.showChangePassword
                        ?
                        (
                            <ValidatorForm style={{display:'flex',flexDirection:"column"}} onSubmit={this.handleSubmit}>
                                <TextValidator
                                   style ={{marginBottom:20,width:'60%'}}
                                    name='password'
                                    label={'New password'}
                                    value={this.state.formData.password}
                                    onChange={this.handleChange}
                                    type={'password'}
                                />

                                <TextValidator
                                    style ={{marginBottom:20,width:'60%'}}
                                    name='password_confirmation'
                                    label={'Confirm password'}
                                    value={this.state.formData.password_confirmation}
                                    onChange={this.handleChange}
                                    type={'password'}
                                />

                                <LoadingButton
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    disabled={!isEnabled || this.state.submitted}
                                    loading={setLoading}
                                    text={'Change password'}
                                    style={{textTransform:'none',marginBottom:20,width:'60%'}}
                                    done={finished}
                                >
                                    {
                                        'Change password'
                                    }
                                </LoadingButton>

                            </ValidatorForm>
                        )
                        :
                        (
                            <Button
                                style={{textTransform:'none'}}
                                color='primary'
                                variant='outlined'
                                onClick={this.changePassword}>
                                Change password
                            </Button>
                        )
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.userData.user,
    loading: state.userData.loading,
})
export default connect(mapStateToProps,null)
(ResetPassword);