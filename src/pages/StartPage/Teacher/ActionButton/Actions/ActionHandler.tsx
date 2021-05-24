import React, {FC, useContext} from "react";
import {SimpleDialog} from "components";

import StartPageContext from "../../StartPageContext";

import AddVideoConference from "./AddVideoConference";
import ManageMaterials from "./ManageMaterials";


export type AvailableActions = "addVideoConference" | "manageMaterials";

export interface ActionHandlerProps {
    action: AvailableActions | null;
    onActionUpdate: (newAction: AvailableActions | null) => any;
}

// eslint-disable-next-line @typescript-eslint/ban-types
const ACTION_COMPONENT_MAP: Record<AvailableActions, FC<{}>> = {
    addVideoConference: AddVideoConference,
    manageMaterials: ManageMaterials,
};

const ActionHandler = ({
    onActionUpdate,
    action,
}: ActionHandlerProps) => {
    const {
        scrollBack,
    } = useContext(StartPageContext);

    return (
        <SimpleDialog
            maxWidth="md"
            isOpen={Boolean(action)}
            primaryButton={null}
            title=""
            PaperProps={{
                style: {width: "100%"},
            }}
            onClose={() => {
                scrollBack();
                onActionUpdate(null);
            }}
        >
            {(() => {
                if (action) {
                    const Component = ACTION_COMPONENT_MAP[action];

                    return (
                        <Component />
                    );
                }
            })()}
        </SimpleDialog>
    );
};

export default ActionHandler;
