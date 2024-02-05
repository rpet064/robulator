const splitStringForCalculation = (input: string) => {
    try {
        const combined = input.replace(/\s+/g, '');
        const parts = combined.split(/(\d+)/);
        return parts;
        
    } catch (e) {
        throw new Error(`Could not split string ${e}`)
    }
}   