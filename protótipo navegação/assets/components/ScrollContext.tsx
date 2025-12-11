import React, { createContext, useContext, useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native';

interface ScrollContextType {
    scrollViewRef: React.RefObject<ScrollView>;
    currentScrollY: number;
    onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const useScroll = () => {
    const context = useContext(ScrollContext);
    return context;
};

interface ScrollProviderProps {
    children: React.ReactNode;
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const [currentScrollY, setCurrentScrollY] = useState(0);

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        setCurrentScrollY(event.nativeEvent.contentOffset.y);
    };

    return (
        <ScrollContext.Provider value={{ scrollViewRef, currentScrollY, onScroll }}>
            {children}
        </ScrollContext.Provider>
    );
};
