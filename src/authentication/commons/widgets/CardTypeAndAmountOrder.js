import { Button, CircularProgress, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import Axios from 'axios';
import React from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { PARTNER_API_URL } from '../../../constants/constants';
import LoadingButton from '../LoadingButton';
import {showMainDialog} from '../../commons/state/action/dialogAction'
import {connect} from 'react-redux'
class CardTypeAndAmountOrder extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            formData:{
                card_type_id_1:'',
                card_type_id_2:'',
                card_type_id_3:'',
                card_type_id_4:'',
                card_type_id_5:'',
                card_type_id_6:''
            },
            sendedDataSize:[],
            selectedCardType:[],
            selectCard:"Select card",
            selected:false,
            anchorEl:null,
            done:false,
            gettingData:false
        }
    }

    handleChange = event=>{
        const {formData} = this.state
        formData[event.target.name] = event.target.value
        this.setState(formData)
    }


    handleClick = (event) => {
        this.setState({
            anchorEl:event.currentTarget
        })
      };
    
    handleClose = (event) => {
        const {selectedCardType} = this.state
        let index = selectedCardType.indexOf(event.target.value);
        console.log(index)
        if(index===-1){
            selectedCardType.push(event.target.value)
        }
        this.setState({
            anchorEl:null,
            selectedCardType,
            selectCard:`${event.target.value} Birr card`
        })
      }

      removeIndex = index=>{
          let itemIndex = this.state.selectedCardType.indexOf(index)
          const {selectedCardType} = this.state
          selectedCardType.splice(itemIndex,1);
          this.setState(selectedCardType)

      }

      handleSubmit = event=>{
        this.setState({
            submitted:true,
            loading:true,
            gettingData:true
        })

          const {formData} = this.state
          let nonEmptyForm = Object.entries(formData).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
          Object.entries(nonEmptyForm).forEach(([key, value]) => {
              const {sendedDataSize} = this.state
              const formDatas = {
                card_type_id:this.findValue(key),
                amount:value
            }
              sendedDataSize.push(formDatas)
              this.setState(sendedDataSize)
          });

          const {sendedDataSize} = this.state
         for(let i=0;i<sendedDataSize.length;i++){
            let count =1;
            Axios.post(`${PARTNER_API_URL}cards`,sendedDataSize[i])
            .then(response=>response.data)
            .then(res=>{
                if(res.status==true){
                    count +=1
                }
            })
            if(count===sendedDataSize.length){
                this.setState({done:true})
            }

         }
      }


      sendData = (data)=>{
         return 
      }

      findValue = (value)=>{
          if(value==='card_type_id_1'){
              return 1
          }else if(value==='card_type_id_2'){
              return 2;
          }else if(value==='card_type_id_3'){
              return 3;
          }else if(value==='card_type_id_4'){
              return 4
          }else if(value==='card_type_id_5'){
              return 5
          }else if(value==='card_type_id_6'){
              return 6
          }
      }

      closeDialog = ()=>{
        this.props.showMainDialog({'show':false,'page':null,'title':'',actions:{on:false,path:'',id:''}})

      }
    
    render(){
        const {formData} = this.state
        const { loading } = this.state;
        const finished = false
        const setLoading = !finished && loading;
        const isEnabled = this.state.card_type_id_1>0||this.state.card_type_id_2>0||this.state.card_type_id_3>0
        ||this.state.card_type_id_4>0||this.state.card_type_id_5>0||this.state.card_type_id_6>0
        return <div>
                    {
                        this.state.gettingData
                        ?
                            (
                                <div>
                                    {
                                        this.state.done
                                        ?
                                            (
                                                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                                    <Typography>
                                                        You have get your data. Now you can start selling your card
                                                    </Typography>
                                                    <Button 
                                                    onClick={this.closeDialog}
                                                    color={'primary'} 
                                                    variant={'contained'}
                                                    style={{textTransform:'none'}}>
                                                        Okay
                                                    </Button>
                                                </div>
                                            )
                                        :
                                            (
                                                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                                    <CircularProgress color={'primary'}/>
                                                    <Typography color={'primary'} style={{marginTop:25}}>
                                                        Getting data....
                                                    </Typography>
                                                </div>
                                            )
                                    }
                                </div>
                            )
                        :
                            (
                                <div>

                                         <ValidatorForm onSubmit={this.handleSubmit}>
                                            {
                                                this.state.selectedCardType.indexOf(5)>-1
                                                ?
                                                    (
                                                        <div style={{display:'flex',flexDirection:'row'}}>
                                                            <TextValidator
                                                                    style={{width:'80%'}}
                                                                    label={'Enter your order amount for 5 Birr card'}
                                                                    onChange={this.handleChange}
                                                                    name="card_type_id_1"
                                                                    value={this.state.formData.card_type_id_1}
                                                                    validators={['required']}
                                                                    errorMessages={['Please enter amount for 5 Birr card']}
                                                                />
                                                                <IconButton onClick={()=>this.removeIndex(5)} color={'secondary'} size={'medium'} style={{marginTop:10}}>
                                                                    <Close/>
                                                                </IconButton>
                                                        </div>
                                                    )
                                                :
                                                    (null)
                                            }

                                            {
                                                this.state.selectedCardType.indexOf(10)>-1
                                                ?
                                                    (
                                                        <div style={{display:'flex',flexDirection:'row'}}>
                                                            <TextValidator
                                                                    style={{width:'80%'}}
                                                                    label={'Enter your order amount for 10 Birr card'}
                                                                    onChange={this.handleChange}
                                                                    name="card_type_id_2"
                                                                    value={this.state.formData.card_type_id_2}
                                                                    validators={['required']}
                                                                    errorMessages={['Please enter amount for 10 Birr card']}
                                                                />
                                                                <IconButton onClick={()=>this.removeIndex(10)} color={'secondary'} size={'medium'} style={{marginTop:10}}>
                                                                    <Close/>
                                                                </IconButton>
                                                        </div>
                                                    )
                                                :
                                                    (null)
                                                }

                                                {
                                                this.state.selectedCardType.indexOf(15)>-1
                                                ?
                                                    (
                                                        <div style={{display:'flex',flexDirection:'row'}}>
                                                            <TextValidator
                                                                    style={{width:'80%'}}
                                                                    label={'Enter your order amount for 15 Birr card'}
                                                                    onChange={this.handleChange}
                                                                    name="card_type_id_3"
                                                                    value={this.state.formData.card_type_id_3}
                                                                    validators={['required']}
                                                                    errorMessages={['Please enter amount for 15 Birr card']}
                                                                />
                                                                <IconButton onClick={()=>this.removeIndex(15)} color={'secondary'} size={'medium'} style={{marginTop:10}}>
                                                                    <Close/>
                                                                </IconButton>
                                                        </div>
                                                    )
                                                :
                                                    (null)
                                            }


                                            {
                                                this.state.selectedCardType.indexOf(25)>-1
                                                ?
                                                    (
                                                        <div style={{display:'flex',flexDirection:'row'}}>
                                                            <TextValidator
                                                                    style={{width:'80%'}}
                                                                    label={'Enter your order amount for 25 Birr card'}
                                                                    onChange={this.handleChange}
                                                                    name="card_type_id_4"
                                                                    value={this.state.formData.card_type_id_4}
                                                                    validators={['required']}
                                                                    errorMessages={['Please enter amount for 25 Birr card']}
                                                                />
                                                                <IconButton onClick={()=>this.removeIndex(25)} color={'secondary'} size={'medium'} style={{marginTop:10}}>
                                                                    <Close/>
                                                                </IconButton>
                                                        </div>
                                                    )
                                                :
                                                    (null)
                                            }

                                            {
                                                this.state.selectedCardType.indexOf(50)>-1
                                                ?
                                                    (
                                                        <div style={{display:'flex',flexDirection:'row'}}>
                                                            <TextValidator
                                                                    style={{width:'80%'}}
                                                                    label={'Enter your order amount for 50 Birr card'}
                                                                    onChange={this.handleChange}
                                                                    name="card_type_id_5"
                                                                    value={this.state.formData.card_type_id_5}
                                                                    validators={['required']}
                                                                    errorMessages={['Please enter amount for 50 Birr card']}
                                                                />
                                                                <IconButton onClick={()=>this.removeIndex(50)} color={'secondary'} size={'medium'} style={{marginTop:10}}>
                                                                    <Close/>
                                                                </IconButton>
                                                        </div>
                                                    )
                                                :
                                                    (null)
                                            }


                                            {
                                                this.state.selectedCardType.indexOf(100)>-1
                                                ?
                                                    (
                                                        <div style={{display:'flex',flexDirection:'row'}}>
                                                            <TextValidator
                                                                    style={{width:'80%'}}
                                                                    label={'Enter your order amount for 100 Birr card'}
                                                                    onChange={this.handleChange}
                                                                    name="card_type_id_6"
                                                                    value={this.state.formData.card_type_id_6}
                                                                    validators={['required']}
                                                                    errorMessages={['Please enter amount for 100 Birr card']}
                                                                />
                                                                <IconButton onClick={()=>this.removeIndex(100)} color={'secondary'} size={'medium'} style={{marginTop:10}}>
                                                                    <Close/>
                                                                </IconButton>
                                                        </div>
                                                    )
                                                :
                                                    (null)
                                            }


                                        
                                            {
                                                this.state.selectedCardType.length>0
                                                ?
                                                    (
                                                        <LoadingButton
                                                            style={{width:'85%',marginTop:15,marginBottom:10}}
                                                            color="primary"
                                                            variant="contained"
                                                            type="submit"
                                                            loading={setLoading}
                                                            done={finished}
                                                            text={'Get cards'}
                                                            disabled={!isEnabled ||this.state.submitted}
                                                        >
                                                            {
                                                                'Get cards'
                                                            }
                                                        </LoadingButton>
                                                    )
                                                :
                                                    (null)
                                            }
                                        </ValidatorForm>

                                        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                            <Typography color={'primary'}>
                                                Select card type you want to order now.
                                            </Typography>
                                            <div>
                                            <Button  
                                            variant={'outlined'}
                                            color={'primary'}
                                            aria-controls="simple-menu" 
                                            style={{textTransform:'none'}}
                                            aria-haspopup="true" 
                                            onClick={this.handleClick}>
                                                {this.state.selectCard}
                                            </Button>
                                                <Menu
                                                id="simple-menu"
                                                anchorEl={this.state.anchorEl}
                                                keepMounted
                                                open={Boolean(this.state.anchorEl)}
                                                onClose={this.handleClose}
                                                >
                                                    {
                                                        this.props.cardType.map(cardType=>(
                                                            <MenuItem onClick={this.handleClose} value={cardType.value}>
                                                                {`${cardType.value} Birr card`}
                                                            </MenuItem>
                                                        ))
                                                    }
                                            </Menu>
                                            </div>
                                        </div>
                                </div>
                            )
                    }
                
        </div>
    }
}

const mapStateToProps = state=>({
    cardType:state.authReducer.commonReducer.cardTypeReducer.cardType,
    loading:state.authReducer.commonReducer.cardTypeReducer.loading
})
export default connect(mapStateToProps,{showMainDialog})(CardTypeAndAmountOrder)