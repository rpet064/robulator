import { Dispatch, SetStateAction } from "react";

export interface calculationsManagerProps {
    firstCalculatorInput: string;
    setFirstCalculatorInput: Dispatch<SetStateAction<string>>;
    secondCalculatorInput: string;
    setSecondCalculatorInput: Dispatch<SetStateAction<string>>;
    setPrevInput: (value: string) => void;
    operator: string;
    setOperator: (value: string) => void;
    isLastCalculationAnOperator: boolean;
    isDecimalUnfinished: boolean;
    doesCalculationExceedInput: boolean;
    overwriteNumber: boolean;
    setOverwriteNumber: (value: boolean) => void;
    setIsLastCalculationAnOperator: (value: boolean) => void;
    setDoesCalculationExceedInput: (value: boolean) => void;
    setIsDecimalUnfinished: (value: boolean) => void;
    prevOperationsArray: string[];
    setPrevOperationsArray: Dispatch<SetStateAction<string[]>>;
    setEqualityMessage: Dispatch<SetStateAction<string>>;
}

export interface KeypadProps {
 firstCalculatorInput: string;
 setFirstCalculatorInput: Dispatch<SetStateAction<string>>;
 secondCalculatorInput: string;
 setSecondCalculatorInput: Dispatch<SetStateAction<string>>;
 setPrevInput: (value: string) => void;
 operator: string;
 setOperator: (value: string) => void;
 isScientificSymbolsArray: boolean;
 prevOperationsArray: string[];
 setPrevOperationsArray: Dispatch<SetStateAction<string[]>>;
 setEqualityMessage: Dispatch<SetStateAction<string>>;
}

export interface SideMenuProps {
 ScientificSymbolsArray: boolean;
 setScientificSymbolsArray: Dispatch<SetStateAction<boolean>>;
 theme: string;
 setTheme: Dispatch<SetStateAction<string>>;
 setPrevOperationsArray: Dispatch<SetStateAction<string[]>>;
}

export interface HistorySideMenuProps {
 theme: string;
 prevOperationsArray: string[];
}

export interface HistoryMenuProps {
 isSideMenuOpen: boolean;
 setIsSideMenuOpen: (value: boolean) => void;
 prevOperationsArray: string[];
}

export interface CalculatorProps {
 theme: string;
 setTheme: Dispatch<SetStateAction<string>>;
}

export interface AboutMenuModalProps {
 aboutMenuIsOpen: boolean;
 setAboutMenuIsOpen: (value: boolean) => void;
}

export interface AboutMenuProps {
 theme: string;
}

export interface WindowSizeProps {
 width: number;
 height: number;
}

export interface ExponentDictionary {
 [key: string]: string;
}
