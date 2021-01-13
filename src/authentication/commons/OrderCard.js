import { Button, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import React from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import {connect} from 'react-redux'
import HorizontalLoading from './loading/HorizontalLoading';
import {indexCardType} from './state/action/cardTypeAction'
import ClearIcon from '@material-ui/icons/Clear';
import LoadingButton from './LoadingButton';
import {storeCardRequest} from './state/action/cardRequestAction'
import {showMainDialog} from '../commons/state/action/dialogAction'
import { green } from '@material-ui/core/colors';
import AgentsOrderCard from './widgets/AgentsOrderCard';
import PartnersOrderCard from './widgets/PartnersOrderCard';
class OrderCard extends React.Component{
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

        return <div style={{display:'flex',flexDirection:'column'}}>
                    {
                        this.props.loading
                        ?
                            <HorizontalLoading height={25}/>
                        :
                            (
                                <PartnersOrderCard/>
                            )
                    }
                </div>
    }
}
const mapStateToProps = state=>({
    user: state.userData.user,
    loading:state.userData.loading,
    response:state.authReducer.commonReducer.cardRequestReducer.response
})
export default  connect(mapStateToProps,{indexCardType,storeCardRequest,showMainDialog})(OrderCard);