import { createApi } from "unsplash-js";
const unsplash = createApi({
  accessKey: 'KTq4nZV1l70s54D6Y90tzfQq8LGp3ws6YO2ZGaLBoGQ',
  fetch
})
export default function handler (req, res) {
  const query = req.query
  unsplash.search.getPhotos({
    query: query.search 
  }).then(( results => {
    if (results.type === 'success') {
      res.status(200).json(results.response.results)
    } else {
      res.status(404).send({error: 'Images not found'})
    }
  }))
}