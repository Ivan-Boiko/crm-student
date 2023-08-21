export const getFunc = async (id) => {
    try {
        const request = await fetch(`http://localhost:3000/api/clients/${id}`, {
            method: "GET",
        });
        if (request.ok) {
            const data = await request.json();
            return data
        }
    }
     catch(e) {
        return e;
     }
    }