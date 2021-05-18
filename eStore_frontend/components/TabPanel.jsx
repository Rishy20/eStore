import React from "react";

const TabPanel = props => {
    const {children, value, index} = props;

    return (
        <div hidden={value !== index}>
            {children}
        </div>
    )
}

export default TabPanel;