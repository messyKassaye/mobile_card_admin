import { FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import React from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import {connect} from 'react-redux'
import FormLoading from '../../commons/loading/FormLoading'
import {storeAddress} from '../../commons/state/action/addressAction'
import withStyles from '@material-ui/core/styles/withStyles'
import formStyle from '../../styles/formStyle'
import LoadingButton from '../../commons/LoadingButton'
import { green } from '@material-ui/core/colors'
class AddressRegistration extends React.Component{
  constructor(props) {
      super(props);
      this.state ={
          formData:{
            user_company_id:'',
            region_id:'',
            city_id:'',
            specific_name:'',
            building_name:'',
            floor_no:''

          },
          submitted:false,
          loading:false,
          child:[],
          regionSelected:false

      }
  }

  
  handleChange = (e)=>{
    const {formData} = this.state
     formData[e.target.name]=e.target.value
     this.setState(formData)
 }
  handleMediaSelect = () => {
    this.setState({
        isRegionSelected: false
    })
}

handleRegionSelectOpen = () => {
    this.setState({
        isRegionSelected: true
    })
}

handleRegionSelectChange = (event) => {
   
    const {formData} = this.state
    formData[event.target.name] = event.target.value.id;
    this.setState(formData)

    this.setState({
        child:event.target.value.child,
        regionSelected:true
    })

}

handleCitySelect = () => {
    this.setState({
        isCitySelected: false
    })
}

handleCitySelectOpen = () => {
    this.setState({
        isCitySelected: true
    })
}

handleCitySelectChange = (event) => {
   
    const {formData} = this.state
    formData[event.target.name] = event.target.value;
    this.setState(formData)
}

componentDidMount(){
    this.setState({
        company_user_id:this.props.company.id
    })
}

handleSubmit = ()=>{
    this.setState({
        submitted:true,
        loading:true
    })
    const {formData} = this.state
    formData['user_company_id'] = this.props.company.id
    this.props.storeAddress(formData)

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
        },2000)
    }
}
  
    render(){
        const {classes} = this.props
        const {formData} = this.state
         const { loading } = this.state;
         const finished = false
         const setLoading = !finished && loading;
         const isEnabled = formData.region_id>0&&formData.city_id>0 &&
          formData.specific_name.length>0
        
        return(
                            <div>
                                <ValidatorForm onSubmit={this.handleSubmit}>
                                    <Typography style={{color:green[500]}}>{this.props.response.message}</Typography>
                                    <FormControl className={classes.text_input}>
                                    <InputLabel
                                          htmlFor="demo-controlled-open-select">{'Select region'}</InputLabel>
                                        <Select
                                            name='region_id'
                                            value={this.state.isRegionSelected}
                                            open={this.state.isRegionSelected}
                                            onClose={this.handleMediaSelect}
                                            onOpen={this.handleRegionSelectOpen}
                                            onChange={this.handleRegionSelectChange}
                                        
                                        >
                                         {
                                              this.props.regions.map(items => (
                                                <MenuItem key={items.name} value={items}
                                                  name={items.name}>{items.name}</MenuItem>
                                                ))
                                         }                                         
                                        </Select>
                                 </FormControl>
                                 {
                                     this.state.regionSelected
                                     ?
                                        (
                                            <div>
                                                <FormControl className={classes.text_input}>
                                                    <InputLabel
                                                        htmlFor="demo-controlled-open-select">{'Select city'}</InputLabel>
                                                        <Select
                                                            name='city_id'
                                                            value={this.state.isCitySelected}
                                                            open={this.state.isCitySelected}
                                                            onClose={this.handleCitySelect}
                                                            onOpen={this.handleCitySelectOpen}
                                                            onChange={this.handleCitySelectChange}
                                                        
                                                        >
                                                        {
                                                            this.state.child.map(items => (
                                                                <MenuItem key={items.name} value={items.id}
                                                                name={items.name}>{items.name}</MenuItem>
                                                                ))
                                                        }                                         
                                                        </Select>
                                                </FormControl>

                                                <TextValidator
                                                    className={classes.text_input}
                                                    name='specific_name'
                                                    label='Specific name'
                                                    onChange={this.handleChange}
                                                    value={this.state.formData.specific_name}
                                                    validators={['required']}
                                                    errorMessages={['Enter specific name']}
                                                />

                                                <TextValidator
                                                    className={classes.text_input}
                                                    name='building_name'
                                                    label='Buliding name'
                                                    onChange={this.handleChange}
                                                    value={this.state.formData.building_name}
                                                   />

                                                <TextValidator
                                                    className={classes.text_input}
                                                    name='floor_no'
                                                    label='Flooor number'
                                                    onChange={this.handleChange}
                                                    value={this.state.formData.floor_no}
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
                                            </div>
                                        )
                                     :
                                        (
                                            null
                                        )
                                 }
                                 
                                </ValidatorForm>
            </div>
        )
    }
}

const mapStateToProps = state=>({
    response:state.authReducer.commonReducer.addressReducer.response
})
export default connect(mapStateToProps,{storeAddress})(withStyles(formStyle)(AddressRegistration))