import { Heading, Stack, FormControl, FormLabel, Switch, Box, Button } from '@chakra-ui/react'
import { IoPushOutline } from 'react-icons/io5'
import AsyncCreatableSelect from 'react-select/async-creatable'
import React, { useState} from 'react'
import { getCategories, postCategories, sendPost } from '../../../../lib/formio'
import { toast, Toaster } from 'react-hot-toast'
import { useAuth } from '../../../../lib/context'
import kebabCase from 'lodash.kebabcase';
import { useRouter } from 'next/router'

export const Action = ({data, portfolio}) => {
  const [submission, setSubmission] = useState(data)
  const [categories, setCategories] = useState([])
  const {username } = useAuth()
  const router = useRouter()

  const savePost = async () => {
    console.log(submission);
    const slug = encodeURI(kebabCase(submission.data.title))
    // create categories
    await createCategories(categories, {username,slug,title: submission.data.title}).then(async (cats) => {
      submission.data.categories = cats;
      const data = {data: {...submission.data, slug, tips: 0, username, authorMeta: {avatar: portfolio?.data.about.avatar}}}
      await sendPost(data)
      toast.success(`${slug} created!`)
      router.push('/admin')
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
    categories.map(({data}) => ({label: data.data.label, value: data.data.value})):
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
  return new Promise ((resolve) => {
  if(categories.length === 0) {
    return;
  }
  let count = 0;
  let saveCategories = [];
  let sendCategory =  async () => {
    if(categories[count]) {
      if(categories[count].__isNew__) {
        postCategories({data:{label: categories[count].label, value: categories[count].value}})
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