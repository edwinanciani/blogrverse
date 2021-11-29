import { Heading, Stack, FormControl, FormLabel, Switch, Box, Button } from '@chakra-ui/react'
import { IoPushOutline } from 'react-icons/io5'
import AsyncCreatableSelect from 'react-select/async-creatable'
import React, {useState} from 'react'
import { getCategories, postCategories, sendPost } from '../../../../lib/formio'
import { toast, Toaster } from 'react-hot-toast'


export const Action = ({data}) => {
  const [submission, setSubmission] = useState(data)
  const [categories, setCategories] = useState([])


  const savePost = async () => {
    console.log(submission);
    // create slug
    submission.data.slug = submission.data.title.replace(/\s/g, '-').toLowerCase();
    // create categories
    createCategories(categories).then((cats) => {
      submission.data.categories = cats;
      sendPost(submission).then(post => {
        toast.success(`${post.data.slug} created!`)
      })
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
const createCategories = (categories) => {
  return new Promise ((resolve, reject) => {
  if(categories.length === 0) {
    return;
  }
  let count = 0;
  let saveCategories = [];
  let sendCategory =  () => {
    if(categories[count]) {
      if(categories[count].__isNew__) {
        postCategories({data: categories[0]}).then((response) => {
          saveCategories.push(response.data.value)
          count++
          sendCategory()
        })
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