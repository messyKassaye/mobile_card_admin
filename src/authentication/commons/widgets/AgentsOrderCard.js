import { Button, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import React from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import {connect} from 'react-redux'
import HorizontalLoading from '../loading/HorizontalLoading';
import {indexCardType} from '../state/action/cardTypeAction'
import ClearIcon from '@material-ui/icons/Clear';
import {storeCardRequest} from '../state/action/cardRequestAction'
import {showMainDialog} from '../../commons/state/action/dialogAction'
import { green } from '@material-ui/core/colors';
import LoadingButton from '../LoadingButton';

class AgentsOrderCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            info:'Select card type you want to order',
            selected:'Select card',
            anchorEl:null,
            selectedCardType:[],
            sendFormData:{
                card_type_id:'',
                amount:''
            },
            done:false,
            formData:{
                card_type_id_1:'',
                card_type_id_2:'',
                card_type_id_3:'',
                card_type_id_4:'',
                card_type_id_5:'',
                card_type_id_6:'',
            }
        }
    }
    
    componentDidMount(){
        this.props.indexCardType()
    }

   handleClick = (event) => {
        this.setState({
            anchorEl:event.currentTarget
        })
      }
    
    handleClose = (type) => {
        const {selectedCardType} = this.state
        selectedCardType.push(type.id)
        this.setState({
            selectedCardType,
            anchorEl:null,
            selected:`${type.value} Birr card`
        })
      }

      clearCard = (selectedCard)=>{
          const {selectedCardType} = this.state
          let index = selectedCardType.indexOf(selectedCard)
          selectedCardType.splice(index,1)
          this.setState(selectedCardType)

          const {formData} = this.state
          formData[`card_type_id_${selectedCard}`]=''
          this.setState(formData)
      }

      handleChange = event=>{
        const {formData} = this.state
        formData[event.target.name] = event.target.value
        this.setState(formData)
    }


      handleSubmit = ()=>{
        this.setState({
            loading: true,
            submitted: true,
        })
         let latest = Object.entries(this.state.formData).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
         if(latest.card_type_id_1!==''){
             const sendFormData = {}
             sendFormData['card_type_id'] =1
             sendFormData['amount']=latest.card_type_id_1
             sendFormData['company_agent_id'] = '1'
             this.props.storeCardRequest(sendFormData)
         }

         if(latest.card_type_id_2!==''){
            const sendFormData = {}
            sendFormData['card_type_id'] =2
            sendFormData['amount']=latest.card_type_id_2
            sendFormData['company_agent_id'] = '1'
            this.props.storeCardRequest(sendFormData)
         }

         if(latest.card_type_id_3!==''){
            const sendFormData = {}
            sendFormData['card_type_id'] =3
            sendFormData['amount']=latest.card_type_id_3
            sendFormData['company_agent_id'] = '1'
            this.props.storeCardRequest(sendFormData)
         }

         if(latest.card_type_id_4!==''){
            const sendFormData = {}
            sendFormData['card_type_id'] =4
            sendFormData['amount']=latest.card_type_id_4
            sendFormData['company_agent_id'] = '1'
            this.props.storeCardRequest(sendFormData)
         }

         if(latest.card_type_id_5!==''){
            const sendFormData = {}
            sendFormData['card_type_id'] =5
            sendFormData['amount']=latest.card_type_id_5
            sendFormData['company_agent_id'] = '1'
            this.props.storeCardRequest(sendFormData)
         }

         setTimeout(() => {
            if(latest.card_type_id_6!==''){
                const sendFormData = {}
                sendFormData['card_type_id'] =6
                sendFormData['amount']=latest.card_type_id_6
                sendFormData['company_agent_id'] = '1'
                this.props.storeCardRequest(sendFormData)
             }
             this.setState({
                 done:true,
                 loading: false,
                 finished: false,
                 submitted: false,
             })
             setTimeout(() => {
                this.props.showMainDialog({'show':false,'page':null,'title':'',actions:{on:false,path:'',id:''}})
             }, 2000);
         }, 5000);

        }

        componentWillReceiveProps(nextProps, nextContext) {
            let index = 1;
            if(nextProps.response.status){
                nextProps.response.status =false
                index += 1;
                if(index>=6){
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
        }

    render(){

        const {formData} = this.state
        const { loading } = this.state;
        const finished = false
        const setLoading = !finished && loading;
        const isEnabled = true

        return <div style={{display:'flex',flexDirection:'column',paddingLeft:25,paddingRight:25}}>
                {
                    this.state.done
                    ?
                        <Typography style={{color:green[500]}}>Your order is send successfully</Typography>
                    :
                        (null)
                }
                <ValidatorForm
                 onSubmit={this.handleSubmit}
                 style={{display:'flex',flexDirection:'column',justifyContent:'center',marginBottom:15}}>
                    {
                        this.state.selectedCardType.length>0&&this.state.selectedCardType.indexOf(1)!=-1
                        ?
                            (
                                <div 
                                style={{
                                    display:'flex',
                                    flexDirection:'row',
                                    alignItems:'center',
                                    justifyContent:'space-around'}}>
                                    <TextValidator
                                        style={{width:'80%'}}
                                        onChange={this.handleChange}
                                        name={'card_type_id_1'}
                                        value={this.state.card_type_id_1}
                                        label={`Enter amount for 5 Birr card`}/>
                                    <IconButton onClick={()=>this.clearCard(1)} color={'secondary'} style={{marginTop:15}}>
                                        <ClearIcon/>
                                    </IconButton>
                             </div>
                            )
                        :
                            (null)
                    }


                    {
                        this.state.selectedCardType.length>0&&this.state.selectedCardType.indexOf(2)!=-1
                        ?
                            (
                                <div 
                                style={{
                                    display:'flex',
                                    flexDirection:'row',
                                    alignItems:'center',
                                    justifyContent:'space-around'}}>
                                    <TextValidator
                                        onChange={this.handleChange}
                                        style={{width:'80%'}}
                                        name={'card_type_id_2'}
                                        value={this.state.card_type_id_2}
                                        label={`Enter amount for 10 Birr card`}/>
                                    <IconButton onClick={()=>this.clearCard(2)} color={'secondary'} style={{marginTop:15}}>
                                        <ClearIcon/>
                                    </IconButton>
                             </div>
                            )
                        :
                            (null)
                    }


                    {
                        this.state.selectedCardType.length>0&&this.state.selectedCardType.indexOf(3)!=-1
                        ?
                            (
                                <div 
                                style={{
                                    display:'flex',
                                    flexDirection:'row',
                                    alignItems:'center',
                                    justifyContent:'space-around'}}>
                                    <TextValidator
                                        onChange={this.handleChange}
                                        style={{width:'80%'}}
                                        name={'card_type_id_3'}
                                        value={this.state.card_type_id_3}
                                        label={`Enter amount for 15 Birr card`}/>
                                    <IconButton onClick={()=>this.clearCard(3)} color={'secondary'} style={{marginTop:15}}>
                                        <ClearIcon/>
                                    </IconButton>
                             </div>
                            )
                        :
                            (null)
                        }

                    {
                        this.state.selectedCardType.length>0&&this.state.selectedCardType.indexOf(4)!=-1
                        ?
                            (
                                <div 
                                style={{
                                    display:'flex',
                                    flexDirection:'row',
                                    alignItems:'center',
                                    justifyContent:'space-around'}}>
                                    <TextValidator
                                        onChange={this.handleChange}
                                        style={{width:'80%'}}
                                        name={'card_type_id_4'}
                                        value={this.state.card_type_id_4}
                                        label={`Enter amount for 25 Birr card`}/>
                                    <IconButton onClick={()=>this.clearCard(4)} color={'secondary'} style={{marginTop:15}}>
                                        <ClearIcon/>
                                    </IconButton>
                             </div>
                            )
                        :
                            (null)
                    }

                    {
                        this.state.selectedCardType.length>0&&this.state.selectedCardType.indexOf(5)!=-1
                        ?
                            (
                                <div 
                                style={{
                                    display:'flex',
                                    flexDirection:'row',
                                    alignItems:'center',
                                    justifyContent:'space-around'}}>
                                    <TextValidator
                                        onChange={this.handleChange}
                                        style={{width:'80%'}}
                                        name={'card_type_id_5'}
                                        value={this.state.card_type_id_5}
                                        label={`Enter amount for 50 Birr card`}/>
                                    <IconButton onClick={()=>this.clearCard(5)} color={'secondary'} style={{marginTop:15}}>
                                        <ClearIcon/>
                                    </IconButton>
                             </div>
                            )
                        :
                            (null)
                    }


                    {
                        this.state.selectedCardType.length>0&&this.state.selectedCardType.indexOf(6)!=-1
                        ?
                            (
                                <div 
                                style={{
                                    display:'flex',
                                    flexDirection:'row',
                                    alignItems:'center',
                                    justifyContent:'space-around'}}>
                                    <TextValidator
                                        onChange={this.handleChange}
                                        style={{width:'80%'}}
                                        name={'card_type_id_6'}
                                        value={this.state.card_type_id_6}
                                        label={`Enter amount for 100 Birr card`}/>
                                    <IconButton onClick={()=>this.clearCard(6)} color={'secondary'} style={{marginTop:15}}>
                                        <ClearIcon/>
                                    </IconButton>
                             </div>
                            )
                        :
                            (null)
                    }

                    {
                        this.props.loading
                        ?
                            (
                                <div style={{display:'flex',flexDirection:'row'}}>
                                    <HorizontalLoading height={20}/>
                                </div>
                            )
                        :
                           (
                            <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                             <Typography style={{marginRight:15,marginTop:5}} color={'primary'}>
                                 {this.state.info}
                            </Typography>

                             <div>
                                <Button 
                                    style={{textTransform:"none"}}
                                    color={'primary'} 
                                    variant={'outlined'}
                                     aria-controls="simple-menu" 
                                     aria-haspopup="true" 
                                     onClick={this.handleClick}>
                                    {this.state.selected}
                                </Button>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={this.state.anchorEl}
                                    keepMounted
                                    open={Boolean(this.state.anchorEl)}
                                    onClose={this.handleClose}
                                >
                                    {
                                        this.props.cardType.map(type=>(
                                        <MenuItem key={type.id} onClick={()=>this.handleClose(type)} value={type}>{`${type.value} Birr card`}</MenuItem>
                                        ))
                                    }
                                
                                </Menu>
                            </div>

                                

                            </div>
                           )
                    }
                    {
                        this.state.selectedCardType.length>0
                        ?
                            (
                                <LoadingButton
                                    style={{width:'100%',marginTop:15}}
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    loading={setLoading}
                                    done={finished}
                                    text={'Send orders'}
                                    disabled={!isEnabled ||this.state.submitted}
                                >
                                    {
                                        'Send orders'
                                    }
                                </LoadingButton>
                            )
                        :
                            (null)
                    }
                </ValidatorForm>
        </div>
    }
}
const mapStateToProps = state=>({
    cardType:state.authReducer.commonReducer.cardTypeReducer.cardType,
    loading:state.authReducer.commonReducer.cardTypeReducer.loading,
    response:state.authReducer.commonReducer.cardRequestReducer.response
})

export default connect(mapStateToProps,{indexCardType,storeCardRequest,showMainDialog})(AgentsOrderCard)