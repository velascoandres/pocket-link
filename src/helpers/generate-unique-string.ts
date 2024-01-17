import { v4 as uuidv4 } from 'uuid'

interface Options {
    size?: number
}

export const generateUniqueString = (options: Options) => {
    const { size = 5 } = options

    if (size < 0) {
        throw new Error('Negative size is not allowed')
    }

    const startIndex = 2
    const endIndex = startIndex + size

    const random = uuidv4().replace('-', '')
    const maxIndex = random.length - 1

    if (endIndex > maxIndex){
        throw new Error('Size exceeds')
    }
    
    return random.slice(startIndex, endIndex)
}