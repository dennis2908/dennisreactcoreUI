import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { primaryBadge } from '../../genFunctions/genFunctions'
import { store } from '../../redux/store'
import { connect } from 'react-redux'
import {
  CBadge,
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'

import usersData from './UsersData'

//import CIcon from '@coreui/icons-react'

const Users = ({match}) => {
  const history = useHistory()
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
//  const [loading, setLoading] = useState(true)
  const [userlist, setuserlist] = useState(usersData.usersData)
    


useEffect(() => {
  async function MyfetchData() {
	await fetch("https://sharingvision-backend.herokuapp.com/user/5/1")
      .then(res => res.json())
      .then(
        (result) => {
		  let Datalist = []
		  let j=0
		  for(var i = 0;i<5;i++){ 
		     if(result.data[j])
				Datalist[i] = result.data[j]
			 j++
		  }
		  setuserlist(Datalist)
		  //console.log(Datalist)
		  setLoading(false)
		  //return
		});	
	
}
  //store.dispatch({ type: 'CHANGE_STATE', payload: { loading : true } })
  MyfetchData();
  

}, []);		
  async function pageChange(newPage) {
    setLoading(true)
	await fetch("https://sharingvision-backend.herokuapp.com/user/5/"+parseInt(newPage))
      .then(res => res.json())
      .then(
        (result) => {
		  let numb = 5*(parseInt(newPage)-1)
		  let Datalist = []
		  let j=0
		  for(var i = numb;i<(numb+5);i++){ 
		     if(result.data[j])
				Datalist[i] = result.data[j]
			 j++
		  }
		  //console.log(Datalist)
		  setuserlist(Datalist)
		  setPage(newPage)
		  setLoading(false)
		});	
  }

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Users
            <small className="text-muted"> List User</small>
          </CCardHeader>
          <CCardBody >
          <CDataTable
            items={userlist}	
            fields={usersData.fields}
            hover
            striped
			activePage = {page}
            itemsperpage={5}
            //clickableRows
			loading={loading}
            //onRowClick={(item) => history.push(`/usermanagement/listusers/${item.id}/`+page)}
            scopedSlots = {{
				'button_td':
                (item)=>(
                  <td>
                     <CButton 
					  onClick={(e) => {
							 history.push(`/usermanagement/listusers/${item.id}/`+page)
						}}
					  type="submit" size="sm" color="danger"> <i class="cil-trash"></i>  Delete
					  </CButton>
                  </td>
                ),
				'index':
                (item,index)=>(
				  <td>
				   <CBadge color="info">
                      {index+1}
                   </CBadge>
				  </td>
                ),
				'username':
                (item)=>(
				  <td>
				  {primaryBadge(item.username)}
				  </td>
                ),
				'password':
                (item)=>(
				  <td>
				  {primaryBadge(item.password)}
				  </td>
                ),
				'name':
                (item)=>(
				  <td>
				  {primaryBadge(item.name)}
				  </td>
                ),
				'id':
                (item)=>(
				  <td>
				  {primaryBadge(item.id)}
				  </td>
                )
            }}
          />
          <CPagination
            activePage = {page} 
            onActivePageChange={pageChange}
             itemsPerPage={5}
            doubleArrows={true} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

const mapStateToProps = (state, action) => {
  console.log(state)
  return { state: action.history.location.pathname };
};

export default connect(mapStateToProps,{ store: store })(Users)
