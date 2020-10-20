import client from "../client";


export interface IConfirmEmailData {
    token: string;
}

export interface IConfirmEmailResponse {

}


export const confirmEmail = async ({token}: IConfirmEmailData): Promise<IConfirmEmailResponse> => {
    const {data} = await client.post("/api/auth/confirm-email/", {
        token,
    });
    return data;
};

export default confirmEmail;
