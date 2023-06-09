import  { createContext,  useState } from 'react';

export const DarkContext = createContext()


const DarkModeProvider = ({children}) => {
     const [isDark, setIsDark] = useState(false);

     const mode = {
        isDark,
        setIsDark
     }

    return (
      <DarkContext.Provider value={mode}>
        <div className={isDark? 'dark': ''}>{children}</div>
      </DarkContext.Provider>
    );
};

export default DarkModeProvider;