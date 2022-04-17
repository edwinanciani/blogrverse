import { IconButton } from "@chakra-ui/react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedinIn, FaPatreon, FaTiktok, FaTwitch, FaTwitter, FaYoutube } from "react-icons/fa"

const FooterSocials = ({links}) => {
  console.log(links);
 return (
   <>
    {
      links.map(({platform, url}) => {
        switch (platform) {
          case 'twitter':
            return <IconButton as="a" href={url} aria-label={platform} target="_blank" icon={<FaTwitter fontSize="20px" />} />
          case 'twitch':
            return <IconButton as="a" href={url} aria-label={platform} target="_blank" icon={<FaTwitch fontSize="20px" />} />
          case 'youtube':
            return <IconButton as="a" href={url} aria-label={platform} target="_blank" icon={<FaYoutube fontSize="20px" />} />
          case 'facebook':
            return <IconButton as="a" href={url} aria-label={platform} target="_blank" icon={<FaFacebook fontSize="20px" />} />
          case 'linkedIn':
            return <IconButton as="a" href={url} aria-label={platform} target="_blank" icon={<FaLinkedinIn fontSize="20px" />} />
          case 'instagram':
            return <IconButton as="a" href={url} aria-label={platform} target="_blank" icon={<FaInstagram fontSize="20px" />} />
          case 'tiktok':
            return <IconButton as="a" href={url} aria-label={platform} target="_blank" icon={<FaTiktok fontSize="20px" />} />
          case 'github':
            return <IconButton as="a" href={url} aria-label={platform} target="_blank" icon={<FaGithub fontSize="20px" />} />
          case 'patreon':
            return <IconButton as="a" href={url} aria-label={platform} target="_blank" icon={<FaPatreon fontSize="20px" />} />
        }
      })
    }
   </>
 )
}

export default FooterSocials