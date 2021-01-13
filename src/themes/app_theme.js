import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles'
import createPalette from "@material-ui/core/styles/createPalette";


let theme = createMuiTheme({
   palette: createPalette(
       {
           primary:{
               main:'#6610f2'
           },
           textSecondary:{
               main: '#031b4e'
           }
       }
   )
})

theme = responsiveFontSizes(theme)

export default theme

