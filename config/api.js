// pages/api/get_favourite_list.js
import apiURL from "../config/config";
const baseUrl = `${apiURL.HITCH_API_URL}`;



async function fetchWithBody(method, url, body) {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };
        const res = await fetch(`${baseUrl}${url}`, {
            method: method,
            headers: headers,
            body: body == null ? JSON.stringify({
                "fcm_token": "123",
                "firebase_token": localStorage.getItem('token')
            }) : JSON.stringify( body ),
            redirect: 'follow'
        });
        if (res.ok) {
            const resJson = await res.json();
            return resJson.data;
        } else {
            throw new Error(`Server Error,${res.status}`);
        }
    } catch (error) {
        console.error(error);
        if (error.name === 'AbortError') {
            return null;
        }
        if (error.message.startsWith('Server Error')) {
            const errorStatus = error.message.split(',')[1];
            return { error: 'Server Error', status: errorStatus };
        } else {
            return null;
        }
    }
}


async function fetchWithoutBody(method, url) {
    try {
        const headers = {};
        const res = await fetch(`${baseUrl}${url}`, {
            method: method,
            headers: headers,
            redirect: 'follow'
        });
        if (res.ok) {
            const resJson = await res.json();
            return resJson.data;
        } else {
            throw new Error(`Server Error,${res.status}`);
        }
    } catch (error) {
        console.error(error);
        if (error.name === 'AbortError') {
            return null;
        }
        if (error.message.startsWith('Server Error')) {
            const errorStatus = error.message.split(',')[1];
            return { error: 'Server Error', status: errorStatus };
        } else {
            return null;
        }
    }
}

async function fetchWithoutHeaders(method, url) {
    try {
        const headers = {
            'Authorization' : 'Token '+ localStorage.getItem('tokenHitch')
        };
        const res = await fetch(`${baseUrl}${url}`, {
            method: method,
            headers: headers,
            redirect: 'follow'
        });
        if (res.ok) {
            const resJson = await res.json();
            return resJson.data;
        } else {
            throw new Error(`Server Error,${res.status}`);
        }
    } catch (error) {
        console.error(error);
        if (error.name === 'AbortError') {
            return null;
        }
        if (error.message.startsWith('Server Error')) {
            const errorStatus = error.message.split(',')[1];
            return { error: 'Server Error', status: errorStatus };
        } else {
            return null;
        }
    }
}

export { fetchWithBody, fetchWithoutBody, fetchWithoutHeaders };
