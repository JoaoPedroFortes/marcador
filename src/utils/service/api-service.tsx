type Props = {
    url: string;
    token: string;
    callback: (data: any) => void;
    callbackError: (error?: any) => void;

}

type PostProps = Props & {
    body: any;
}

export async function httpGET(props: Props) {

    const { url, token, callback, callbackError } = props;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            callbackError(response)
        }

        const responseData = await response.json();
        callback(responseData)
    } catch (error) {
        callbackError();
    }
}

export async function httpPost(postProps: PostProps) {

    const { url, token, body, callback, callbackError } = postProps;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            callbackError(response)
        }

        const responseData = await response.json();
        callback(responseData)
    } catch (error) {
        callbackError();
    }
}