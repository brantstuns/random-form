export const persistSessionCall = body =>
  fetch('saveForm', {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.OK && console.log('nice'))
    .catch(err => console.log(err));