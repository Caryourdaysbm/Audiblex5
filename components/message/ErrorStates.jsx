import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const ErrorState = (props) => {
  return (
    <Container>
      <div className="status">
        <Image  src={props.img} width={460} height={266.664} alt={404} />
        <h3 >{props.title}</h3>
        <p>{props.text}</p>

        <Link href="/">Back to homepage</Link>
      </div>
    </Container>
  );
};

export default ErrorState;

let Container = styled.section`
    max-width: 500px;
    margin: 70px auto;
  .status {
    text-align: center;
    padding: 20px;
    margin-bottom: 30px;
    h3 {
      font-size: 46px;
      margin-bottom: 20px;
      font-weight: 600;
      line-height: 56px;
      letter-spacing: 0em;
      text-align: center;
    }
    a {
      margin-top: 30px;
      font-weight: 500;
      font-size: 18px;
      color: #00838f;
      &:hover {
        text-decoration: underline;
      }
    }
    p {
      text-align: center;
      margin-bottom: 30px;
    }
  }
`;
