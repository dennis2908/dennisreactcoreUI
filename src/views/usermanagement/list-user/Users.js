import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'

import usersData from './UsersData'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const Users = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [loading, setLoading] = useState(true)
  const [userlist, setuserlist] = useState(usersData.usersData)
    
	

const fetchData = () => {
	fetch("https://sharingvision-backend.herokuapp.com/user/5/1")
      .then(res => res.json())
      .then(
        (result) => {
		  setuserlist(result.data)
		  setLoading(false);
		});	
	
}

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

useEffect(() => {

  fetchData();

}, []);		
  const pageChange = newPage => {
   console.log(newPage)
	setLoading(true);
	fetch("https://sharingvision-backend.herokuapp.com/user/5/"+newPage)
      .then(res => res.json())
      .then(
        (result) => {
		  setuserlist(result.data)
		  setPage(newPage)
		  setLoading(false)
		  console.log(page)
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
            itemsPerPage={5}
            activePage={page}
            clickableRows
			loading={loading}
            onRowClick={(item) => history.push(`/usermanagement/listusers/${item.id}`)}
            scopedSlots = {{
              'status':
                (item)=>(
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {item.status}
                    </CBadge>
                  </td>
                )
            }}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={5}
            doubleArrows={true} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users
