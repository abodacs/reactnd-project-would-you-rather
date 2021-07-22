const formatDate = (timestamp) => {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString("en-US")

  return `${time.substr(0, 5) + time.slice(-2)} | ${d.toLocaleDateString()}`
}

// eslint-disable-next-line import/prefer-default-export
export { formatDate }
