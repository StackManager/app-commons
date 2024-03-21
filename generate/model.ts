

  export async function getSomeModels(session = [], model: any, service: any, quantity = 5) {
    const objects = []
    const max = quantity;
    for (let i = 0; i < quantity; i++) {
      const newObject = await model();
      const resp = await service(session, newObject);
      if (resp.status != 201 && quantity < (max * 2)) {
        //console.log(resp.body, newObject)
        quantity = quantity + 1;
      }else {
        objects.push(resp.body);
      }
  }
    return objects;
  }