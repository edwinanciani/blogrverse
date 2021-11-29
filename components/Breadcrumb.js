import { ChevronRightIcon } from '@chakra-ui/icons'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

const Breadcrumbs = ({paths}) => {
  if (!paths) {
    return (<></>)
  }
  const {past, current} = paths
  return(
    <Breadcrumb p={2} pt={10} spacing="8px" fontSize={'xs'} separator={<ChevronRightIcon color="gray.500" />}>
      <BreadcrumbItem>
        <BreadcrumbLink href={past.path}>{past.name}</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink>{current.name}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}

export default Breadcrumbs
