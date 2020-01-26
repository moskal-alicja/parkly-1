import React from 'react'

import Header from '../Header'
import ReservationModal from './ReservationModal'
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
import { fetchReservations,reservationsModified } from '../../redux/actions'

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

class Reservations extends React.Component{

  constructor(props){
    super(props);
    this.state={
      page:1,
      pageSize:8,
      sortBy:'',
      sortDirection:'N',
      cityFilter:'',
      streetFilter:'',
      profitFilter:'',
      filterModal:false,
      loading:false
    }
  }

setFilters=(city,street,profit)=>{
     
    
    this.setState({
        cityFilter:city,
        streetFilter:street,
        profitFilter:profit,
        loading:true,
        filterModal:false
    })

    const user=this.props.user;
    let url='http://localhost:8080/reservations/filter/'+user.id+'?'

    if(city!='')
    {
        url=url+'&city='+city
    }
    
    if(street!='')
    {
        url=url+'&street='+street
    }

    url=url+'&totalCostFrom='+profit[0]
    url=url+'&totalCostTo='+profit[1]

    fetch(url,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'user_name':'parkly',
          'user_token':user.userToken
        },
      })
        .then(res => res.json())
        .then(reservations => {
          this.props.reservationsModified(reservations)
        })
        .catch(error => {
          console.log('error: ',error);
        });

    this.setState({loading:false});
}

cancelFilters=()=>{
    this.setState({filterModal:false})
}
  
onNext=()=>{
if(Math.ceil(this.props.reservations.length/this.state.pageSize)>=this.state.page+1)
    this.setState({page:this.state.page+1})
}

onPrevious=()=>{
if((this.state.page-1)>0)
this.setState({page:this.state.page-1})
}

clickAll=()=>{
    this.setState({loading:true})
    this.props.fetchReservations(this.props.user.id,this.props.user.userToken,'owner')
    this.setState({loading:false})
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

  if(sortBy==='client')
  {
      if(sortDirection==='A')
          return (p1.userFirstName+p1.userLastName).localeCompare(p2.userFirstName+p2.userLastName)
      else
          return -(p1.userFirstName+p1.userLastName).localeCompare(p2.userFirstName+p2.userLastName)
  }

  if(sortBy==='profit')
  {
      if(sortDirection==='A')
          return p1.totalCost-p2.totalCost
      else
          return p2.totalCost-p1.totalCost
  }

  if(sortBy==='date')
  {
      if(sortDirection==='A')
          return new Date(p1.dateFrom)-new Date(p2.dateFrom)
      else
          return new Date(p2.dateFrom)-new Date(p1.dateFrom)
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

  const {
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
                  Reservations
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
                      onClick={e=>this.setState({filterModal:true})}>
                      filter
                  </Button>
                  <Button
                      onClick={this.clickAll}>
                      all
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
            style={{flexBasis: '30%',height:'100%'}}>
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
                  parking address
              </Typography>
                  {sortDirection==='A' && sortBy==='address'?
                  <ArrowUpwardIcon/>
                  :sortDirection==='D' && sortBy==='address'?
                  <ArrowDownwardIcon/>:''}
          </Grid>

          <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{flexBasis: '30%',height:'100%'}}>
              <Typography 
                  variant='overline'
                  className={title}
                  onClick={e=>{
                      if(sortBy==='client')
                      {
                          if(sortDirection==='A')
                              this.setState({sortDirection:'D'})
                          
                          else if(sortDirection==='D')
                              this.setState({sortDirection:'N'})
                          else
                              this.setState({sortDirection:'A'})
                      }
                      
                      else
                          this.setState({sortBy:'client',sortDirection:'A'})
                      }}>
                  client
              </Typography>
                  {sortDirection==='A' && sortBy==='client'?
                  <ArrowUpwardIcon/>
                  :sortDirection==='D' && sortBy==='client'?
                  <ArrowDownwardIcon/>:''}
          </Grid>

          <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{flexBasis: '10%',height:'100%'}}>
              <Typography 
                  variant='overline'
                  className={title}
                  onClick={e=>{
                      if(sortBy==='profit')
                      {
                          if(sortDirection==='A')
                              this.setState({sortDirection:'D'})
                          
                          else if(sortDirection==='D')
                              this.setState({sortDirection:'N'})

                          else
                              this.setState({sortDirection:'A'})
                      }
                      
                      else
                          this.setState({sortBy:'profit',sortDirection:'A'})
                      }}>
                  profit
              </Typography>
                      {sortDirection==='A' && sortBy==='profit'?
                      <ArrowUpwardIcon/>
                      :sortDirection==='D' && sortBy==='profit'?
                      <ArrowDownwardIcon/>:''}
          </Grid>

          <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{flexBasis: '30%',height:'100%'}}>
              <Typography 
                  variant='overline'
                  className={title}
                  onClick={e=>{
                      if(sortBy==='date')
                      {
                          if(sortDirection==='A')
                              this.setState({sortDirection:'D'})
                          
                          else if(sortDirection==='D')
                              this.setState({sortDirection:'N'})
                          
                          else
                              this.setState({sortDirection:'A'})
                      }
                      
                      else
                          this.setState({sortBy:'date',sortDirection:'A'})
                      }}>
                  reservation date
              </Typography>
                  {sortDirection==='A' && sortBy==='date'?
                      <ArrowUpwardIcon/>
                      :sortDirection==='D' && sortBy==='date'?
                      <ArrowDownwardIcon/>:''}
          </Grid>
      </Grid>
      <div>
          {!this.props.reservations ? '':this.props.reservations.sort(this.comperator).map((r,i) =>{ 
                  if(i>=(page-1)*pageSize && i<page*pageSize)
                      return <ReservationModal key={i} reservation={r}/>
                  })}
      </div>
      {this.props.reservations.length>0 && !this.state.filterModal ?
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
                  {`${page} / ${Math.ceil(this.props.reservations.length/pageSize)}`}
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
      reservations:state.reservations,
      user:state.user
    }
}


const mapDispatchToProps = (dispatch) => ({
    fetchReservations:(id,token,flag)=>dispatch(fetchReservations(id,token,flag)),
    reservationsModified: reservations => dispatch(reservationsModified(reservations)),
})
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Reservations)))