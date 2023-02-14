export const getcart = async (userId) => {
    const response = await fetch(`http://localhost:5000/api/cart/${userId}`);

    const data = await response.json();
    console.log(data);

    if (!response.ok) throw Error(data.message);

    return data;
};