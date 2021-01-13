import { Button, CircularProgress, Typography } from '@material-ui/core';
import React from 'react'
import {showCards,storeCards} from '../../partners/state/action/cardsAction'
import {connect} from 'react-redux'
import {showMainDialog} from '../../commons/state/action/dialogAction'
import { green } from '@material-ui/core/colors';
import {indexCardType} from '../state/action/cardTypeAction'
class PartnersOrderCard extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            importing:false
        }
        this.fileRef = React.createRef()
        
    }

    handleFile =event=>{
        const file = event.target.files[0]
        this.setState({
            importing:true
        })

        let formData = new FormData();
        formData.append('file',file)
        this.props.storeCards(formData)
    }

    openFile = ()=>{
        this.fileRef.current.click()
    }  

    componentWillReceiveProps(nextProps, nextContext) {

        if(nextProps.response.status){
            setTimeout(()=>{
                this.props.showMainDialog({'show':false,'page':null,'title':'',actions:{on:false,path:'',id:''}})
            },3000)
        }
    }

    render(){
        return <div>
            {
                this.state.importing
                ?
                    (
                        <div>
                           {
                               this.props.response.status
                               ?
                                    (
                                        
                                        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                            <Typography color={'primary'}>
                                            Uploading completed successfully
                                            </Typography>
                                        </div> 
                                    )
                               :
                                    (
                                        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                             <Typography variant={'h6'} style={{color:green[500],marginBottom:20}}>
                                                Uploading your file. Please wait a moment...
                                             </Typography>
                                            <CircularProgress color={'primary'}/>
                                        </div>
                                    )
                           }
                        </div>
                    )
                :
                    (
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                    <Typography color={'secondary'}>
                                        Import your CSV file from Ethio Tele server
                                    </Typography>

                                    <input
                                    type={'file'}
                                    style={{display:'none'}}
                                    ref={this.fileRef}
                                    onChange={this.handleFile}
                                    accept={'csv/*'}
                                    />
                                    <Button
                                    onClick={this.openFile}
                                    variant={'outlined'}
                                    color={'primary'}
                                    size={'medium'}
                                    style={{textTransform:'none',marginTop:20}}>
                                        import file
                                    </Button>
                        </div>
                    )
            }
        </div>
    }
}

const mapStateToProps = state=>({
    response:state.authReducer.partnerReducer.cardReducer.response,
    loading:state.authReducer.commonReducer.cardTypeReducer.loading,
    cardType:state.authReducer.commonReducer.cardTypeReducer.cardType
})
export default connect(mapStateToProps,{showCards,indexCardType,storeCards,showMainDialog})(PartnersOrderCard)