// import { createContext } from "react";

// export const PreviewUpdatedContext = createContext();
import { createContext, useState } from "react";

export const PreviewUpdatedContext = createContext(null);

export const PreviewUpdatedProvider = ({ children }) => {
    const [updatePreview, setUpdatePreview] = useState();

    return (
        <PreviewUpdatedContext.Provider value={{ updatePreview, setUpdatePreview }}>
            {children}
        </PreviewUpdatedContext.Provider>
    );
};
