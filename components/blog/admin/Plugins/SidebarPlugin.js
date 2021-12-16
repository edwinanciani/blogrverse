
import { IconButton } from '@chakra-ui/button';
import {FiPlus} from 'react-icons/fi'
import {useState} from 'react'
import {motion} from 'framer-motion'
import { List, ListItem } from '@chakra-ui/layout';

export const SidebarPlugin = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  console.log(props);
  return (
    <div>
      <IconButton
      className=''
  colorScheme='teal'
  aria-label='open Plugins'
  size='sm'
  onClick={()=> setIsOpen(!isOpen)}
  icon={
    <motion.div
    initial={{}}
    animate={isOpen? {rotateZ: 45, opacity: 1}: null}
    transition={{ ease: "easeIn", duration: 0.3 }}>
  <FiPlus /></motion.div>}
/>
      {
        isOpen ? 
    <motion.div
    initial={{opacity: 0, height: '0', padding: '10px 0'}}
    animate={isOpen? {opacity: 1, height: '100%'}: null}
    transition={{ ease: "easeIn", duration: 0.3 }}>
        <List>
        {props.plugins.map(plugin => { 
          return (<ListItem key={plugin.title}>
          {plugin.buttonComponent}
        </ListItem>)})}
      </List></motion.div>
      :
      null
      }
    </div>
  )
}
