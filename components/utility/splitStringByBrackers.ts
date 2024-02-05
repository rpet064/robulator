const splitStringByBrackers = (input: string) => {
    try{
        const parts = input.split(/(\(|\))/);
        return parts
        
    } catch (e) {
        throw new Error(`Could not split string ${e}`)
    }
}