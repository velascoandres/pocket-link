import { redirectLinkByPath } from '@/app/_actions'

interface Params {
	p: string[]
}


const PathPage = async ({ params }: { params: Params }) => {

	const pathToRedirect = params.p.join('/')

	console.log(pathToRedirect)

	await redirectLinkByPath(pathToRedirect)

	return null
}


export default PathPage

