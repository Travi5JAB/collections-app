/////accounts
export const accountsFetch = id => {
  return fetch(`/accounts/${id}`).then(resp => {
    return resp.json();
  });
};


////comments

export const commentsFetch = id => {
  return fetch(`/comments/${id}`).then(resp => {
    return resp.json();
  });
};

export const createComment = function(commentString, id, token) {
	return fetch(`/createcomment/${commentString}/${id}`, {
		body: JSON.stringify(id),
		headers: {
			'Content-Type': 'application/json',
      "X-CSRF-Token": token
		},
		method: "POST"
	})
		.then((resp) => {
			return resp.json()
		})
}

export const submitPayment = function(payment, id, token) {
	return fetch(`/payment/${payment}/${id}`, {
		body: JSON.stringify(id),
		headers: {
			'Content-Type': 'application/json',
      "X-CSRF-Token": token
		},
		method: "PATCH"
	})
		.then((resp) => {
			return resp.json()
		})
}

////address

export const createAddress = function(address, token) {
	return fetch(`/addaddress/${address}`, {
		body: JSON.stringify(address),
		headers: {
			'Content-Type': 'application/json',
      "X-CSRF-Token": token
		},
		method: "POST"
	})
		.then((resp) => {
			return resp.json()
		})
}


///phone

export const createPhone = function(phone, token) {
	return fetch(`/addphone/${phone}`, {
		body: JSON.stringify(phone),
		headers: {
			'Content-Type': 'application/json',
      "X-CSRF-Token": token
		},
		method: "POST"
	})
		.then((resp) => {
			return resp.json()
		})
}
