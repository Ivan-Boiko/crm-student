export const deleteFunc = async (id) => {
   const request = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: "DELETE",
    headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await request.json();
    console.log(data)
}