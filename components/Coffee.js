import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@chakra-ui/react'



const Image = styled.img`
  height: 24px;
  width: 35px;
  margin-bottom: 1px;
  box-shadow: none;
  border: none;
  vertical-align: middle;
`;

function Coffee({color, bg}) {
  return (
    <a target={'_blank'} rel="noreferrer" href="https://www.buymeacoffee.com/edwinanciani" className={`decoration`}>
      <Button w={'100%'} color={color} bg={bg} _hover={{background: 'primary.300'}} _focus={{background: 'primary.300', boxShadow: "0 0 1px 2px #C3376a, 0 1px 1px #C3376a"}}>
        <Image src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a coffee" />
        Buy me a coffee
      </Button>
    </a>
  );
}

export default Coffee;
