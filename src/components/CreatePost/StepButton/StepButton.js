
import React from "react";


export const StepButton = props => {
    const { step } = props;

    switch (step) {
        case 1:
            return (
                <button type="submit">continue</button>
            );
        case 2:
            return (
                <button type="submit">submit</button>
            );
        default:
            return <></>;
    }
};
