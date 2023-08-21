export const requestSearch = async str => {
    const request = await fetch (
      `http://localhost:3000/api/clients?search=${str}`,
    );
    if(request.ok) {
        const data = await request.json();
        console.log(data)
        return data;
    }
}