/**
 * Représente une erreur renvoyé par l'api
 */

export class ApiErrors {
  constructor(errors) {
    this.errors = errors;
  }
  get errorsPerField() {
    return this.errors.reduce((acc, error) => {
      return { ...acc, [error.field]: error.message };
    }, {});
  }
}

/**
 *
 * @param {string} endpoint
 * @param {object} options
 */
export async function apiFetch(endpoint, options = {}) {
  console.log(options, "options");
  options = {
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
    ...options,
  };
  if (
    options.body != null &&
    typeof options.body == "object" &&
    !(options.body instanceof FormData)
  ) {
    console.log("on est la en fait ");
    console.log(options.body);
    options.body = JSON.stringify(options.body);
    options.headers["Content-type"] = "application/json";
  }
  const response = await fetch("http://localhost:4000" + endpoint, options);
  if (response.status === 204) {
    return null;
  }

  const responseData = await response.json();
console.log(responseData)
  if (response.ok) {
    return responseData;
  } else {
    console.log("alloooo")
    if (responseData.errors) {
      throw new ApiErrors(responseData.errors);
    }
  }
}
