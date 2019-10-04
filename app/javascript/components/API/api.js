/////accounts
export const accountsFetch = id => {
  return fetch(`/accounts/${id}`).then(resp => {
    return resp.json();
  });
};
