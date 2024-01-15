import { useState } from 'react';

export default function CalculationsManager() {

    const [isAdvancedCalculations, setIsAdvancedCalculations] = useState(false);

    const toggleCalculationsMode = () => {
        setIsAdvancedCalculations(!isAdvancedCalculations)
    }

    return(
        <div>
        </div>
    )
}
