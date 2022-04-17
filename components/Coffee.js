import React from 'react';
import { Button } from '@chakra-ui/react'
import { SiBuymeacoffee } from 'react-icons/si';
import { FaBeer, FaPizzaSlice } from 'react-icons/fa';
import { BiBook } from 'react-icons/bi';
import { Text } from '@chakra-ui/react';

function Coffee({color, bg, link}) {
  const renderItem = (item) => {
    switch (item) {
      case 'coffee':
        return <SiBuymeacoffee />   
      case 'beer':
        return <FaBeer />
      case 'book':
        return <BiBook />
      case 'pizza':
        return <FaPizzaSlice />
    }
  }
  return (
    <a target={'_blank'} rel="noreferrer" href={link.url} className={`decoration`}>
      <Button w={'100%'} color={color} bg={bg} _hover={{background: 'primary.300'}} _focus={{background: 'primary.300', boxShadow: "0 0 1px 2px #C3376a, 0 1px 1px #C3376a"}}>
        {renderItem(link.item)} 
          <Text px={1}>Buy me a {link.item}</Text>
      </Button>
    </a>
  );
}

export default Coffee;
