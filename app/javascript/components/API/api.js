/////accounts
export const accountsFetch = id => {
  return fetch(`/accounts/${id}`).then(resp => {
    return resp.json();
  });
};

export const allAccountsFetch = () => {
  return fetch(`/accounts`).then(resp => {
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
/////collectors

export const collectorFetch = id => {
  return fetch(`/onecollector/${id}`).then(resp => {
    return resp.json();
  });
};

export const allCollectorsFetch = () => {
  return fetch(`/allcollectors`).then(resp => {
    return resp.json();
  });
};

export const collectorsByAccountFetch = () => {
  return fetch(`/allcollectorsbyaccount`).then(resp => {
    return resp.json();
  });
};

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

export const destroyPhone = function(id, token) {
	return fetch(`/phonenumbers/${id}`, {
		body: JSON.stringify(id),
		headers: {
			'Content-Type': 'application/json',
      "X-CSRF-Token": token
		},
		method: "DELETE"
	})
		.then((resp) => {
			return resp.json()
		})
}


/////payments

export const myPaymentsFetch = id => {
  return fetch(`/payments/${id}`).then(resp => {
    return resp.json();
  });
};

export const allPaymentsFetch = () => {
  return fetch(`/allpayments`).then(resp => {
    return resp.json();
  });
};
