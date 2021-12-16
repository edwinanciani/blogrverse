import { Heading, Stack, FormControl, FormLabel, Switch, Box, Button } from '@chakra-ui/react'
import { IoPushOutline } from 'react-icons/io5'
import AsyncCreatableSelect from 'react-select/async-creatable'
import React, {useState, useContext} from 'react'
import { getCategories } from '../../../../lib/formio'
import { toast, Toaster } from 'react-hot-toast'
import { UserContext } from '../../../../lib/context'
import { auth, firestore, serverTimestamp } from '../../../../lib/firebase'
import kebabCase from 'lodash.kebabcase';

export const Action = ({data}) => {
  const [submission, setSubmission] = useState(data)
  const [categories, setCategories] = useState([])
  const {username } = useContext(UserContext)

  const savePost = async () => {
    console.log(submission);
    const slug = encodeURI(kebabCase(submission.data.title))
    const uid = auth.currentUser.uid
    const postRef = firestore.collection('posts').doc(slug)
    // create categories
    await createCategories(categories, {username,slug,title: submission.data.title}).then(async (cats) => {
      submission.data.categories = cats;
      const data = {...submission.data, slug, created: serverTimestamp(), modified: serverTimestamp(), tips: 0, author: username, uid}
      await postRef.set(data)
      toast.success(`${slug} created!`)
    })
  }
  
  const makePublic = ({target}) => {
    submission.data.public = target.checked
    setSubmission(submission)
  }
  const makePrivate = ({target}) => {
    submission.data.private = target.checked
    setSubmission(submission)
  }
  const Categories = async (event) => {
    console.log(event)
    setCategories(event)
  }
  const getAllCategories = async () => {
    const categories = await getCategories({})
    return categories.length > 0 ? 
    categories.map(category => ({label: category.data.label, value: category.data.value})):
    []
  }
  
  return (
    <>
      <Toaster />
      <Heading as={'h3'} size={'md'}>Actions</Heading>
      <Stack w={'50%'} spacing={4}>
        <FormControl py={6} display="flex" alignItems="center">
          <FormLabel htmlFor="public" mb="0">
            {/* On change Published */}
            Public
          </FormLabel>
          <Switch id="public" onChange={makePublic} />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="private" mb="0">
            {/* On change Published */}
            Private
          </FormLabel>
          <Switch id="private" onChange={makePrivate}/>
        </FormControl>
        <Box py={4}>
          <AsyncCreatableSelect
              isClearable
              isMulti
              cacheOptions
              onChange={Categories}
              defaultOptions
              loadOptions={getAllCategories}
              placeholder={'Categories...'}
              options={categories}
              />
        </Box>
        <Button
          mt={4}
          onClick={savePost}
          leftIcon={<IoPushOutline />}
          colorScheme="blue"
          isLoading={false}
          variant="outline"
          type="submit"
          isDisabled={false}
        >
          Save Post
        </Button>
      </Stack>
    </>
  )
}
const createCategories = (categories, post) => {
  return new Promise ((resolve) => {
  if(categories.length === 0) {
    return;
  }
  let count = 0;
  let saveCategories = [];
  const catRef = firestore.collection('categories')
  let sendCategory =  async () => {
    if(categories[count]) {
      if(categories[count].__isNew__) {
        const cat = await catRef.doc(categories[count].value)
        cat.set({name: categories[count].value, value: categories[count].value, post })
        saveCategories.push(categories[count].value)
        count++
        sendCategory()
      } else {
        saveCategories.push(categories[count].value)
        count++
        sendCategory()
      }
    } else {
      return resolve(saveCategories)
    }
  }
  sendCategory()
  })
}