export const requestFunc = async () => {
    try {
        const request = await fetch("http://localhost:3000/api/clients");
        if (request.ok) {
            const data = await request.json();
            return data
        }
    }
     catch(e) {
        return e;
     }
}