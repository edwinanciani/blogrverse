import { Box, SimpleGrid } from '@chakra-ui/react'
import AuthCheck from '../../components/AuthCheck'
import AdminPosts from '../../components/blog/admin/AdminPosts'

const AdminPage = () => {

  return (
    <Box py={12}>
      <AuthCheck>
        <SimpleGrid columns={[1,1,2]} justifyItems={'space-between'}>
          <AdminPosts />
          <Box w="100%">Videos/Podcast Coming soon.</Box>
        </SimpleGrid>
      </AuthCheck>
    </Box>
  )
}

export default AdminPage
