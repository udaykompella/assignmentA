function validateUrl(value) {
  // var urlPattern = new RegExp(
  //   "^(https?:\\/\\/)?" + // validate protocol
  //     "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
  //     "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
  //     "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
  //     "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
  //     "(\\#[-a-z\\d_]*)?$"
  // );
  let res = value.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );

  if (res == null) {
    return false;
  } else {
    return true;
  }
}

module.exports = { validateUrl };
