import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

//import { useHistory } from 'react-router-dom'


import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Signin = () => {
	const history = useHistory()
 const [password, SetPassword] = useState("")
const [username, SetUsername] = useState("");
//const history = useHistory()
   const ChangeForm = (e)=>{
	e.preventDefault();
						if(e.target.name === "username")
						   SetUsername(e.target.value) 
					   else{	   
						   SetPassword(e.target.value)
					   }
					   e.preventDefault();
}	
const SubmitForm = (e)=>{
	console.log(12123132)
	console.log(123123)
	if(username === "console" && password === "myconsole"){
		console.log(username)
	console.log(password)
		localStorage.setItem('myData', window.btoa(window.btoa(window.btoa(window.btoa( console )))));
	    //history.push("/")
		 console.log(localStorage.getItem("myData"));
		 history.push("../")
	}	
			
	e.preventDefault();		
}
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol xl={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm
					onChange={(e) => {
                      ChangeForm(e);
					}}
				  >
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" name="username" placeholder="Username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" name="password" placeholder="Password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton 
						color="success"
						onClick={(e) => {
							SubmitForm(e);
						}}		
						className="px-4">Login</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Signin