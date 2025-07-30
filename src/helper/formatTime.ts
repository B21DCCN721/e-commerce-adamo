const formatTime = (isoString: string): string => {
  if (!isoString) return '';

  const date = new Date(isoString);

  const padZero = (n: number) => n.toString().padStart(2, '0');

  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1); // tháng bắt đầu từ 0
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day}/${month}/${year}`;
};
export default formatTime;