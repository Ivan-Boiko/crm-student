export const patchFunc = async (id, {name, surname, lastName, contacts}) => {
  try {
    const request = await fetch(`http://localhost:3000/api/clients/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
         name,
         surname,
         lastName,
         contacts,
         }),
     headers: {
         'Content-Type': 'application/json'
       },
     });
      const data = await request.json();
      if(request.ok) {
        return data
    } else {
        throw data.errors;
      }
  }
  catch (errors) {
    return {errors}
  }
 }