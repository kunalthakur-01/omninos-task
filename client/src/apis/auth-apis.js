
export const HttpLogin = async (body) => {
    const response = await fetch('http://localhost:5000/api/login', {
        method: "POST",
        body: JSON.stringify({ ...body }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    
    if (!response.ok) throw Error(data.message);

    return data;
};

export const HttpSignup= async (body, abortController) => {
    const response = await fetch('http://localhost:5000/api/signup', {
        method: "POST",
        body: JSON.stringify({ ...body }),
        headers: {
            "Content-Type": "application/json"
        },
        signal: abortController.signal
    });

    const data = await response.json();
    
    if (!response.ok) throw Error(data.message);

    return data;
};