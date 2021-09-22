const formatNumber = (number: string) => number.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

export default  formatNumber;