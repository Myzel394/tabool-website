import axios from "axios";

import getLoginData from "../getLoginConfig";


export interface IConfirmEmailData {
    token: string;
}

export interface IConfirmEmailResponse {}


export const confirmEmail = async ({token}: IConfirmEmailData): Promise<IConfirmEmailResponse> => {
    const {data} = await axios.post("/api/auth/confirmation/", {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        confirmation_key: token,
    }, await getLoginData());
    return data;
};

export default confirmEmail;
