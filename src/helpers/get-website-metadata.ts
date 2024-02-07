import { getTinyFavicon } from './get-tiny-favicon'

const AMAZON_DOMAIN = 'www.amazon.com'


export const getWebsiteMetadata = async (url: string) => {
  try {
    const response = await fetch(`/api/proxy-url?url=${url}`, {
      method: 'GET',
    })
    
    if (!response.ok) {
      throw new Error(`[Error on feching page]: ${response.status}`)
    }

    const htmlResponse = await response.json() as {html: string}
    
    const html = htmlResponse.html

    const parser = new DOMParser()
    
    const doc = parser.parseFromString(html, 'text/html')
    const title = doc.querySelector('title')?.textContent ?? ''
    const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''
    const favIconRef = doc.querySelector('link[rel="icon"]')?.getAttribute('href') ?? ''
    
    const [protocol] = url.split('://')
    const domain = `${protocol}://${new URL(url).hostname}`

    let image = `${domain}${favIconRef}`

    if (favIconRef.startsWith('http')){
      image = favIconRef
    }

    if (domain.includes(AMAZON_DOMAIN)){
      image = `https://${AMAZON_DOMAIN}/favicon.ico`
    }

    return {
      doc, 
      title,
      description,
      domain,
      image: image.includes('favicon') ? image : getTinyFavicon(url, 128)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}