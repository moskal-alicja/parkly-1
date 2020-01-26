import React from 'react'

import Header from '../Header'
import ParkingModal from './ParkingModal'
import FilterModal from './FilterModal'

import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDropDownSharp'
import ArrowUpwardIcon from '@material-ui/icons/ArrowDropUpSharp'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'



import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { parkingsModified } from '../../redux/actions'


const styles={
    card:{
        height: '100px',
        backgroundColor: '#ffffff',
        margin:'10px 0px 5px 0px'

    },
    cardTitles:{
        backgroundColor:'transparent',
        height:'50px'
    },
    grid:{
        height:'100%' 
    },
    gridTitles:{
        height:'30px' 
    },
    title1:{
        textAlign: 'center',
        color:'#ffffff',
        cursor:'pointer'
    },
    title:{
        textAlign: 'center',
        color:'#ffffff',
        cursor:'pointer'
    },

    circule:{
        position: 'fixed',
        top: '50%',
        left: '48%',
        color:'#A40E4C',
    }

}



  
class Parkings extends React.Component{
    constructor(props){
        super(props);
        this.state={
            page:1,
            pageSize:8,
            sortBy:'',
            sortDirection:'N',
            filterModal:false,
            cityFilter:'',
            streetFilter:'',
            hoursFilter:'',
            loading:false
        }

    }

    setFilters=(city,street,hours)=>{
        this.setState({
            cityFilter:city,
            streetFilter:street,
            hoursFilter:hours,
            loading:true,
            filterModal:false
        })
        const user=this.props.user;
        let url='http://localhost:8080/parkings/filter?ownerId='+user.id

        if(city!='')
        {
            url=url+'&city='+city
        }
        
        if(street!='')
        {
            url=url+'&street='+street
        }

        url=url+'&workingHoursFrom='+hours[0]
        url=url+'&workingHoursTo='+hours[1]

        fetch(url,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'user_name':'parkly',
              'user_token':user.userToken
            },
          })
            .then(res => res.json())
            .then(parkings => {
              this.props.parkingsModified(parkings)
            })
            .catch(error => {
              console.log('error: ',error);
            });

        this.setState({loading:false});
        
    }

    cancelFilters=()=>{
        this.setState({filterModal:false})
    }

    clickFilter=()=>{
        this.setState({filterModal:true})
    }
    clickAdd=()=>{
        this.props.history.push('/addParking')
    }

    onNext=()=>{
        if(Math.ceil(this.props.parkings.length/this.state.pageSize)>=this.state.page+1)
            this.setState({page:this.state.page+1})
    }

    onPrevious=()=>{
        if((this.state.page-1)>0)
        this.setState({page:this.state.page-1})
    }

    comperator=(p1,p2)=>{
    
    const{
        sortBy,
        sortDirection
    }=this.state

    if(sortDirection==='N')
        return 0;

    if(sortBy==='address')
    {
        if(sortDirection==='A')
            return (p1.city+p1.street+p1.number).localeCompare(p2.city+p2.street+p2.number)
        else
            return -(p1.city+p1.street+p1.number).localeCompare(p2.city+p2.street+p2.number)
    }

    if(sortBy==='spotsNumber')
    {
        if(sortDirection==='A')
            return p1.spotsNumber-p2.spotsNumber
        else
            return p2.spotsNumber-p1.spotsNumber
    }

    if(sortBy==='price')
    {
        if(sortDirection==='A')
            return p1.price-p2.price
        else
            return p2.price-p1.price
    }

    if(sortBy==='workingHours')
    {
        if(sortDirection==='A')
            return new Date(p1.opens)-new Date(p2.opens)
        else
            return new Date(p2.opens)-new Date(p1.opens)
    }

    }
    render(){

        const {
            card,
            grid,
            gridTitles,
            title1,
            title,
            circule
        }=this.props.classes

        const{
            page,
            pageSize,
            sortBy,
            sortDirection,
            filterModal,
            loading
        }=this.state
        return(
            <>
            {loading ? <CircularProgress className={circule}/>:''}
            {filterModal ? <FilterModal filterClick={this.setFilters} cancelClick={this.cancelFilters}/>:''}
            <Header/>
            <Container>
                    <Card
                        className={card}>
                        <Grid
                            className={grid}
                            container
                            direction="column"
                            justify="flex-end"
                            alignItems="center">
                            <Typography 
                                variant='h5'
                                align='center'
                                style={{ 
                                        color: '#565656', 
                                        width:'100%'}}>
                                Parkings
                            </Typography>
                            <ButtonGroup 
                                        variant="text" 
                                        style={{ 
                                            backgroundColor: '#ffffff',
                                            color:'#565656',
                                            width:'100%',
                                            justifyContent:'flex-end',
                                            height: '35px'}}
                                        size='small'>
                                <Button
                                    onClick={this.clickFilter}>
                                    filter
                                </Button>
                                <Button
                                    onClick={this.clickAdd}>
                                    add
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </Card>
                        <Grid  
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                            className={gridTitles}>

                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    style={{flexBasis: '35%',height:'100%'}}>
                                    <Typography 
                                        variant='overline'
                                        className={title1}
                                        onClick={e=>{
                                            if(sortBy==='address')
                                            {
                                                if(sortDirection==='A')
                                                    this.setState({sortDirection:'D'})
                                                
                                                else if(sortDirection==='D')
                                                    this.setState({sortDirection:'N'})
                                                
                                                else
                                                    this.setState({sortDirection:'A'})
                                            }
                                            
                                            else
                                                this.setState({sortBy:'address',sortDirection:'A'})
                                            }}>
                                        address
                                    </Typography>
                                        {sortDirection==='A' && sortBy==='address'?
                                        <ArrowUpwardIcon
                                            style={{color:'#fff'}}/>
                                        :sortDirection==='D' && sortBy==='address'?
                                        <ArrowDownwardIcon
                                            style={{color:'#fff'}}/>:''}
                                </Grid>

                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    style={{flexBasis: '15%',height:'100%'}}>
                                    <Typography 
                                        variant='overline'
                                        className={title}
                                        onClick={e=>{
                                            if(sortBy==='spotsNumber')
                                            {
                                                if(sortDirection==='A')
                                                    this.setState({sortDirection:'D'})
                                                
                                                else if(sortDirection==='D')
                                                    this.setState({sortDirection:'N'})
                                                else
                                                    this.setState({sortDirection:'A'})
                                            }
                                            
                                            else
                                                this.setState({sortBy:'spotsNumber',sortDirection:'A'})
                                            }}>
                                        number of spots
                                    </Typography>
                                        {sortDirection==='A' && sortBy==='spotsNumber'?
                                        <ArrowUpwardIcon
                                        style={{color:'#fff'}}/>
                                        :sortDirection==='D' && sortBy==='spotsNumber'?
                                        <ArrowDownwardIcon
                                        style={{color:'#fff'}}/>:''}
                                </Grid>

                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    style={{flexBasis: '15%',height:'100%'}}>
                                    <Typography 
                                        variant='overline'
                                        className={title}
                                        onClick={e=>{
                                            if(sortBy==='price')
                                            {
                                                if(sortDirection==='A')
                                                    this.setState({sortDirection:'D'})
                                                
                                                else if(sortDirection==='D')
                                                    this.setState({sortDirection:'N'})

                                                else
                                                    this.setState({sortDirection:'A'})
                                            }
                                            
                                            else
                                                this.setState({sortBy:'price',sortDirection:'A'})
                                            }}>
                                        price per hour
                                    </Typography>
                                            {sortDirection==='A' && sortBy==='price'?
                                            <ArrowUpwardIcon
                                            style={{color:'#fff'}}/>
                                            :sortDirection==='D' && sortBy==='price'?
                                            <ArrowDownwardIcon
                                            style={{color:'#fff'}}/>:''}
                                </Grid>

                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    style={{flexBasis: '15%',height:'100%'}}>
                                    <Typography 
                                        variant='overline'
                                        className={title}
                                        onClick={e=>{
                                            if(sortBy==='workingHours')
                                            {
                                                if(sortDirection==='A')
                                                    this.setState({sortDirection:'D'})
                                                
                                                else if(sortDirection==='D')
                                                    this.setState({sortDirection:'N'})
                                                
                                                else
                                                    this.setState({sortDirection:'A'})
                                            }
                                            
                                            else
                                                this.setState({sortBy:'workingHours',sortDirection:'A'})
                                            }}>
                                        working hours
                                    </Typography>
                                        {sortDirection==='A' && sortBy==='workingHours'?
                                            <ArrowUpwardIcon
                                            style={{color:'#fff'}}/>
                                            :sortDirection==='D' && sortBy==='workingHours'?
                                            <ArrowDownwardIcon
                                            style={{color:'#fff'}}/>:''}
                                </Grid>
                        </Grid>
                    <div>
                        {!this.props.parkings ? '':this.props.parkings.sort(this.comperator).map((p,i) =>{ 
                                if(i>=(page-1)*pageSize && i<page*pageSize)
                                    return <ParkingModal key={p.id} parking={p}/>
                                })}
                    </div>
                {this.props.parkings.length>0 && !this.state.filterModal ?
                    <div
                        style={{ 
                            width:'100%',
                            justifyContent:'center',
                            display:'flex'}}
                        >
                        <IconButton onClick={this.onPrevious}
                            style={{color: '#fff'}}>
                            <KeyboardArrowLeft/>
                        </IconButton>
                        <Typography variant={'button'} style={{ margin: '12px 20px',  color:'#fff'}}>
                            {`${page} / ${Math.ceil(this.props.parkings.length/pageSize)}`}
                        </Typography>
                        <IconButton onClick={this.onNext}
                            style={{color: '#fff'}}>
                            <KeyboardArrowRight/>
                        </IconButton>
                    </div>:<div/>}
            </Container>
            </>)
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
      parkings:state.parkings,
      user:state.user
    }
}
const mapDispatchToProps = (dispatch) => ({
    parkingsModified: parkings => dispatch(parkingsModified(parkings)),
    
})
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Parkings)))