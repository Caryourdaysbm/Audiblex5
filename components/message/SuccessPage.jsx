import React from 'react'
import styled from 'styled-components'
import { Images } from '../../assets/images/Images'


/*
    <SuccessPage messages="Password changed." links="/accounts/login" btn_labels="Login" status="success" />
*/ 

export const SuccessPage = ({messages, links, btn_labels, status}) => {
  return (
    <Container>
        <div className='success'>
          <img src={Images.valid}/>
          <h1 className='success_title'>{messages}</h1>

          {links && <a href={links} target="blank" className='important-btn success_btn' rel="noopener noreferrer">{btn_labels}</a>}
        </div>
      </Container>
  )
}

const Container = styled.section`

.success{
  padding: 40px;
  background: #ffffff;
  border: 1px solid rgba(44, 51, 58, 0.2);
  border-radius: 5px;
  margin: 100px auto;
  max-width: 470px;
  h1.success_title{
    text-align: center;
    font-size: 1.2em;
    line-height: 140%;
  }
  .success_btn{
    display: block;
    text-align: center;
  }
  @media (max-width: 540px) {
    padding: 40px 20px;
  }

}

`
