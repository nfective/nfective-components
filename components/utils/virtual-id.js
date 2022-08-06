import { customAlphabet } from 'nanoid'

export default function useVirtualId() {
    const nanoid = customAlphabet('0123456789abvdef', 16)
    return nanoid()
}

